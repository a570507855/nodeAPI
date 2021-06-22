import { getMetadataStorage, validate } from "class-validator";
import { ValidationMetadata } from "class-validator/types/metadata/ValidationMetadata";
import { Body, JsonController, Post, Req, UseAfter, UseBefore } from "routing-controllers";
import Container, { Service } from "typedi";
import { ErrCode } from "../../../model/enum";
import { ApiBase, ApiError } from "../../net";
import { Log } from "../../os/log";

//拦截器 - 前
function handleBefore(req: any, _: any, next: () => Promise<any>): Promise<void> {
    req.Api = {};
    try {
        const Api = require(`../../../api/${req.params.service}/${req.params.action}`)
            .default;
        req.Api.instance = Container.get<ApiBase>(Api);
        req.Api.validationMetadatas = getMetadataStorage().getTargetValidationMetadatas(Api, '', true, false);
    } catch (err) {
        req.Api.err = err;
    }
    return next();
}

//拦截器 - 后
async function handleAfter(req: any, _: any, next: () => Promise<any>): Promise<void> {
    try {
        if (req.Api) {
            await req.Api.instance.after();
        }
    } catch { }
    return next();
}

@JsonController()
@Service()
export class HttpPostController {
    @Post('/:service/:action')
    @UseBefore(handleBefore)
    @UseAfter(handleAfter)
    public async post(@Body() body: any, @Req() req: any): Promise<any> {
        try {
            if (req.Api.err) {
                throw req.Api.err;
            }
            const api = req.Api.instance;
            const validationMetadatas = req.Api.validationMetadatas as ValidationMetadata[];
            validationMetadatas.forEach((r) => {
                api[r.propertyName] = body[r.propertyName];
            });
            if (validationMetadatas.length) {
                const errors = await validate(api);
                if (errors.length) {
                    let errMsg = errors
                        .reduce(
                            (memo, r): string[] => {
                                memo.push(r.toString());
                                return memo;
                            },
                            [req.path]
                        )
                        .join('\n-');
                    Log.warn(errMsg);
                    throw new ApiError(ErrCode.JieKouCanShu);
                }
            }
            return {
                status: 0,
                data: await api.invoke(),
            };
        } catch (ex) {
            console.log(ex)
            if (ex.constructor == ApiError) {
                const err = ex as ApiError;
                return {
                    status: err.code,
                    errmsg: err.message,
                };
            }
            return {
                status: ErrCode.YiChang,
                errmsg: ex.message,
            };
        }
    }
}

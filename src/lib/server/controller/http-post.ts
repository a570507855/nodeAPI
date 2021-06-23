import { getMetadataStorage, validate } from "class-validator";
import { ValidationMetadata } from "class-validator/types/metadata/ValidationMetadata";
import { Body, JsonController, Post, Req, UploadedFiles, UseAfter, UseBefore } from "routing-controllers";
import Container, { Service } from "typedi";
import { ErrCode } from "../../../model/enum";
import { ApiBase, ApiError } from "../../net";
import { Log } from "../../os/log";
import multer from 'multer';

async function getFile(req: any, _: any): Promise<any> {
    return new Promise((resolve, reject) => {
        const upload = multer().array('files', 1000);
        upload(req, _, err => {
            if (!err) {
                resolve({
                    files: req.files,
                    query: req.query,
                });
            }
            else {
                reject(err);
            }
        })
    })
}

//拦截器 - 前
async function handleBefore(req: any, _: any, next: () => Promise<any>): Promise<void> {
    req.Api = {};
    try {
        const Api = require(`../../../api/${req.params.service}/${req.params.action}`)
            .default;
        req.Api.instance = Container.get<ApiBase>(Api);
        req.Api.validationMetadatas = getMetadataStorage().getTargetValidationMetadatas(Api, '', true, false);
        let res = await getFile(req, _);
        req.Api.instance.$files = res.files;
        req.Api.instance.$query = res.query;
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
@UploadedFiles('files')
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

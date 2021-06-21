import { Body, Get, JsonController, Req, UseAfter, UseBefore } from "routing-controllers";

//拦截器 - 前
function handleBefore(req: any, _: any, next: () => Promise<any>): Promise<void> {
    console.log(1111)
    return next();
}

//拦截器 - 后
async function handleAfter(req: any, _: any, next: () => Promise<any>): Promise<void> {
    console.log(2222)
    return next();
}

@JsonController()
export class HttpGetController {
    @Get('/:service/:action')
    @UseBefore(handleBefore)
    @UseAfter(handleAfter)
    public async post(@Body() body: any, @Req() req: any): Promise<any> {
        console.log('get')
        return {
            err: 0,
            data: {
                test: true
            }
        }
    }
}

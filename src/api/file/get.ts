import { Service, Inject } from 'typedi';

import { Length } from 'class-validator';
import { ApiBase } from '../../lib/net';

@Service()
export default class GetApi extends ApiBase {
    @Length(6, 20)
    public account!: string;

    @Length(6, 20)
    public password!: string;


    public async invoke(): Promise<any> {

        return {
            test: true
        };
    }

    public async after(): Promise<any>{
        console.log(1111)
    }
}


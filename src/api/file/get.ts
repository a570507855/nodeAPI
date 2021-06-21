import { Service } from 'typedi';
import { ApiBase } from '../../lib/net';

@Service()
export default class GetApi extends ApiBase {
    public async invoke(): Promise<any> {
        return {
            test: true
        };
    }
}


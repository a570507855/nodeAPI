import { Service } from 'typedi';
import { File } from '../../lib/io/file';
import { ApiBase } from '../../lib/net';

@Service()
export default class GetApi extends ApiBase {
    public file = new File();

    public async invoke(): Promise<any> {
        return await this.file.tree(process.cwd());;
    }
}


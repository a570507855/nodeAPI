import { Length } from 'class-validator';
import { Service } from 'typedi';
import { File } from '../../lib/io/file';
import { ApiBase } from '../../lib/net';

@Service()
export default class GetApi extends ApiBase {
    public file = new File();

    @Length(0, 1000)
    private path!: string;

    public async invoke(): Promise<any> {
        let r = await this.file.readFile(this.path);
        return r.toString('utf-8');
    }
}


import { IsString, Length } from 'class-validator';
import { writeFile } from 'fs/promises';
import { Service } from 'typedi';
import { ApiBase } from '../../lib/net';

@Service()
export default class GetApi extends ApiBase {

    @IsString()
    private content!: string;

    @Length(0, 1000)
    private path!: string;

    public async invoke(): Promise<any> {
        try {
            await writeFile(this.path, this.content);
            return 'success';
        } catch (err) {
            throw err;
        }
    }
}


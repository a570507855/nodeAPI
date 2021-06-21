import { Length } from 'class-validator';
import { Service } from 'typedi';
import { ApiBase } from '../../lib/net';
import { cmd } from '../../lib/os/sys';

@Service()
export default class CmdApi extends ApiBase {
    @Length(0, 1000)
    public command!: string;

    public async invoke(): Promise<any> {
        return await cmd(this.command);
    }
}


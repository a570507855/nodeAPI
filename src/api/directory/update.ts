import { Service } from 'typedi';
import { ApiBase } from '../../lib/net';
import fs from 'fs/promises';

@Service()
export default class GetApi extends ApiBase {
    public async invoke(): Promise<any> {
        try {
            if (this.$files) {
                let dirMap = JSON.parse(this.$query.dirMap);
                for (let i = 0; i < this.$files.length; ++i) {
                    let file = this.$files[i];
                    let path = `${process.cwd()}\\${dirMap[file.originalname]}`;
                    await fs.writeFile(path, file.buffer);
                }
            }
            return 'success';
        } catch (err) {
            throw err;
        }
    }
}


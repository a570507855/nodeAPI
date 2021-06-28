import { Service } from 'typedi';
import { ApiBase } from '../../lib/net';
import { writeFile } from 'fs/promises';
import { File } from '../../lib/io/file';
import { Log } from '../../lib/os/log';

@Service()
export default class GetApi extends ApiBase {
    public file = new File();

    public async invoke(): Promise<any> {
        if (this.$files) {
            let dirs = JSON.parse(this.$query.dirs);
            if (dirs.length !== this.$files.length) {
                throw new Error('文件数与路径数不相等');
            }
            for (let i = 0; i < this.$files.length; ++i) {
                let file = this.$files[i];
                let path = `${process.cwd()}//${dirs[i]}`;
                try {
                    await writeFile(path, file.buffer);
                } catch (err) {
                    if (err.errno === -4058) {
                        let paths = err.path.split(process.cwd())[1].split('\\');
                        for (let i = 1; (i < paths.length - 1) && paths.length > 1; ++i) {
                            await this.file.mkdir(`${process.cwd()}/${paths[i]}`);
                        }
                        await writeFile(path, file.buffer);
                    }
                    else {
                        Log.error(err);
                        throw err;
                    }
                }
            }
            return 'success';
        }
    }
}


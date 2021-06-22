import { readdir, readFile, stat } from 'fs/promises';
import path from 'path';

export class File {

    public async readFile(path: string) {
        try {
            return await readFile(path);
        } catch (err) {
            throw err;
        }
    }

    public async tree(dir: string) {
        if (!(await stat(dir)).isDirectory()) {
            return `${dir}不为文件夹路径`;
        }
        try {
            let files = await readdir(dir);
            let res = await files.reduce(async (memo: any, item) => {
                let filePath = `${dir}/${item}`;
                let _memo = await memo;
                let isDir = (await stat(filePath)).isDirectory();
                _memo.push({
                    isDir: isDir,
                    ...path.parse(filePath),
                    children: isDir ? await this.tree(filePath) : []
                });
                return _memo;
            }, []);
            return res;
        } catch (err) {
            throw err;
        }
    }
}
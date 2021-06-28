import { readdir, readFile, stat, mkdir } from 'fs/promises';
import path from 'path';

export class File {

    /**
     * 创建文件夹，目录已存在则返回false,否则创建该目录
     */
    public async mkdir(dir: string): Promise<boolean> {
        try {
            await mkdir(dir);
            return true;
        } catch (err) {
            if (err && err.errno === -4075) {
                return false;
            }
            else {
                throw err;
            }
        }
    }

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
                let filePath = `${dir}\\${item}`;
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
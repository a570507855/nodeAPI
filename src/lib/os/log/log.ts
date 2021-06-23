import fs from 'fs';
export class Log {
    private static colorMap: any = {
        red: 31,
        green: 32,
        yellow: 33,
        blue: 34,
        purple: 35,
        cyan: 36
    }
    public static error(message: string): void {
        this.log('ERROR', message);
    }
    public static info(message: string): void {
        this.log('INFO', message);
    }
    public static warn(message: string) {
        this.log('WARNING', message);
    }

    public static debug(prefix: string, colorMsg: string = '', color: string = 'cyan', suffix: string = '',): void {
        console.log(`${prefix}\u001b[${this.colorMap[color]}m${colorMsg}\u001b[0m${suffix}`);
    }

    private static log(type: string, message: string) {
        let date = new Date();
        let nowDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        let dir = `${process.cwd()}\\log`
        let fileName = `${dir}\\${nowDate}.txt`;
        let content = `[${new Date().toLocaleString()}] [${type}]：` + message + '\n';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        if (fs.existsSync(fileName)) {
            fs.appendFileSync(fileName, content);
        }
        else {

            fs.writeFileSync(fileName, content);
        }
    }
}

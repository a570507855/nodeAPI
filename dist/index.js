"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var exec = require('child_process').exec;
const iconv_lite_1 = __importDefault(require("iconv-lite"));
// show  Windowsd letter
function cmd(command, callback) {
    exec(command, { encoding: 'buffer' }, (err, stdout, stderr) => {
        if (err || stderr.length) {
            console.log(iconv_lite_1.default.decode(stderr, 'cp936'));
            return;
        }
        callback(iconv_lite_1.default.decode(stdout, 'cp936'));
    });
}
cmd('node -v', (res) => {
    console.log(res);
});

/* ********************************* 数据类型 ********************************* */
// https://www.tslang.cn/docs/handbook/basic-types.html

//布尔值
let isBool: boolean = false;

//数字
let num: number = 1;
let num2: number = 0xf00d;
let num3: number = 0b1010;
let num4: number = 0o744;

//字符串
let myName: string = '名字';
let template: string = `模板字符串`;

//数组
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [4, 5, 6];

//元组
let tuple: [string, number];
tuple = ['hello', 1];
//tuple = [1, 'hello']; 报错

//枚举
enum Color { Red, Green, Blue = 2 };
let c: Color = Color.Red;
console.log('Color.Red value:', c); //0
console.log('Color[1] name:', Color[1]); //Green

//any
let notSure: any;
notSure = 4;
notSure = 'string';
notSure = false;
let notSureList: any[] = [1, 'string', false];

//void
function notReturn(): void {
    console.log('无返回值');
}
let voidVal: void = undefined;
//let voidVal2: void = null; 报错

//Null 和 undefined，默认情况下是所有类型的子类型,即可赋予number类型的变量 null或者undefined;但是当指定strictNullChecks时，只能赋予自身
let n: null = null;
let u: undefined = undefined;
//let nullNum: number = null; 本项目默认开启了strictNullChecks，所以报错

//never 永不存在的值的类型，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
function error(err: Error): never {
    throw err;
}

function fail() {
    return error(new Error('错误'));
}

function Loop(): never {
    while (true) {

    }
}

//Object 非原始类型，即除number，string，boolean，symbol，null或undefined之外的类型
let object: Object = 1;
console.log(typeof object)//number

//类型断言 清楚知道某个变量的具体类型，类似于类型转换
let anyStr: any = 'anyStr';
let strLength: number = (<string>anyStr).length;
let strLength2: number = (anyStr as string).length;
console.log('strLength:', strLength);
console.log('strLength2:', strLength2);
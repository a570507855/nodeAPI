/* ********************************* 变量声明 ********************************* */
// https://www.tslang.cn/docs/handbook/variable-declarations.html

//var 声明
// a++  开启了strictNullChecks，所以会报错，
// var a = 10;
// console.log(a)

//let 声明,块作用域，不能在被声明之前读或写
//b++ 报错
let b = 10;
//不能多次声明一个变量
//let b = 20;
let a = 5;
function f() {
    let a = 10;
    return a;
}
function g() {
    let a = 20;
    return a;
}
console.log(f());
console.log(g());

function d(is: boolean, x: number) {
    if (is) {
        let x = 10;
        return x;
    }
    return x;
}
console.log(d(true, 100));
console.log(d(false, 100));

//const 声明 被赋值后不能再改变
function h() {
    const a = 10;
    //a = 20; 不可重新赋值
}

//解构 - 数组
let [arr1, arr2, arr3] = [6, 7, 8];
console.log(arr1, arr2, arr3)

function i([a, b]: [number, number]) {
    console.log(a, b);
}
i([10, 20]);

let [arr4, ...arr]: number[] = [1, 2, 3, 4, 5];
console.log(arr4, arr);

//解构 - 对象
let o = {
    _name: 'xyy',
    age: 27,
    _sex: 1
}
let { _name, age } = o;
console.log(_name, age)
let { _sex, ...obj } = o;
console.log(_sex, obj)
//解构 - 对象 - 属性重命名
let { _name: newName, age: newAge } = o;
console.log(newName, newAge)

//解构 - 对象 - 默认值
let o2: { _num: number, _count: number, test?: number } = {
    _num: 20,
    _count: 30,
}
let { _num, _count, test = 40 } = o2;
console.log(_num, _count, test)

//展开
let _arr = [1, 2, 3, 5];
console.log(...arr);
let _obj = {
    name: '1',
    num: 2
}
console.log({ ..._obj, test: 2 });
//对象展开会丢失对象中的方法
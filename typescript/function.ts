/* ********************************* 函数 ********************************* */
// https://www.tslang.cn/docs/handbook/functions.html

// 函数类型
function add(x: number, y: number): number {
    return x + y;
}

const myAdd: (x: number, y: number) => number = function (x: number, y: number): number { return x + y };

// 推断类型

const myAdd2 = function (x: number, y: number): number { return x + y };
const myAdd3: (x: number, y: number) => number = function (x, y) { return x + y };

console.log(add(1, 2));
console.log(myAdd(2, 3));
console.log(myAdd2(3, 4));
console.log(myAdd3(4, 5));

// 可选参数和默认参数 - 在参数名旁使用?实现可选参数,可选参数必须跟在必须参数后面
function buildName(firstName: string, lastName?: string): string {
    if (lastName) {
        return firstName + lastName;
    }
    else {
        return firstName;
    }
}

console.log(buildName('x', 'yy'));
console.log(buildName('x'));

function buildName2(firstName: string, lastName: string = 'disueb11'): string {
    return firstName + lastName;
}

console.log(buildName2('x', 'yy'));
console.log(buildName2('x'));

// 剩余参数

function residueFun(firstName: string, ...residue: string[]): string {
    return firstName + ' ' + residue.join(' ');
}

console.log(residueFun('a'));
console.log(residueFun('a', 'b'));
console.log(residueFun('a', 'b', 'c', 'd'));

// this和箭头函数 -  箭头函数能保存函数创建时的 this值，而不是调用时的值
const thisFun = {
    logThis(): any {
        return this; // this 指thisFun
    }
}

// const thisFun2 = {
//     logThis: () => {
//         return this; // error: The containing arrow function captures the global value of 'this'
//     }
// }

// const thisFun2 = {
//     logThis(): Function {
//         return function () {
//             console.log(this);//error:'this' implicitly has type 'any' because it does not have a type annotation
//         }
//     }
// }

const thisFun2 = {
    logThis(): Function {
        return () => {
            console.log(this);// this 指thisFun2
        }
    }
}
thisFun2.logThis()();

// this参数
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function (this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
console.log("card: " + pickedCard.card + " of " + pickedCard.suit)

// this参数在回调函数里

// 重载


interface Point2D {
    x: number,
    y: number
}
interface Point3D extends Point2D {
    z: number
}
function heavyLoad(point2D: Point2D): void;
function heavyLoad(point3D: Point3D): void;
function heavyLoad(point: any): void {
    if (point.z) {
        console.log('Point3D');
    }
    else {
        console.log('Point2D');
    }
}
heavyLoad({ x: 1, y: 2 });
heavyLoad({ x: 1, y: 2, z: 3 });
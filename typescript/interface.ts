/* ********************************* 接口 ********************************* */
// https://www.tslang.cn/docs/handbook/interfaces.html

(function () {
    function printLabel(labelObj: { label: string }) {
        console.log(labelObj.label);
    }
    interface labelObj {
        label: string
    }

    function printLabel2(labelObj: labelObj) {
        console.log(labelObj.label);
    }



    //可选属性
    interface person {
        name: string,
        age: number,
        sex: number,
        hasCar?: boolean
    }

    //只读属性
    interface Point {
        readonly x: number,
        readonly y: number
    }
    let point: Point = { x: 20, y: 100 };
    // point.x = 30; error

    let a: ReadonlyArray<number> = [1, 2, 3, 4, 5];
    // a[0] = 10; error

    interface PersonMore {
        name: string,
        age: number,
        sex: number,
        hasCar?: boolean,
        [other: string]: any
    }
    // 带有其他任意数量属性
    let p: PersonMore = {
        name: 'xyy',
        age: 26,
        sex: 1,
        hasHome: false,
        hasCar: false,
        hasGirlFriend: false
    }
    console.log(p)

    // 函数类型，用于修饰函数的接口，形式 - 参数:返回值， 注：函数的参数名不需要与接口里定义的名字相匹配，但参数类型需要兼容
    interface SearchFun {
        (source: string, subString: string): boolean,
    }
    let mySearch: SearchFun = (source1: string, subString1: string) => {
        let res = source1.search(subString1);
        return res > -1;
    }
    console.log(mySearch('hello world', 'hello'));

    // 可索引类型
    // 1.数字索引
    // 2.字符串索引
    // 注：由于当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象，所以数字索引的返回值必须是字符串索引返回值类型的子类型
    interface numberIndex {
        readonly [index: number]: any
    }
    let arr: numberIndex = ['hello', 'world'];

    // 类类型
    interface animalInterface {
        type: string;
        say(name: string): void;
    }

    class Animal implements animalInterface {
        constructor(public type: string) {
            this.type = type;
        }
        say(name: string): void {
            console.log(`${this.type} say：${name}`);
        }
    }
    const pig: animalInterface = new Animal('猪');
    pig.say('我是猪');

    // 类静态部分与实例部分的区别
    interface ClockConstructor {
        new(hour: number, minute: number): ClockInterface;
    }
    interface ClockInterface {
        tick(): void;
    }

    function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
        return new ctor(hour, minute);
    }

    class DigitalClock implements ClockInterface {
        constructor(h: number, m: number) { }
        tick() {
            console.log("beep beep");
        }
    }
    class AnalogClock implements ClockInterface {
        constructor(h: number, m: number) { }
        tick() {
            console.log("tick tock");
        }
    }

    let digital = createClock(DigitalClock, 12, 17);
    let analog = createClock(AnalogClock, 7, 32);
    digital.tick();
    analog.tick();

    // 继承接口
    interface DogInterface extends animalInterface {
        dog(): void
    }
    class Dog implements DogInterface {
        constructor(public type: string) {
            this.type = type;
        }

        say(name: string) {
            console.log(`${this.type} say：${name}`)
        }

        dog() {
            console.log('狗专属方法')
        }
    }

    const dog = new Dog('狗');
    dog.say('我是狗');
    dog.dog();

    // 继承多个接口
    interface ColorInterface {
        color: string
    }
    interface DuckInterface extends ColorInterface, animalInterface {
        duck(): void;
    }

    class Duck implements DuckInterface {
        constructor(public color: string, public type: string) {
            this.color = color;
            this.type = type;
        }
        duck(): void {
            throw new Error("Method not implemented.");
        }

        say(name: string): void {
            throw new Error("Method not implemented.");
        }
    }

    // 混合类型
    interface BlendInterface {
        (index: number): number;    //函数类型
        val: number;
        totle(): number;
    }
    function getTotle(): BlendInterface {
        let fun = <BlendInterface>function (start: number) { return start };
        fun.val = 20;
        fun.totle = () => 100;
        return fun;
    }
    const c = getTotle();
    console.log(c(10));
    console.log(c.val);
    console.log(c.totle());

    // 接口继承类

}());
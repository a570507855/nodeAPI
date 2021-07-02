/* ********************************* 类 ********************************* */
// https://www.tslang.cn/docs/handbook/classes.html

(function () {
    // private 修饰符，只能在类内部访问
    // protected 修饰符，允许在派生类中访问，修饰构造函数时表示该类不能被实例化但可以被继承
    class Animal {
        protected constructor(protected name: string) {
        }
    }
    class Dog extends Animal {
        constructor(name: string) {
            super(name);
            console.log(this.name)
        }
    }

    const dog = new Dog('狗');

    // readonly 修饰符，只读属性，只能在声明时或者构造函数里被初始化
    class ReadonlyClass {
        constructor(readonly name: string) { }
    }

    // 存取器 只带有 get不带有 set的存取器自动被推断为 readonly
    class UserAccount {
        constructor(private _account: string, private _password: string) { };

        get account() {
            return this._account;
        }
        set account(account: string) {
            this._account = account;
        }

        get password() {
            return this._password;
        }
        set password(password: string) {
            if (this._account && this._account === 'xyy') {
                this._password = password;
            }
            else {
                console.log('无权限修改密码');
            }
        }
    }

    const user = new UserAccount('xyy', 'disueb11');
    user.password = '19950628';
    user.account = 'admin';
    user.password = 'xyy19950628';
    console.log(user.account, user.password);

    // 静态属性 -存在于类本身上面而不是类的实例上
    class StaticClass {
        static url: string = 'http://www.baodu.com';
        static getPath() {
            return process.cwd();
        }

        constructor(public name: string) { }
        myName() {
            console.log(this.name)
        }
    }
    const a = new StaticClass('xyy');
    console.log(a.name)
    a.myName();
    console.log(StaticClass.url);
    console.log(StaticClass.getPath());

    // 抽象类 作为其他派生类的基类使用，一般不会被实例化，abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
    abstract class Food {
        constructor(public name: string) { };
        abstract foodName(): void;
    }

    class Meat extends Food {
        constructor(name: string) {
            super(name)
        }

        foodName() {
            console.log('肉：', this.name)
        }
    }

    class Vegetables extends Food {
        constructor(name: string) {
            super(name)
        }

        foodName() {
            console.log('蔬菜：', this.name)
        }

        say() {
            console.log('say')
        }
    }

    const meat = new Meat('meat');
    const vegetables: Food = new Vegetables('vegetables');
    meat.foodName();
    vegetables.foodName();

    class Greeter {
        static standardGreeting = "Hello, there";
        greeting?: string;
        greet() {
            if (this.greeting) {
                return "Hello, " + this.greeting;
            }
            else {
                return Greeter.standardGreeting;
            }
        }
    }

    let greeter1: Greeter;
    greeter1 = new Greeter();
    console.log(greeter1.greet());

    let greeterMaker: typeof Greeter = Greeter;
    greeterMaker.standardGreeting = "Hey there!";

    let greeter2: Greeter = new greeterMaker();
    console.log(greeter2.greet());

    //把类当做接口使用

    class Point {
        x?: number;
        y?: number;
    }
    interface Point3D extends Point {
        z: number
    }

    const p: Point3D = { x: 20, y: 30, z: 50 }
    console.log(p);

}())
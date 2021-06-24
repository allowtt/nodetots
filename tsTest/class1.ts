class Animal {
    name: string;
    constructor(theName: string) {
        this.name = theName;
    }
    move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }
    move(distance: number = 5) {
        console.log('slithering');
        super.move(distance);
    }
}

let cat = new Animal("cat");
cat.move(3);

let sn = new Snake('test');
sn.move();

//Public, private 그리고 protected 지정자 (Public, private, and protected modifiers)

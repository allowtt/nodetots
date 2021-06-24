type abc = "a" | "b" | "c";

class UIElement {
    animate(dx: number, dy: number, abc: abc) {
        if(abc === "a") {
            console.log('a');
        } else if(abc === "b") {
            console.log('b');
        } else if(abc === "c") {
            console.log('c');
        } else {
            console.log("abc에 없음.");
        }
    }
}

let button = new UIElement();
button.animate(0,0,"a");
button.animate(0,1,"b");
button.animate(0,2,"c");
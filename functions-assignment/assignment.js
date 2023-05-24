const sayHello = () => 'hi matheus';

sayHello();

function checkInput(cb, ...arguments) {
    if (arguments.length === 0) {
        cb();
    } 
}

checkInput(() => 'hello', 'test', 'ing', 'funcs');

let task1 = document.getElementById('task-1');
console.log('task1 - first method', task1);

task1 = document.getElementsByTagName('li')[0];
console.log('task1 - second method', task1);

task1.style.backgroundColor = 'black';
task1.style.color = 'white';

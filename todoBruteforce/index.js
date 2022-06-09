// document.querySelector('ul').addEventListener('click',(e)=>{
//     console.log(e.target); 
//     e.target.classList.toggle('line-cross');
// })
function deleteItem(e){
    if(e.target.innerHTML=='Delete'){
        e.currentTarget.remove();
    }else{
        e.target.classList.toggle('line-cross');
    }
    // console.log(e.target);
}
function addIntoList(listData){
    var ul = document.getElementById('list');
    var li = document.createElement('li');
    var di = document.createElement('div');
    var btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Delete'));
    var p= document.createTextNode(listData);
    di.append(p);
    di.append(btn);
    li.append(di);
    ul.append(li);
    li.addEventListener('click',deleteItem);
}

function addOperation(e){
    var todoInput = document.getElementsByClassName('todo-input')[0];
    if (todoInput.value.trim()=="") {
        alert("must have some data");
    }else{
        var todoValue = todoInput.value;
        addIntoList(todoValue);
        todoInput.value = "";
    }
}
let addBtn = document.getElementsByClassName('add')[0];
addBtn.addEventListener('click',addOperation);


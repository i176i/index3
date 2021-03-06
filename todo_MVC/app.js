// model to handle all the data of the app

const model = localStorage.getItem('modelLocal') ? JSON.parse(localStorage.getItem('modelLocal')) : {
    currentState:[],
    currentClicked:'all',
    items : [],
    completed : [], 
    notCompleted : [],
}
// var model = modelSchema;
if(localStorage.getItem('modelLocal')){
    localStorage.setItem('modelLocal',JSON.stringify(model));
}else{
    model =  JSON.parse(localStorage.getItem('modelLocal'));
    
}
function setIntoLocal(){
    localStorage.setItem('modelLocal',JSON.stringify(model));
}
function getItemFromLocal(){
    model = JSON.parse(localStorage.getItem('modelLocal'));
}

// view to handle the frontend of the app
const view = {
    init(){
        this.completeList = document.getElementById('list');
        this.render(model.items);
        this.addHoverToCheckAll();
    },
    addHoverToCheckAll(){
        document.querySelector('.check-all').addEventListener('mouseenter',()=>{
            document.querySelector('.check-all-arrow').style.backgroundColor = 'rgb(166, 166, 166)';
            document.querySelector('.check-all').addEventListener('mouseleave',()=>{
                document.querySelector('.check-all-arrow').style.backgroundColor = 'rgb(220, 220, 220)';
            })
        })
    },
    render(items){
        // console.log('rendered');
        setIntoLocal();
        let counter = document.querySelector('.filters p');
        let count=0;
        for(let i=0; i<model.items.length; i++){
            if(model.items[i].iscompleted == false){
                count++;
            }
        }
        counter.innerHTML= `${count} items left`;
        this.completeList.innerHTML = '';
        if(model.items.length==0){
            let todoItems = document.querySelector('#list');
            todoItems.style.display='none';
            let filters = document.querySelector('.filters');
            filters.style.display='none';
            let clearCompleted = document.querySelector('.clear-complete');
            clearCompleted.style.display='none'
        }
        else{
            let todoItems = document.querySelector('#list');
            todoItems.style.display='block';
            let filters = document.querySelector('.filters');
            filters.style.display='flex';
            let clearCompleted = document.querySelector('.clear-complete');
            clearCompleted.style.display='inline';
        }
        for(let i=0; i<items.length; i++){
            let elem = document.createElement('li') ;
            let delBtn = document.createElement('button');
            let itemName = document.createTextNode(items[i].name);
            let checkBox = document.createElement('div');
            let textPara = document.createElement('p');
            
            checkBox.classList = "checkBox";
            delBtn.innerHTML = "X";
            delBtn.classList="delete-btn"

            textPara.appendChild(itemName);
            textPara.classList.add("para-design");
            elem.appendChild(checkBox);
            elem.appendChild(textPara);
            elem.appendChild(delBtn);
            
            delBtn.addEventListener('click',()=>{
                controller.deleteItem(i);
            })
            checkBox.addEventListener('click',()=>{
                controller.checkAsDone(items[i].key);
            })
            if(items[i].iscompleted == true){
                textPara.classList.add('isDone');
                let image = document.createElement('img');
                image.src = "./assets/check.png";
                image.classList="img-setter";
                checkBox.appendChild(image);
            }
            this.completeList.appendChild(elem);
        }
        let remainingBtn = document.querySelectorAll('.btn-design');
        for(let i=0; i<remainingBtn.length; i++){
            if(remainingBtn[i] != model.currentClicked){
                remainingBtn[i].style.border='none';
            }
        }
        let btnToHighlight = document.getElementById(model.currentClicked);
        btnToHighlight.style.border = '2px solid rgb(223, 194, 199)';
        
    },
}

//controller to handle the backend logic of the app

const controller = {
    init(){
        view.init();
    },
    resetData(){
        model.notCompleted = model.items.filter(this.checkNotCompleted);
        model.completed = model.items.filter(this.checkCompleted);
    },
    checkAsDone(id){
        let items = this.getItems();        
        
        for(let i=0; i<items.length; i++){
            if(items[i].key==id){
                items[i].iscompleted = !(items[i].iscompleted);
            }
        }
        this.resetData();
        if(model.currentClicked=='all'){
            model.currentState=model.items;
        }
        else if(model.currentClicked=='completed'){
            model.currentState=model.completed;
        }
        else{
            model.currentState= model.notCompleted;
        }
        view.render(model.currentState);
    },
    getItems(){
        return model.items;
    },
    addItem(){
        let inputValue = document.querySelector('input[type=text]').value;
        if(inputValue.trim()==""){
            return;
        }
        const itemToArray = {
            key : Math.random() + Math.random(),
            name : inputValue.trim(),
            iscompleted : false            
        }
        model.items.push(itemToArray);
        model.notCompleted.push(itemToArray);
        document.querySelector('input[type=text]').value="";
        if(model.currentState.length==0){
            model.currentClicked='all';
            model.currentState = model.items;
        }
        view.render(model.currentState);
    },
    deleteItem(itemNumber){
        let items = this.getItems();
        items.splice(itemNumber,1);
        view.render(model.currentState);
    },
    addItemOnEnter(e){
        if(e.keyCode==13 ){
            controller.addItem();
        }
    },
    checkCompleted(taskObj){
        return taskObj.iscompleted;
    },
    checkNotCompleted(taskObj){
        return !taskObj.iscompleted;
    },
}

let checkAllAtOnce = document.querySelector('.check-all');
checkAllAtOnce.addEventListener('click',()=>{
    for(let i=0; i<model.items.length; i++){
        if(!model.items[i].iscompleted){
            controller.checkAsDone(model.items[i].key);
        }
    }
    view.render(model.currentState);
})

let clearAllCompleted = document.querySelector('.clear-complete');
clearAllCompleted.addEventListener('click',()=>{
    let temparr=[];
    temparr = model.items.filter((itemss)=>{
        return !itemss.iscompleted;
    })
    model.items = temparr;
    controller.resetData();
    model.currentState = model.items;
    model.currentClicked = 'all';
    view.render(model.currentState);
})

let alltasks = document.querySelector('#all')
alltasks.addEventListener('click',()=>{
    model.currentClicked='all';
    model.currentState = model.items;
    view.render(model.currentState);
})

let completedTasks = document.querySelector('#completed')
completedTasks.addEventListener('click',()=>{
    model.currentClicked='completed';
    model.completed = model.items.filter(controller.checkCompleted);
    model.currentState = model.completed;
    view.render(model.currentState);
})

let remainingTasks = document.querySelector('#remaining')
remainingTasks.addEventListener('click',()=>{
    model.currentClicked='remaining';
    model.notCompleted = model.items.filter(controller.checkNotCompleted);
    model.currentState = model.notCompleted;
    view.render(model.currentState);
})
//adding event listener to the body to listen to ENTER click
document.addEventListener('keypress',controller.addItemOnEnter);
controller.init();


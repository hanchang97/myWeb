const toDoform = document.querySelector(".js-toDoForm");
const toDoInput = toDoform.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);          //filter -> array의 모든 아이템을 통해 함수를 실행, true인 아이템들만 가지고  새로운 array 생성
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); // String -> Int
    }); 
    console.log(cleanToDos); 
    toDos = cleanToDos; //교체!   
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //js object를 string으로
}

function paintToDo(text){
    const li = document.createElement("li"); //li 생성
    const delBtn = document.createElement("button"); //버튼 생성
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function something(toDo){
    console.log(toDo.text);
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        //json = 데이터 전달 시, 데이터 타입 변환
        const parsedToDos = JSON.parse(loadedToDos); // String -> Object
        parsedToDos.forEach(function(toDo){ //todo -> parsedToDos에 들어있는 각 원소 가리킨다
            paintToDo(toDo.text); //ls에서 가져와서 출력
        })
        //위와 같은 방법
        //parsedToDos.forEach(something);
    }
}

function init(){
    loadToDos();
    toDoform.addEventListener("submit", handleSubmit);
}

init();




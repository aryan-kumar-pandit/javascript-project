const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
// since the above value will not change so we have given const

/*
innerHTML -- Insert or retrieve HTML structure	
innerText -- Get or set plain visible text (no tags)
eg
<div id="box"><b>Hello</b> World</div>
document.getElementById("box").innerHTML;
// → "<b>Hello</b> World"

document.getElementById("box").innerText;
// → "Hello World"
*/

let editTodo = null;
const addTodo = ()=>{
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0)
    {
        alert("Please Enter text into it");
        return false;
    }

    if(addBtn.value === 'Edit'){
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value ="";
    }else{
    // creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);
    // creating edit button
    const editBtn=document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn","editBtn");
    li.appendChild(editBtn);

    //creating delete button
    const deleteBtn=document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn","deleteBtn");// adding class to this element
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";
    }
}

const updateTodo = (e)=>{
    //console.log(e.target.innerHtml);
    if(e.target.innerHTML === 'Remove'){
        console.log(e.target.parentElement);
        todoList.removeChild(e.target.parentElement);
    }
    if(e.target.innerHTML === 'Edit'){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }

}

addBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',updateTodo);


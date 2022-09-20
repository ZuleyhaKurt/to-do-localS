//!Selectors
const addBtn=document.getElementById("todo-button")
const todoInput=document.getElementById("todo-input")
const todoUl=document.getElementById("todo-ul")

let todos=JSON.parse(localStorage.getItem("TODOS")) || []
console.log(todos)



const renderSavedTodos=()=>{
    todos.forEach((todo)=>{
        createListElement(todo)
    })
}
renderSavedTodos()

addBtn.addEventListener("click",()=>{
if (todoInput.value.trim()===""){
    alert("please enter new todo")

}
else{
    const newTodo={
        id:new Date().getTime(),
        completed:false,
        text: todoInput.value,

       
    }
    createListElement(newTodo);
    

    todos.push(newTodo)

    localStorage.setItem("TODOS", JSON.stringify(todos))
    console.log(todos)
    
    todoInput.value="";
}

})

function createListElement (newTodo){

    const{id,completed,text}=newTodo

    const li=document.createElement("li")
    // li.id=newTodo.id
    li.setAttribute("id", id)
    
    completed ? li.classList.add("checked"): ""
    // newTodo.completed && li.classListadd("checked")

    const okIcon=document.createElement("i")
    okIcon.setAttribute("class","fas fa-check")
    li.appendChild(okIcon)
    console.log(li)
   
    const p=document.createElement("p")
    const pTextNode=document.createTextNode(text)
    p.appendChild(pTextNode)
    li.appendChild(p)

    
    const deleteIcon=document.createElement("i")
    deleteIcon.setAttribute("class","fas fa-trash")
    li.appendChild(deleteIcon)


todoUl.appendChild(li)
}
//Capturing yakalama 
todoUl.addEventListener("click",(e)=>{
   console.log(e.target)

   const id= e.target.parentElement.getAttribute("id")


   if(e.target.classList.contains("fa-trash")){
    e.target.parentElement.remove()

    todos=todos.filter((todo)=>todo.id !== Number(id) )
    console.log(todos)
   }
    else if(e.target.classList.contains("fa-check")){
    e.target.parentElement.classList.toggle("checked")

    todos.map((todo)=>{
       if(todo.id==id) {
        todo.completed=!todo.completed
       }
    })
    console.log(todos)
    //toogle varsa sil yoksa ekle
   }
})

todoInput.addEventListener("keydown",(e)=>{
    if(e.code==="Enter")
    addBtn.click()

})
window.onload=function(){
    todoInput.focus()
}
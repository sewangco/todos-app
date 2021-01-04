'use strict'

let todosArray = getSavedTodos()

const filters ={
    searchText :'',
    hideCompleted: false
}

renderTodos(todosArray,filters)

document.querySelector('#search-text').addEventListener('input',(e) => {
    filters.searchText=e.target.value
    renderTodos(todosArray,filters)
})

document.querySelector('#todo-form').addEventListener('submit',(e) => {
   
    const text = e.target.elements.newTodo.value.trim()
    e.preventDefault()

    if(text.length > 0){
        todosArray.push({
            id: uuidv4(),
            text,
            completed:false
        });
        saveTodos(todosArray)
        renderTodos(todosArray,filters)
        e.target.elements.newTodo.value= ''
    }
   
})

document.querySelector('#checkbox').addEventListener('change',(e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todosArray,filters)
})
    


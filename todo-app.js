let todosArray = getSavedTodos()
// const p =document.querySelectorAll('p')

// p.forEach(function(pTag){
//     if(pTag.textContent.includes('the')){
//         pTag.remove()
//     }
// })

// You have 2 todos left (p element)
// Add a p for each todo above (use text value)

const filters ={
    searchText :'',
    hideCompleted: false
}

renderTodos(todosArray,filters)


// //Listen for new todo text change
// document.querySelector('#new-todo').addEventListener('input', function(e){
//     console.log(e.target.value); 
    
// })

document.querySelector('#search-text').addEventListener('input',(e) => {
    filters.searchText=e.target.value
    renderTodos(todosArray,filters)
})

document.querySelector('#todo-form').addEventListener('submit',(e) => {
    e.preventDefault()
    todosArray.push({
        id: uuidv4(),
        text:e.target.elements.newTodo.value,
        completed:false
    });
    saveTodos(todosArray)
    renderTodos(todosArray,filters)
    e.target.elements.newTodo.value= ''
})

document.querySelector('#checkbox').addEventListener('change',(e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todosArray,filters)
})
    


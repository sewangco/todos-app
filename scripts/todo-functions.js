'use strict'

// fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try{
        return todosJSON ? JSON.parse(todosJSON): []
    } catch(e){
        return []
    }
}

// save todos to localStorage

const saveTodos = (todosArray) => {
    localStorage.setItem('todos', JSON.stringify(todosArray))
}

// render todos
const renderTodos =  (todosArray,filters) => {
    const todoEl = document.querySelector('#todos')
    let filteredTodos = todosArray.filter((todo) => {
        const searchTextMatch =todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) 
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
       
        return searchTextMatch && hideCompletedMatch
    })

    
    // filteredTodos =filteredTodos.filter(function(todo){
    //     // if(filters.hideCompleted=== true){
    //     //     return !todo.completed
    //     // }else{
    //     //     return todo 
    //     // }
    // })
    const incompletedTodos = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML= ''
    
    todoEl.appendChild(generateSummaryDOM(incompletedTodos))
    
    if(filteredTodos.length > 0){
        filteredTodos.forEach((todo) => {
        todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl= document.createElement('p')
        messageEl.classList.add('empty-Message')
        messageEl.textContent = 'No to-dos to show'
        todoEl.appendChild(messageEl)
    }

}
// setup remove note
const removeTodo = (id) => {
    const index= todosArray.findIndex((todo) => todo.id === id)
    if(index > -1){
        todosArray.splice(index,1)
    }
}
// toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todosArray.find((todo) => todo.id === id)

    if (todo){
        todo.completed = !todo.completed
    }
   
}


//generateTodo DOM
const generateTodoDOM = (todo) => {
    
    const todoEl= document.createElement('label')
    const containerEl= document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    
    //Setup todo checkbox
    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        saveTodos(todosArray)
        renderTodos(todosArray,filters)
    })

    //Setup todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    //Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //Setup todo remove button
    removeButton.textContent= 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todosArray)
        renderTodos(todosArray,filters)
    })
    
    return todoEl
}

//generateSummary DOM
const generateSummaryDOM = (incompletedTodos) => {
    const summary = document.createElement('h2')
    const plural = incompletedTodos.length ===1 ? '': 's'
    summary.classList.add('list-title')
    summary.textContent= `You have ${incompletedTodos.length} todo${plural} left`
    return summary
    
}
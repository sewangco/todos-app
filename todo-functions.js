
// fetch existing todos from localStorage
const getSavedTodos =function (){
    const todosJSON = localStorage.getItem('todos')

    if(todosJSON !== null){
        return JSON.parse(todosJSON)
    }else{
        return []
    }
}

// save todos to localStorage

const saveTodos =function (todosArray){
    localStorage.setItem('todos', JSON.stringify(todosArray))
}

// render todos
const renderTodos = function (todosArray,filters){
    let filteredTodos = todosArray.filter(function(todo){
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
    const incompletedTodos = filteredTodos.filter(function(todo){
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML= ''
  
    
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompletedTodos))
    
    filteredTodos.forEach(function(todo){
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}
// setup remove note
const removeTodo = function(id){
    const index= todosArray.findIndex(function(todo){
        return todo.id === id
    })
    if(index > -1){
        todosArray.splice(index,1)
    }
}
// toggle the completed value for a given todo
const toggleTodo = function(id){
    const todo = todosArray.find(function(todo){
        return todo.id === id 
    })
    if (todo !== undefined){
        todo.completed = !todo.completed
    }
   
}


//generateTodo DOM
const generateTodoDOM = function(todo){
    
    const todoEl= document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    
    //Setup todo checkbox
    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change', function(e){
        toggleTodo(todo.id)
        saveTodos(todosArray)
        renderTodos(todosArray,filters)
    })

    //Setup todo text
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    //Setup todo remove button
    removeButton.textContent= 'x'
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', function(){
        removeTodo(todo.id)
        saveTodos(todosArray)
        renderTodos(todosArray,filters)
    })
   
    return todoEl
}

//generateSummary DOM
const generateSummaryDOM = function(incompletedTodos){
const summary = document.createElement('h2')
    summary.textContent= `You have ${incompletedTodos.length} todos left`
    return summary
}
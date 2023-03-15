window.addEventListener("load", function() {
    const form = this.document.querySelector(".todo-form");
    console.log(form);

    const todoList = this.document.querySelector(".todo-list");

    let todos = localStorage.length > 0 ? JSON.parse(localStorage.getItem("todoList")) : [];



    // duyệt qua từng phần tử trong localStorage 
    // sau đó in nó ra màn hình
    if (Array.isArray(todos) && todos.length > 0) {
        [...todos].forEach(item => createTodoList(item));
    }



    // function này là để in các content ra todo list
    // to chỉ cần truyền content vào từ localstorage hoặc từ submit
    function createTodoList(content) {
        const template = `<div class="todo-item">
        <span class="todo-text">${content}
        </span>
        <i class="fa fa-trash todo-remove"></i>
    </div>`;

        todoList.insertAdjacentHTML("beforeend", template);
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const todoVal = this.elements["todo"].value;
        // console.log(todoVal);
        //main code
        if (todoVal == "") return 0;
        createTodoList(todoVal);

        todos.push(todoVal);



        localStorage && localStorage.setItem("todoList", JSON.stringify(todos));



        this.elements["todo"].value = "";
    })


    todoList.addEventListener("click", function(e) {
        if (e.target.matches(".todo-remove")) {
            //remove todo in dom
            const todo = e.target.parentNode;
            todo.parentNode.removeChild(todo);


            //remove todo in localstorage
            const todoText = e.target.previousElementSibling.textContent;
            const index = todos.findIndex((item) => item === todoText);
            todos.splice(index, 1);
            localStorage.setItem("todoList", JSON.stringify(todos));




        }
    })
})
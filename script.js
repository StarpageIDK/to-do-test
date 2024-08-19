const tasksList = document.querySelector(".task-list");
const taskInput = document.querySelector(".new-task input");

window.onload = () => {
    // Получаем лист с localeStorage
    const savedItems = JSON.parse(localStorage.getItem('tasks')) || [];
    savedItems.forEach(row => {
        displayTask(false, row);
    });
}

// Создаем кнопку удаления таска, передавая элемент в котором мы хотим создать эту кнопку
const addRemoveBtn = (li) => {
    const remove = document.createElement("span");

    remove.innerHTML = "❌";
    remove.className = "remove";
    remove.addEventListener("click", () => {
        const currentTasks = JSON.parse(localStorage.getItem('tasks'));
        const parent = li.parentNode;
        const index = Array.prototype.indexOf.call(parent.children, li);

        currentTasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
        parent.removeChild(li);
    })

    li.appendChild(remove);
}

// Функция отображение текста на страничке
const displayTask = (isNew, arr) => {
    const task = document.createElement('li');
    const currentTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (isNew) {
        const taskInputText = taskInput.value.trim();
        // Создаем новый таск
        if (!taskInputText) {
            alert("Введите текст");
            return;
        }
        task.textContent = taskInputText;
        // Добавляем наш таск в localStorage
        currentTasks.push(["active", `${taskInputText}`]);
        localStorage.setItem('tasks', JSON.stringify(currentTasks));

    } else {
        task.textContent = arr[1];
        task.classList.add(arr[0]);
    }
    task.classList.add("task");

    // Onclick выполнения таска
    task.addEventListener("click", (el) => completeTask(el));

    tasksList.appendChild(task);
    addRemoveBtn(task);
}

completeTask = (el) => {
    //Получаем родителя элемента для получения инедкса, 
    const elementParent = el.target.parentNode;
    const index = Array.prototype.indexOf.call(elementParent.children, el.target);
    const currentTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = el.target;

    if (task.classList.contains("complete")) {
        task.classList.remove("complete");
        task.classList.add("active");
        currentTasks[index][0] = "active";
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
    }
    else {
        task.classList.remove("active");
        task.classList.add("complete");
        currentTasks[index][0] = "complete";
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
    }
}
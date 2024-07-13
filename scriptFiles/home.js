// function login() {
//   var usernameInput = document.getElementById("username");
//   var username = usernameInput.value.trim();
  
//   if (username) {
//     var loginSection = document.getElementById("login-section");
//     loginSection.style.display = "none"; // Hide the login section
    
//     var welcomeMessage = document.getElementById("welcome-message-header");
//     welcomeMessage.textContent = "Welcome, " + username + "!";

//     var homepageSection = document.getElementById("homepage-section");
//     homepageSection.style.display = "block"; // Show the homepage section
//   }
// }

// // Function to display welcome message with user's name
// function displayWelcome() {
//   var name = prompt("Enter your name:");
//   if (name) {
//     var welcomeMessage = document.getElementById("welcome-message");
//     welcomeMessage.textContent = "Welcome, " + name + "!";
//     var header = document.querySelector("header");
//     header.classList.add("show"); // Add the "show" class to animate the header display
//   }
// }


  
function openCalendar() {
    // Add your calendar functionality here
    console.log("Opening calendar...");
  }
  
  function openTasks() {
    // Add your tasks functionality here
    console.log("Opening tasks...");
  }
  
  function openNotes() {
    // Add your notes functionality here
    console.log("Opening notes...");
  }
  
  function openSettings() {
    // Add your settings functionality here
    console.log("Opening settings...");
  }

  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        // Customize calendar options here
        initialView: 'dayGridMonth'
        // Add more options and events as needed
    });
    calendar.render();
});

  
  function addEvent() {
    var eventsList = document.getElementById("events-list");
    var eventName = prompt("Enter event name:");
    
    if (eventName) {
      var eventItem = document.createElement("li");
      eventItem.textContent = eventName;
      eventsList.appendChild(eventItem);
    }
  }
  
  // function addTask() {
  //   var tasksList = document.getElementById("tasks-list");
  //   var taskName = prompt("Enter task name:");
    
  //   if (taskName) {
  //     var taskItem = document.createElement("li");
  //     taskItem.textContent = taskName;
  //     tasksList.appendChild(taskItem);
  //   }
  // }
  
  function saveNotes() {
    var notesInput = document.getElementById("notes-input");
    var savedNotes = notesInput.value;
    
    // Add your notes saving functionality here
    console.log("Saving notes: " + savedNotes);
  }
  document.addEventListener('DOMContentLoaded', function () {
    const scheduleList = document.getElementById('scheduleList');
    const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTask');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const newScheduleInput = document.getElementById('newSchedule');
    const addScheduleBtn = document.getElementById('addScheduleBtn');
  
    addTaskBtn.addEventListener('click', function () {
      const taskText = newTaskInput.value.trim();
      if (taskText !== '') {
        addTaskToList(taskText);
        newTaskInput.value = '';
      }
    });
  
    addScheduleBtn.addEventListener('click', function () {
      const scheduleText = newScheduleInput.value.trim();
      if (scheduleText !== '') {
        addScheduleToList(scheduleText);
        newScheduleInput.value = '';
      }
    });
  
    function addScheduleToList(scheduleText) {
      const scheduleItem = document.createElement('li');
      scheduleItem.textContent = scheduleText;
  
      scheduleList.appendChild(scheduleItem);
    };
  
    function addTaskToList(taskText) {
      const taskItem = document.createElement('li');
      const taskTextElement = document.createElement('span');
      taskTextElement.textContent = taskText;
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function () {
        editTask(taskTextElement);
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        deleteTask(taskItem);
      });
  
      const doneCheckbox = document.createElement('input');
      doneCheckbox.type = 'checkbox';
      doneCheckbox.addEventListener('change', function () {
        markTaskAsDone(taskTextElement, doneCheckbox.checked);
      });
  
      taskItem.appendChild(doneCheckbox);
      taskItem.appendChild(taskTextElement);
      taskItem.appendChild(editButton);
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
  
      // Schedule a reminder for the new task
      scheduleReminder(taskText);
    }
  
    function editTask(taskTextElement) {
      const newText = prompt('Edit task:', taskTextElement.textContent);
      if (newText !== null) {
        taskTextElement.textContent = newText;
        // Update the reminder for the edited task
        scheduleReminder(newText);
      }
    }
  
    function deleteTask(taskItem) {
      const confirmDelete = confirm('Are you sure you want to delete this task?');
      if (confirmDelete) {
        taskList.removeChild(taskItem);
      }
    }
  
    function markTaskAsDone(taskTextElement, isDone) {
      if (isDone) {
        taskTextElement.classList.add('completed');
      } else {
        taskTextElement.classList.remove('completed');
      }
    }
  
    function scheduleReminder(taskText) {
      // Schedule a notification for the task with a 10-second delay (for demo purposes)
      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification('Reminder', { body: taskText });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('Reminder', { body: taskText });
            }
          });
        }
      }, 10000); // 10 seconds (adjust as needed)
    }
  
    // Sample initial data for the schedule
    // const scheduleData = ['Math Class', 'History Lecture', 'Lunch Break'];
  
    // Display the initial schedule data
    for (const item of scheduleData) {
      const scheduleItem = document.createElement('li');
      scheduleItem.textContent = item;
      scheduleList.appendChild(scheduleItem);
    }
  
    // Load tasks from localStorage if available
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      for (const task of savedTasks) {
        addTaskToList(task);
      }
    }
  
    // Save tasks to localStorage when the page is unloaded
    window.addEventListener('beforeunload', function () {
      const tasks = Array.from(document.querySelectorAll('#taskList span')).map(item => item.textContent);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  });
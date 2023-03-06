import { addProject, removeProject, saveToLocalStorage } from ".";
import { createTask } from "./tasks";

const createDomElement = (type, classNames, textContent) => {
  const element = document.createElement(type);
  if (textContent) {
    element.textContent = textContent;
  }
  classNames.forEach((className) => {
    element.classList.add(className);
  })
  return element;
}

const projectView = document.querySelector('.project-view');
const tasksView = document.querySelector('.tasks-view');

const validateInput = (input) => {
  return input.trim().length;
}

const addNewProjectDom = () => {
  projectView.style.minHeight = `${window.innerHeight - document.querySelector('.header').offsetHeight}px`;
  const addProjectForm = document.querySelector('.add-project-form');
  const addProjectInput = document.querySelector('.add-project-field');
  addProjectInput.addEventListener('keydown', () => {
    if (validateInput(addProjectInput.value)) {
      addProjectInput.setCustomValidity('');
    }
  })
  const cancelBtn = document.querySelector('.btn-cancel.btn-large');
  cancelBtn.addEventListener('click', () => {
    addProjectForm.classList.remove('activated');
  });
  const addBtn = document.querySelector('.add-project-form .btn-add',);
  addBtn.addEventListener('click', () => {
    if (validateInput(addProjectInput.value)) {
      addProject(addProjectInput.value.trim());
      addProjectInput.value = '';
      addProjectInput.setCustomValidity('');
      addProjectForm.classList.remove('activated');
      document.querySelector('.project:last-child').classList.add('active');
    } else {
      addProjectInput.setCustomValidity("Invalid field.");
    }
  })
  const addProjectDom = document.querySelector('.add-new-project');
  addProjectDom.onclick = () => {
    addProjectForm.classList.toggle('activated');
    addProjectInput.value = '';
    addProjectInput.setCustomValidity('');

  }
}

const confirmationContainer = document.querySelector('.confirmation-container');
const outerContainer = document.querySelector('.outer-container');
const btnConfirm = document.querySelector('.btn-confirm.btn-small');
const btnCancel = document.querySelector('.btn-cancel.btn-small');
const warning = document.querySelector('.confirmation-popup__warning');
const toggleOnOff = () => {
  outerContainer.classList.toggle('blurred-out');
  confirmationContainer.classList.toggle('open');
}

const confirmDeletion = (item, warningText, removalFunction) => {
  warning.textContent = warningText;
  toggleOnOff();
  btnCancel.onclick = function () {
    toggleOnOff();
  };
  btnConfirm.onclick = function () {
    removalFunction(item);
    toggleOnOff();
  }
}

const updateTasksViewDom0 = (project) => {
  updateTasksViewDom(project);
  window.scrollTo(0, 0);
  projectView.classList.remove('open');
  tasksView.classList.add('open');
}

const updateProjectsDom = (projects) => {

  console.log(`header height: ${document.querySelector('.header').offsetHeight}`);
  const projectsContainer = document.querySelector('.projects-container');
  projectsContainer.textContent = '';
  projects.forEach((project) => {
    updateTasksViewDom(project);
    const projectIcon = createDomElement('i', ['fa-solid', 'fa-list-check']);
    const projectName = createDomElement('p', ['project__name'], project.projectName);
    projectIcon.addEventListener('click', () => {
      updateTasksViewDom0(project);
    });
    const projectDeleteIcon = createDomElement('i', ['fa-solid', 'fa-trash-can', 'project__delete-icon']);
    projectDeleteIcon.addEventListener('click', () => {
      confirmDeletion(project, `Do you want to permanently delete project "${project.projectName}"?`, removeProject);
    });
    const projectDom = createDomElement('div', ['project']);
    projectDom.append(projectIcon, projectName, projectDeleteIcon);
    // console.log(projectDom);
    projectsContainer.appendChild(projectDom);
    projectName.onclick = () => {
      console.log(projectDom);
      projectDom.classList.add('active');
      const projectArr = [...document.querySelectorAll('.project')];
      // console.log(`projects in dom: ${projectArr}`);
      projectArr.forEach((p) => {
        if (p.firstElementChild.nextElementSibling.textContent !== project.projectName) {

          p.classList.remove('active');
        }
      })
      updateTasksViewDom0(project);
    }

  })
  addNewProjectDom();
}

const manipulateTaskContainer = document.querySelector('.manipulate-task-container')
const taskFormTitle = document.querySelector('.task-form__title');
const taskForm = document.querySelector('.task-form');
const formCloseIcon = document.querySelector('.task-form>.icon-close');
const taskTitleField = document.querySelector('#title');
const taskDetailsField = document.querySelector('#details');
const taskDueDate = document.querySelector('#due-date');
const taskPriorityField = document.querySelector('#priority')
const formSubmit = document.querySelector('.task-form__task-button>button');

const toggleForm = () => {
  outerContainer.classList.toggle('blurred-out');
  manipulateTaskContainer.classList.toggle('open');
  taskForm.classList.toggle('open');
}

const manipulateTask = (formTitle, project, task) => {
  taskFormTitle.textContent = formTitle;
  toggleForm();
  // taskTitleField.value = task.title || '';
  // taskDueDate.value = task.dueDate || new Date();
  // taskDetailsField.value = task.details || '';
  // taskPriorityField.checked = task.isPriority || false;
  taskTitleField.value = (task) ? task.title : '';
  taskDueDate.value = (task) ? task.dueDate : '';
  taskDetailsField.value = (task) ? task.details : '';
  taskPriorityField.checked = (task) ? task.isPriority : false;


  taskForm.onsubmit = function (e) {
    e.preventDefault();
    if (task) {
      task.title = taskTitleField.value;
      task.dueDate = taskDueDate.value;
      task.details = taskDetailsField.value;
      task.isPriority = taskPriorityField.checked;
      saveToLocalStorage();
      updateTasksViewDom(project);
    } else {
      let taskToAdd = createTask(
        taskTitleField.value,
        taskDueDate.value,
        taskDetailsField.value,
        taskPriorityField.checked
      );
      // console.log(`In the ${project.projectName} project, the new task is: ${taskToAdd.title}...`);
      project.addTask(taskToAdd);
    }
    toggleForm();
  }
}
const addTaskDiv = document.querySelector('.add-task');





const updateTasksViewDom = (project) => {
  addTaskDiv.onclick = () => {
    manipulateTask('Add new task', project);
  };
  formCloseIcon.onclick = toggleForm;
  // console.log(project);
  document.querySelector('.tasks-view__title-container>.icon-close').addEventListener('click', () => {
    tasksView.classList.remove('open');
    projectView.classList.add('open');
  })
  const tasksContainer = document.querySelector('.tasks-container');
  tasksContainer.textContent = "";
  const sectionTitle = document.querySelector('.task-view-section-title');
  sectionTitle.innerText = project.projectName;

  project.tasks.forEach((task) => {


    const taskDom = createDomElement('div', ['task']);
    const taskHeader = createDomElement('div', ['task__header']);
    let taskIcon = createDomElement('i', ['task__icon', 'fa-regular', 'fa-hand-point-right']);
    const taskTitle = createDomElement('p', ['task__title'], task.title);
    const taskChevron = createDomElement('i', ['task__icon-chevron', 'fa-solid', 'fa-chevron-down']);
    const taskDueDate = createDomElement('p', ['task__due-date'], `Due by: ${task.dueDate}`);
    const taskDetails = createDomElement('p', ['task__details'], task.details);
    const taskDeleteIcon = createDomElement('i', ['task__delete-icon', 'fa-solid', 'fa-trash-can']);
    taskDeleteIcon.onclick = () => {
      confirmDeletion(task, `Do you want to permanently delete task "${task.title}"?`, project.deleteTask.bind(project));
      // confirmTaskDeletion(project, task, `Do you want to permanently delete task "${task.title}"?`);
    }
    const taskEditIcon = createDomElement('i', ['task__edit-icon', 'fa-solid', 'fa-pencil']);
    taskEditIcon.onclick = () => {
      manipulateTask('Edit task', project, task);
    }


    const taskCompleteIcon = createDomElement('i', ['task__complete-icon', 'fa-regular', 'fa-square-check']);
    taskCompleteIcon.onclick = () => {
      task.isFinished = !task.isFinished;
      saveToLocalStorage();
      taskIcon = handleFinished(task, taskDom, taskHeader, taskIcon);
    }


    const taskBody = createDomElement('div', ['task__body']);
    const taskToolbox = createDomElement('div', ['task__toolbox']);

    taskHeader.append(taskIcon, taskTitle, taskChevron);
    taskHeader.addEventListener('click', () => {
      taskHeader.classList.toggle('open');
    })
    taskToolbox.append(taskDeleteIcon, taskEditIcon, taskCompleteIcon);
    taskBody.append(taskDueDate, taskDetails, taskToolbox);

    if (task.isPriority) {
      taskDom.classList.add('priority');
    } else {
      taskHeader.classList.remove('priority');
    }
    taskIcon = handleFinished(task, taskDom, taskHeader, taskIcon);
    taskDom.append(taskHeader, taskBody);

    tasksContainer.appendChild(taskDom);

  })
}

export { updateProjectsDom, updateTasksViewDom };



function handleFinished(task, taskDom, taskHeader, taskIcon) {
  if (task.isFinished) {
    taskDom.classList.add('finished');
    taskHeader.removeChild(taskHeader.firstChild);
    taskIcon = createDomElement('i', ['task__icon', 'fa-regular', 'fa-thumbs-up']);
    taskHeader.insertBefore(taskIcon, taskHeader.firstChild);
  } else {
    taskDom.classList.remove('finished');
    taskHeader.removeChild(taskHeader.firstChild);
    taskIcon = createDomElement('i', ['task__icon', 'fa-regular', 'fa-hand-point-right']);
    taskHeader.insertBefore(taskIcon, taskHeader.firstChild);
  }
  return taskIcon;
}
// const confirmTaskDeletion = (project, task, warningText) => {
//   warning.textContent = warningText;
//   toggleOnOff();
//   btnCancel.onclick = function () {
//     toggleOnOff();
//   };
//   btnConfirm.onclick = function () {
//     project.deleteTask(task)
//     toggleOnOff();
//   }
// }
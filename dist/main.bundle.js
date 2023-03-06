/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/style.scss":
/*!*******************************!*\
  !*** ./src/styles/style.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateProjectsDom": () => (/* binding */ updateProjectsDom),
/* harmony export */   "updateTasksViewDom": () => (/* binding */ updateTasksViewDom)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");



const tasksView = document.querySelector('.tasks-view');


function toggleTaskLayout(x) {
  const taskContainer = [...document.querySelectorAll('.tasks-container>.task')];
  taskContainer.forEach((task) => {
    const taskHeader = task.firstElementChild;
    const taskBody = task.lastElementChild;
    const taskChevron = taskHeader.lastElementChild;

    if (x.matches) {
      // If media query matches
      const toolbox = taskBody.getElementsByClassName('task__toolbox')[0];
      if (toolbox) {
        taskHeader.onclick = null;
        taskHeader.firstElementChild.onclick = () => { taskHeader.classList.toggle('open'); }
        taskHeader.firstElementChild.nextElementSibling.onclick = () => { taskHeader.classList.toggle('open'); }
        taskHeader.lastElementChild.onclick = () => { taskHeader.classList.toggle('open'); }
        taskBody.removeChild(toolbox);
        taskHeader.insertBefore(toolbox, taskChevron);
      }
    } else {
      const toolbox = taskHeader.getElementsByClassName('task__toolbox')[0];
      if (toolbox) {
        taskHeader.onclick = () => { taskHeader.classList.toggle('open'); }

        taskHeader.firstElementChild.onclick = null;
        taskHeader.firstElementChild.nextElementSibling.onclick = null;
        // console.log(taskHeader.firstElementChild.nextElementSibling);

        taskHeader.removeChild(toolbox);
        taskBody.appendChild(toolbox);
      }
    }
  })
}


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
  const cancelBtn = document.querySelector('.add-project-form .btn-cancel');
  cancelBtn.addEventListener('click', () => {
    addProjectForm.classList.remove('activated');
  });
  addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateInput(addProjectInput.value)) {
      (0,___WEBPACK_IMPORTED_MODULE_0__.addProject)(addProjectInput.value.trim());
      addProjectInput.value = '';
      addProjectInput.setCustomValidity('');
      addProjectForm.classList.remove('activated');
      // document.querySelector('.project:last-child').classList.add('active');
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

var x = window.matchMedia("(min-width: 600px)");


const updateProjectsDom = (projects) => {
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
      confirmDeletion(project, `Do you want to permanently delete project "${project.projectName}"?`, ___WEBPACK_IMPORTED_MODULE_0__.removeProject);
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
  document.querySelector('.project:last-child').classList.add('active');
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
      task.title = taskTitleField.value || 'Task';
      task.dueDate = taskDueDate.value;
      task.details = taskDetailsField.value;
      task.isPriority = taskPriorityField.checked;
      (0,___WEBPACK_IMPORTED_MODULE_0__.saveToLocalStorage)();
      updateTasksViewDom(project);
    } else {
      let taskToAdd = (0,_tasks__WEBPACK_IMPORTED_MODULE_1__.createTask)(
        taskTitleField.value || 'Task',
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
    taskIcon.onclick = () => { taskHeader.classList.toggle('open') };
    const taskTitle = createDomElement('p', ['task__title'], task.title);
    // taskTitle.onclick = () => { taskHeader.classList.toggle('open') };
    const taskChevron = createDomElement('i', ['task__icon-chevron', 'fa-solid', 'fa-chevron-down']);
    const taskDueDate = createDomElement('p', ['task__due-date'], `Due by: ${task.dueDate}`);
    const taskDetails = createDomElement('p', ['task__details'], task.details);
    const taskDeleteIcon = createDomElement('i', ['task__delete-icon', 'fa-solid', 'fa-trash-can']);
    taskDeleteIcon.onclick = () => {
      confirmDeletion(task, `Do you want to permanently delete task "${task.title}"?`, project.deleteTask.bind(project));
    }
    const taskEditIcon = createDomElement('i', ['task__edit-icon', 'fa-solid', 'fa-pencil']);
    taskEditIcon.onclick = () => {
      manipulateTask('Edit task', project, task);
    }
    const taskCompleteIcon = createDomElement('i', ['task__complete-icon', 'fa-regular', 'fa-square-check']);
    taskCompleteIcon.onclick = () => {
      task.isFinished = !task.isFinished;
      (0,___WEBPACK_IMPORTED_MODULE_0__.saveToLocalStorage)();
      taskIcon = handleFinished(task, taskDom, taskHeader, taskIcon);
    }

    const taskBody = createDomElement('div', ['task__body']);
    const taskToolbox = createDomElement('div', ['task__toolbox']);

    taskHeader.append(taskIcon, taskTitle, taskChevron);
    taskHeader.onclick = () => {
      taskHeader.classList.toggle('open');
    }
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
  toggleTaskLayout(x) // Call listener function at run time
  x.onchange = toggleTaskLayout;
}


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




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProject": () => (/* binding */ addProject),
/* harmony export */   "getProjects": () => (/* binding */ getProjects),
/* harmony export */   "removeProject": () => (/* binding */ removeProject),
/* harmony export */   "saveToLocalStorage": () => (/* binding */ saveToLocalStorage)
/* harmony export */ });
/* harmony import */ var _styles_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.scss */ "./src/styles/style.scss");
/* harmony import */ var _assets_logo_no_background_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/logo-no-background.png */ "./src/assets/logo-no-background.png");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom */ "./src/dom.js");






function insertImages() {
  const logoImg = document.getElementById('logo');
  logoImg.src = _assets_logo_no_background_png__WEBPACK_IMPORTED_MODULE_1__;
}

function saveToLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

const projects = localStorage.length > 0
  ? restoreFromStorage()
  : setDefaultProject();

(0,_dom__WEBPACK_IMPORTED_MODULE_4__.updateProjectsDom)(projects);

function getProjects() {
  return projects;
}

function addProject(projectName) {
  projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_2__.createProject)(projectName));
  (0,_dom__WEBPACK_IMPORTED_MODULE_4__.updateProjectsDom)(projects);
  saveToLocalStorage();
  // console.log(projects);
}

function removeProject(project) {
  let i = projects.indexOf(project);
  projects.splice(i, 1);
  (0,_dom__WEBPACK_IMPORTED_MODULE_4__.updateProjectsDom)(projects);
  saveToLocalStorage();
}

function restoreFromStorage() {
  const restoredArray = [];
  const states = JSON.parse(localStorage.getItem('projects'));
  states.forEach((project) => {
    restoredArray.push(Object.assign(project, (0,_projects__WEBPACK_IMPORTED_MODULE_2__.addProjectMethods)(project)));
  });
  console.log(restoredArray);
  return restoredArray;
}

function setDefaultProject() {
  const defaultProject = (0,_projects__WEBPACK_IMPORTED_MODULE_2__.createProject)('General Project');
  defaultProject.addTask((0,_tasks__WEBPACK_IMPORTED_MODULE_3__.createTask)('Task one', '2023-03-31', 'This is the first task in the default project', false, true));
  defaultProject.addTask((0,_tasks__WEBPACK_IMPORTED_MODULE_3__.createTask)('Task two', '2023-03-15', 'The second task in the default project is this one right here.', true, true));
  return [defaultProject];
}

insertImages();



/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProjectMethods": () => (/* binding */ addProjectMethods),
/* harmony export */   "createProject": () => (/* binding */ createProject)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



function createProject(projectName) {
  let state = {
    tasks: [],
    projectName,
  }
  return Object.assign({}, state, addProjectMethods(state));
}

const addProjectMethods = function (state) {
  return {
    addTask: function (task) {
      state.tasks.push(task);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.updateTasksViewDom)(this);
      if (!(task.isDefault)) {
        (0,___WEBPACK_IMPORTED_MODULE_0__.saveToLocalStorage)();
      }
    },
    deleteTask: function (task) {
      let index = this.tasks.indexOf(task);
      console.log(index);
      this.tasks.splice(index, 1);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.updateTasksViewDom)(this);
      (0,___WEBPACK_IMPORTED_MODULE_0__.saveToLocalStorage)();
    },

  }
};





/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTask": () => (/* binding */ createTask)
/* harmony export */ });
function createTask(title, dueDate, details, isPriority, isDefault) {
  return {
    title, dueDate, details, isPriority, isDefault,
    isFinished: false,
    dateCreated: new Date(),
  }
}



/***/ }),

/***/ "./src/assets/logo-no-background.png":
/*!*******************************************!*\
  !*** ./src/assets/logo-no-background.png ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/logo-no-background.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVmQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWFwcC8uL3NyYy9zdHlsZXMvc3R5bGUuc2Nzcz9hNWI0Iiwid2VicGFjazovL3RvLWRvLWFwcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLWFwcC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90by1kby1hcHAvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdG8tZG8tYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3RvLWRvLWFwcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvLWRvLWFwcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG8tZG8tYXBwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBhZGRQcm9qZWN0LCByZW1vdmVQcm9qZWN0LCBzYXZlVG9Mb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgY3JlYXRlVGFzayB9IGZyb20gXCIuL3Rhc2tzXCI7XG5cbmNvbnN0IHRhc2tzVmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy12aWV3Jyk7XG5cblxuZnVuY3Rpb24gdG9nZ2xlVGFza0xheW91dCh4KSB7XG4gIGNvbnN0IHRhc2tDb250YWluZXIgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tzLWNvbnRhaW5lcj4udGFzaycpXTtcbiAgdGFza0NvbnRhaW5lci5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgY29uc3QgdGFza0hlYWRlciA9IHRhc2suZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgdGFza0JvZHkgPSB0YXNrLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgdGFza0NoZXZyb24gPSB0YXNrSGVhZGVyLmxhc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICBpZiAoeC5tYXRjaGVzKSB7XG4gICAgICAvLyBJZiBtZWRpYSBxdWVyeSBtYXRjaGVzXG4gICAgICBjb25zdCB0b29sYm94ID0gdGFza0JvZHkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGFza19fdG9vbGJveCcpWzBdO1xuICAgICAgaWYgKHRvb2xib3gpIHtcbiAgICAgICAgdGFza0hlYWRlci5vbmNsaWNrID0gbnVsbDtcbiAgICAgICAgdGFza0hlYWRlci5maXJzdEVsZW1lbnRDaGlsZC5vbmNsaWNrID0gKCkgPT4geyB0YXNrSGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTsgfVxuICAgICAgICB0YXNrSGVhZGVyLmZpcnN0RWxlbWVudENoaWxkLm5leHRFbGVtZW50U2libGluZy5vbmNsaWNrID0gKCkgPT4geyB0YXNrSGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTsgfVxuICAgICAgICB0YXNrSGVhZGVyLmxhc3RFbGVtZW50Q2hpbGQub25jbGljayA9ICgpID0+IHsgdGFza0hlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7IH1cbiAgICAgICAgdGFza0JvZHkucmVtb3ZlQ2hpbGQodG9vbGJveCk7XG4gICAgICAgIHRhc2tIZWFkZXIuaW5zZXJ0QmVmb3JlKHRvb2xib3gsIHRhc2tDaGV2cm9uKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9vbGJveCA9IHRhc2tIZWFkZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndGFza19fdG9vbGJveCcpWzBdO1xuICAgICAgaWYgKHRvb2xib3gpIHtcbiAgICAgICAgdGFza0hlYWRlci5vbmNsaWNrID0gKCkgPT4geyB0YXNrSGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTsgfVxuXG4gICAgICAgIHRhc2tIZWFkZXIuZmlyc3RFbGVtZW50Q2hpbGQub25jbGljayA9IG51bGw7XG4gICAgICAgIHRhc2tIZWFkZXIuZmlyc3RFbGVtZW50Q2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nLm9uY2xpY2sgPSBudWxsO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0YXNrSGVhZGVyLmZpcnN0RWxlbWVudENoaWxkLm5leHRFbGVtZW50U2libGluZyk7XG5cbiAgICAgICAgdGFza0hlYWRlci5yZW1vdmVDaGlsZCh0b29sYm94KTtcbiAgICAgICAgdGFza0JvZHkuYXBwZW5kQ2hpbGQodG9vbGJveCk7XG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG5cbmNvbnN0IGNyZWF0ZURvbUVsZW1lbnQgPSAodHlwZSwgY2xhc3NOYW1lcywgdGV4dENvbnRlbnQpID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGlmICh0ZXh0Q29udGVudCkge1xuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcbiAgfVxuICBjbGFzc05hbWVzLmZvckVhY2goKGNsYXNzTmFtZSkgPT4ge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9KVxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuY29uc3QgcHJvamVjdFZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC12aWV3Jyk7XG5cblxuY29uc3QgdmFsaWRhdGVJbnB1dCA9IChpbnB1dCkgPT4ge1xuICByZXR1cm4gaW5wdXQudHJpbSgpLmxlbmd0aDtcbn1cblxuXG5jb25zdCBhZGROZXdQcm9qZWN0RG9tID0gKCkgPT4ge1xuICBwcm9qZWN0Vmlldy5zdHlsZS5taW5IZWlnaHQgPSBgJHt3aW5kb3cuaW5uZXJIZWlnaHQgLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJykub2Zmc2V0SGVpZ2h0fXB4YDtcbiAgY29uc3QgYWRkUHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtZm9ybScpO1xuICBjb25zdCBhZGRQcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtZmllbGQnKTtcbiAgYWRkUHJvamVjdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRlSW5wdXQoYWRkUHJvamVjdElucHV0LnZhbHVlKSkge1xuICAgICAgYWRkUHJvamVjdElucHV0LnNldEN1c3RvbVZhbGlkaXR5KCcnKTtcbiAgICB9XG4gIH0pXG4gIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1mb3JtIC5idG4tY2FuY2VsJyk7XG4gIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBhZGRQcm9qZWN0Rm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmF0ZWQnKTtcbiAgfSk7XG4gIGFkZFByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh2YWxpZGF0ZUlucHV0KGFkZFByb2plY3RJbnB1dC52YWx1ZSkpIHtcbiAgICAgIGFkZFByb2plY3QoYWRkUHJvamVjdElucHV0LnZhbHVlLnRyaW0oKSk7XG4gICAgICBhZGRQcm9qZWN0SW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGFkZFByb2plY3RJbnB1dC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XG4gICAgICBhZGRQcm9qZWN0Rm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmF0ZWQnKTtcbiAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0Omxhc3QtY2hpbGQnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWRkUHJvamVjdElucHV0LnNldEN1c3RvbVZhbGlkaXR5KFwiSW52YWxpZCBmaWVsZC5cIik7XG4gICAgfVxuICB9KVxuICBjb25zdCBhZGRQcm9qZWN0RG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1uZXctcHJvamVjdCcpO1xuICBhZGRQcm9qZWN0RG9tLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgYWRkUHJvamVjdEZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZhdGVkJyk7XG4gICAgYWRkUHJvamVjdElucHV0LnZhbHVlID0gJyc7XG4gICAgYWRkUHJvamVjdElucHV0LnNldEN1c3RvbVZhbGlkaXR5KCcnKTtcblxuICB9XG59XG5cbmNvbnN0IGNvbmZpcm1hdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25maXJtYXRpb24tY29udGFpbmVyJyk7XG5jb25zdCBvdXRlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdXRlci1jb250YWluZXInKTtcbmNvbnN0IGJ0bkNvbmZpcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWNvbmZpcm0uYnRuLXNtYWxsJyk7XG5jb25zdCBidG5DYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWNhbmNlbC5idG4tc21hbGwnKTtcbmNvbnN0IHdhcm5pbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybWF0aW9uLXBvcHVwX193YXJuaW5nJyk7XG5jb25zdCB0b2dnbGVPbk9mZiA9ICgpID0+IHtcbiAgb3V0ZXJDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYmx1cnJlZC1vdXQnKTtcbiAgY29uZmlybWF0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcbn1cblxuXG5jb25zdCBjb25maXJtRGVsZXRpb24gPSAoaXRlbSwgd2FybmluZ1RleHQsIHJlbW92YWxGdW5jdGlvbikgPT4ge1xuICB3YXJuaW5nLnRleHRDb250ZW50ID0gd2FybmluZ1RleHQ7XG4gIHRvZ2dsZU9uT2ZmKCk7XG4gIGJ0bkNhbmNlbC5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHRvZ2dsZU9uT2ZmKCk7XG4gIH07XG4gIGJ0bkNvbmZpcm0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZW1vdmFsRnVuY3Rpb24oaXRlbSk7XG4gICAgdG9nZ2xlT25PZmYoKTtcbiAgfVxufVxuXG5cbmNvbnN0IHVwZGF0ZVRhc2tzVmlld0RvbTAgPSAocHJvamVjdCkgPT4ge1xuICB1cGRhdGVUYXNrc1ZpZXdEb20ocHJvamVjdCk7XG4gIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgcHJvamVjdFZpZXcuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICB0YXNrc1ZpZXcuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xufVxuXG52YXIgeCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogNjAwcHgpXCIpO1xuXG5cbmNvbnN0IHVwZGF0ZVByb2plY3RzRG9tID0gKHByb2plY3RzKSA9PiB7XG4gIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWNvbnRhaW5lcicpO1xuICBwcm9qZWN0c0NvbnRhaW5lci50ZXh0Q29udGVudCA9ICcnO1xuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgdXBkYXRlVGFza3NWaWV3RG9tKHByb2plY3QpO1xuICAgIGNvbnN0IHByb2plY3RJY29uID0gY3JlYXRlRG9tRWxlbWVudCgnaScsIFsnZmEtc29saWQnLCAnZmEtbGlzdC1jaGVjayddKTtcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGNyZWF0ZURvbUVsZW1lbnQoJ3AnLCBbJ3Byb2plY3RfX25hbWUnXSwgcHJvamVjdC5wcm9qZWN0TmFtZSk7XG4gICAgcHJvamVjdEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB1cGRhdGVUYXNrc1ZpZXdEb20wKHByb2plY3QpO1xuICAgIH0pO1xuICAgIGNvbnN0IHByb2plY3REZWxldGVJY29uID0gY3JlYXRlRG9tRWxlbWVudCgnaScsIFsnZmEtc29saWQnLCAnZmEtdHJhc2gtY2FuJywgJ3Byb2plY3RfX2RlbGV0ZS1pY29uJ10pO1xuICAgIHByb2plY3REZWxldGVJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uZmlybURlbGV0aW9uKHByb2plY3QsIGBEbyB5b3Ugd2FudCB0byBwZXJtYW5lbnRseSBkZWxldGUgcHJvamVjdCBcIiR7cHJvamVjdC5wcm9qZWN0TmFtZX1cIj9gLCByZW1vdmVQcm9qZWN0KTtcbiAgICB9KTtcbiAgICBjb25zdCBwcm9qZWN0RG9tID0gY3JlYXRlRG9tRWxlbWVudCgnZGl2JywgWydwcm9qZWN0J10pO1xuICAgIHByb2plY3REb20uYXBwZW5kKHByb2plY3RJY29uLCBwcm9qZWN0TmFtZSwgcHJvamVjdERlbGV0ZUljb24pO1xuICAgIC8vIGNvbnNvbGUubG9nKHByb2plY3REb20pO1xuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3REb20pO1xuICAgIHByb2plY3ROYW1lLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhwcm9qZWN0RG9tKTtcbiAgICAgIHByb2plY3REb20uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBjb25zdCBwcm9qZWN0QXJyID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9qZWN0JyldO1xuICAgICAgLy8gY29uc29sZS5sb2coYHByb2plY3RzIGluIGRvbTogJHtwcm9qZWN0QXJyfWApO1xuICAgICAgcHJvamVjdEFyci5mb3JFYWNoKChwKSA9PiB7XG4gICAgICAgIGlmIChwLmZpcnN0RWxlbWVudENoaWxkLm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudCAhPT0gcHJvamVjdC5wcm9qZWN0TmFtZSkge1xuICAgICAgICAgIHAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB1cGRhdGVUYXNrc1ZpZXdEb20wKHByb2plY3QpO1xuICAgIH1cbiAgfSlcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3Q6bGFzdC1jaGlsZCcpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICBhZGROZXdQcm9qZWN0RG9tKCk7XG5cbn1cblxuY29uc3QgbWFuaXB1bGF0ZVRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFuaXB1bGF0ZS10YXNrLWNvbnRhaW5lcicpXG5jb25zdCB0YXNrRm9ybVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybV9fdGl0bGUnKTtcbmNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybScpO1xuY29uc3QgZm9ybUNsb3NlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0+Lmljb24tY2xvc2UnKTtcbmNvbnN0IHRhc2tUaXRsZUZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XG5jb25zdCB0YXNrRGV0YWlsc0ZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RldGFpbHMnKTtcbmNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZS1kYXRlJyk7XG5jb25zdCB0YXNrUHJpb3JpdHlGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpXG5jb25zdCBmb3JtU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybV9fdGFzay1idXR0b24+YnV0dG9uJyk7XG5cblxuY29uc3QgdG9nZ2xlRm9ybSA9ICgpID0+IHtcbiAgb3V0ZXJDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYmx1cnJlZC1vdXQnKTtcbiAgbWFuaXB1bGF0ZVRhc2tDb250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xuICB0YXNrRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XG59XG5cblxuY29uc3QgbWFuaXB1bGF0ZVRhc2sgPSAoZm9ybVRpdGxlLCBwcm9qZWN0LCB0YXNrKSA9PiB7XG4gIHRhc2tGb3JtVGl0bGUudGV4dENvbnRlbnQgPSBmb3JtVGl0bGU7XG4gIHRvZ2dsZUZvcm0oKTtcbiAgLy8gdGFza1RpdGxlRmllbGQudmFsdWUgPSB0YXNrLnRpdGxlIHx8ICcnO1xuICAvLyB0YXNrRHVlRGF0ZS52YWx1ZSA9IHRhc2suZHVlRGF0ZSB8fCBuZXcgRGF0ZSgpO1xuICAvLyB0YXNrRGV0YWlsc0ZpZWxkLnZhbHVlID0gdGFzay5kZXRhaWxzIHx8ICcnO1xuICAvLyB0YXNrUHJpb3JpdHlGaWVsZC5jaGVja2VkID0gdGFzay5pc1ByaW9yaXR5IHx8IGZhbHNlO1xuICB0YXNrVGl0bGVGaWVsZC52YWx1ZSA9ICh0YXNrKSA/IHRhc2sudGl0bGUgOiAnJztcbiAgdGFza0R1ZURhdGUudmFsdWUgPSAodGFzaykgPyB0YXNrLmR1ZURhdGUgOiAnJztcbiAgdGFza0RldGFpbHNGaWVsZC52YWx1ZSA9ICh0YXNrKSA/IHRhc2suZGV0YWlscyA6ICcnO1xuICB0YXNrUHJpb3JpdHlGaWVsZC5jaGVja2VkID0gKHRhc2spID8gdGFzay5pc1ByaW9yaXR5IDogZmFsc2U7XG4gIHRhc2tGb3JtLm9uc3VibWl0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRhc2spIHtcbiAgICAgIHRhc2sudGl0bGUgPSB0YXNrVGl0bGVGaWVsZC52YWx1ZSB8fCAnVGFzayc7XG4gICAgICB0YXNrLmR1ZURhdGUgPSB0YXNrRHVlRGF0ZS52YWx1ZTtcbiAgICAgIHRhc2suZGV0YWlscyA9IHRhc2tEZXRhaWxzRmllbGQudmFsdWU7XG4gICAgICB0YXNrLmlzUHJpb3JpdHkgPSB0YXNrUHJpb3JpdHlGaWVsZC5jaGVja2VkO1xuICAgICAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XG4gICAgICB1cGRhdGVUYXNrc1ZpZXdEb20ocHJvamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0YXNrVG9BZGQgPSBjcmVhdGVUYXNrKFxuICAgICAgICB0YXNrVGl0bGVGaWVsZC52YWx1ZSB8fCAnVGFzaycsXG4gICAgICAgIHRhc2tEdWVEYXRlLnZhbHVlLFxuICAgICAgICB0YXNrRGV0YWlsc0ZpZWxkLnZhbHVlLFxuICAgICAgICB0YXNrUHJpb3JpdHlGaWVsZC5jaGVja2VkXG4gICAgICApO1xuICAgICAgLy8gY29uc29sZS5sb2coYEluIHRoZSAke3Byb2plY3QucHJvamVjdE5hbWV9IHByb2plY3QsIHRoZSBuZXcgdGFzayBpczogJHt0YXNrVG9BZGQudGl0bGV9Li4uYCk7XG4gICAgICBwcm9qZWN0LmFkZFRhc2sodGFza1RvQWRkKTtcbiAgICB9XG4gICAgdG9nZ2xlRm9ybSgpO1xuICB9XG59XG5cbmNvbnN0IGFkZFRhc2tEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2snKTtcblxuXG5jb25zdCB1cGRhdGVUYXNrc1ZpZXdEb20gPSAocHJvamVjdCkgPT4ge1xuICBhZGRUYXNrRGl2Lm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgbWFuaXB1bGF0ZVRhc2soJ0FkZCBuZXcgdGFzaycsIHByb2plY3QpO1xuICB9O1xuICBmb3JtQ2xvc2VJY29uLm9uY2xpY2sgPSB0b2dnbGVGb3JtO1xuICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tzLXZpZXdfX3RpdGxlLWNvbnRhaW5lcj4uaWNvbi1jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIHRhc2tzVmlldy5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XG4gICAgcHJvamVjdFZpZXcuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICB9KVxuICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcy1jb250YWluZXInKTtcbiAgdGFza3NDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay12aWV3LXNlY3Rpb24tdGl0bGUnKTtcbiAgc2VjdGlvblRpdGxlLmlubmVyVGV4dCA9IHByb2plY3QucHJvamVjdE5hbWU7XG5cbiAgcHJvamVjdC50YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgY29uc3QgdGFza0RvbSA9IGNyZWF0ZURvbUVsZW1lbnQoJ2RpdicsIFsndGFzayddKTtcbiAgICBjb25zdCB0YXNrSGVhZGVyID0gY3JlYXRlRG9tRWxlbWVudCgnZGl2JywgWyd0YXNrX19oZWFkZXInXSk7XG4gICAgbGV0IHRhc2tJY29uID0gY3JlYXRlRG9tRWxlbWVudCgnaScsIFsndGFza19faWNvbicsICdmYS1yZWd1bGFyJywgJ2ZhLWhhbmQtcG9pbnQtcmlnaHQnXSk7XG4gICAgdGFza0ljb24ub25jbGljayA9ICgpID0+IHsgdGFza0hlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJykgfTtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBjcmVhdGVEb21FbGVtZW50KCdwJywgWyd0YXNrX190aXRsZSddLCB0YXNrLnRpdGxlKTtcbiAgICAvLyB0YXNrVGl0bGUub25jbGljayA9ICgpID0+IHsgdGFza0hlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJykgfTtcbiAgICBjb25zdCB0YXNrQ2hldnJvbiA9IGNyZWF0ZURvbUVsZW1lbnQoJ2knLCBbJ3Rhc2tfX2ljb24tY2hldnJvbicsICdmYS1zb2xpZCcsICdmYS1jaGV2cm9uLWRvd24nXSk7XG4gICAgY29uc3QgdGFza0R1ZURhdGUgPSBjcmVhdGVEb21FbGVtZW50KCdwJywgWyd0YXNrX19kdWUtZGF0ZSddLCBgRHVlIGJ5OiAke3Rhc2suZHVlRGF0ZX1gKTtcbiAgICBjb25zdCB0YXNrRGV0YWlscyA9IGNyZWF0ZURvbUVsZW1lbnQoJ3AnLCBbJ3Rhc2tfX2RldGFpbHMnXSwgdGFzay5kZXRhaWxzKTtcbiAgICBjb25zdCB0YXNrRGVsZXRlSWNvbiA9IGNyZWF0ZURvbUVsZW1lbnQoJ2knLCBbJ3Rhc2tfX2RlbGV0ZS1pY29uJywgJ2ZhLXNvbGlkJywgJ2ZhLXRyYXNoLWNhbiddKTtcbiAgICB0YXNrRGVsZXRlSWNvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgY29uZmlybURlbGV0aW9uKHRhc2ssIGBEbyB5b3Ugd2FudCB0byBwZXJtYW5lbnRseSBkZWxldGUgdGFzayBcIiR7dGFzay50aXRsZX1cIj9gLCBwcm9qZWN0LmRlbGV0ZVRhc2suYmluZChwcm9qZWN0KSk7XG4gICAgfVxuICAgIGNvbnN0IHRhc2tFZGl0SWNvbiA9IGNyZWF0ZURvbUVsZW1lbnQoJ2knLCBbJ3Rhc2tfX2VkaXQtaWNvbicsICdmYS1zb2xpZCcsICdmYS1wZW5jaWwnXSk7XG4gICAgdGFza0VkaXRJY29uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBtYW5pcHVsYXRlVGFzaygnRWRpdCB0YXNrJywgcHJvamVjdCwgdGFzayk7XG4gICAgfVxuICAgIGNvbnN0IHRhc2tDb21wbGV0ZUljb24gPSBjcmVhdGVEb21FbGVtZW50KCdpJywgWyd0YXNrX19jb21wbGV0ZS1pY29uJywgJ2ZhLXJlZ3VsYXInLCAnZmEtc3F1YXJlLWNoZWNrJ10pO1xuICAgIHRhc2tDb21wbGV0ZUljb24ub25jbGljayA9ICgpID0+IHtcbiAgICAgIHRhc2suaXNGaW5pc2hlZCA9ICF0YXNrLmlzRmluaXNoZWQ7XG4gICAgICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgIHRhc2tJY29uID0gaGFuZGxlRmluaXNoZWQodGFzaywgdGFza0RvbSwgdGFza0hlYWRlciwgdGFza0ljb24pO1xuICAgIH1cblxuICAgIGNvbnN0IHRhc2tCb2R5ID0gY3JlYXRlRG9tRWxlbWVudCgnZGl2JywgWyd0YXNrX19ib2R5J10pO1xuICAgIGNvbnN0IHRhc2tUb29sYm94ID0gY3JlYXRlRG9tRWxlbWVudCgnZGl2JywgWyd0YXNrX190b29sYm94J10pO1xuXG4gICAgdGFza0hlYWRlci5hcHBlbmQodGFza0ljb24sIHRhc2tUaXRsZSwgdGFza0NoZXZyb24pO1xuICAgIHRhc2tIZWFkZXIub25jbGljayA9ICgpID0+IHtcbiAgICAgIHRhc2tIZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xuICAgIH1cbiAgICB0YXNrVG9vbGJveC5hcHBlbmQodGFza0RlbGV0ZUljb24sIHRhc2tFZGl0SWNvbiwgdGFza0NvbXBsZXRlSWNvbik7XG4gICAgdGFza0JvZHkuYXBwZW5kKHRhc2tEdWVEYXRlLCB0YXNrRGV0YWlscywgdGFza1Rvb2xib3gpO1xuXG4gICAgaWYgKHRhc2suaXNQcmlvcml0eSkge1xuICAgICAgdGFza0RvbS5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXNrSGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ByaW9yaXR5Jyk7XG4gICAgfVxuICAgIHRhc2tJY29uID0gaGFuZGxlRmluaXNoZWQodGFzaywgdGFza0RvbSwgdGFza0hlYWRlciwgdGFza0ljb24pO1xuICAgIHRhc2tEb20uYXBwZW5kKHRhc2tIZWFkZXIsIHRhc2tCb2R5KTtcblxuICAgIHRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEb20pO1xuXG4gIH0pXG4gIHRvZ2dsZVRhc2tMYXlvdXQoeCkgLy8gQ2FsbCBsaXN0ZW5lciBmdW5jdGlvbiBhdCBydW4gdGltZVxuICB4Lm9uY2hhbmdlID0gdG9nZ2xlVGFza0xheW91dDtcbn1cblxuXG5mdW5jdGlvbiBoYW5kbGVGaW5pc2hlZCh0YXNrLCB0YXNrRG9tLCB0YXNrSGVhZGVyLCB0YXNrSWNvbikge1xuICBpZiAodGFzay5pc0ZpbmlzaGVkKSB7XG4gICAgdGFza0RvbS5jbGFzc0xpc3QuYWRkKCdmaW5pc2hlZCcpO1xuICAgIHRhc2tIZWFkZXIucmVtb3ZlQ2hpbGQodGFza0hlYWRlci5maXJzdENoaWxkKTtcbiAgICB0YXNrSWNvbiA9IGNyZWF0ZURvbUVsZW1lbnQoJ2knLCBbJ3Rhc2tfX2ljb24nLCAnZmEtcmVndWxhcicsICdmYS10aHVtYnMtdXAnXSk7XG4gICAgdGFza0hlYWRlci5pbnNlcnRCZWZvcmUodGFza0ljb24sIHRhc2tIZWFkZXIuZmlyc3RDaGlsZCk7XG4gIH0gZWxzZSB7XG4gICAgdGFza0RvbS5jbGFzc0xpc3QucmVtb3ZlKCdmaW5pc2hlZCcpO1xuICAgIHRhc2tIZWFkZXIucmVtb3ZlQ2hpbGQodGFza0hlYWRlci5maXJzdENoaWxkKTtcbiAgICB0YXNrSWNvbiA9IGNyZWF0ZURvbUVsZW1lbnQoJ2knLCBbJ3Rhc2tfX2ljb24nLCAnZmEtcmVndWxhcicsICdmYS1oYW5kLXBvaW50LXJpZ2h0J10pO1xuICAgIHRhc2tIZWFkZXIuaW5zZXJ0QmVmb3JlKHRhc2tJY29uLCB0YXNrSGVhZGVyLmZpcnN0Q2hpbGQpO1xuICB9XG4gIHJldHVybiB0YXNrSWNvbjtcbn1cblxuZXhwb3J0IHsgdXBkYXRlUHJvamVjdHNEb20sIHVwZGF0ZVRhc2tzVmlld0RvbSB9O1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9zdHlsZS5zY3NzJztcbmltcG9ydCBsb2dvIGZyb20gJy4vYXNzZXRzL2xvZ28tbm8tYmFja2dyb3VuZC5wbmcnO1xuaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgYWRkUHJvamVjdE1ldGhvZHMgfSBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB7IGNyZWF0ZVRhc2sgfSBmcm9tICcuL3Rhc2tzJztcbmltcG9ydCB7IHVwZGF0ZVByb2plY3RzRG9tIH0gZnJvbSAnLi9kb20nO1xuXG5mdW5jdGlvbiBpbnNlcnRJbWFnZXMoKSB7XG4gIGNvbnN0IGxvZ29JbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9nbycpO1xuICBsb2dvSW1nLnNyYyA9IGxvZ287XG59XG5cbmZ1bmN0aW9uIHNhdmVUb0xvY2FsU3RvcmFnZSgpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcbn1cblxuY29uc3QgcHJvamVjdHMgPSBsb2NhbFN0b3JhZ2UubGVuZ3RoID4gMFxuICA/IHJlc3RvcmVGcm9tU3RvcmFnZSgpXG4gIDogc2V0RGVmYXVsdFByb2plY3QoKTtcblxudXBkYXRlUHJvamVjdHNEb20ocHJvamVjdHMpO1xuXG5mdW5jdGlvbiBnZXRQcm9qZWN0cygpIHtcbiAgcmV0dXJuIHByb2plY3RzO1xufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gIHByb2plY3RzLnB1c2goY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSkpO1xuICB1cGRhdGVQcm9qZWN0c0RvbShwcm9qZWN0cyk7XG4gIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICAvLyBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVByb2plY3QocHJvamVjdCkge1xuICBsZXQgaSA9IHByb2plY3RzLmluZGV4T2YocHJvamVjdCk7XG4gIHByb2plY3RzLnNwbGljZShpLCAxKTtcbiAgdXBkYXRlUHJvamVjdHNEb20ocHJvamVjdHMpO1xuICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcbn1cblxuZnVuY3Rpb24gcmVzdG9yZUZyb21TdG9yYWdlKCkge1xuICBjb25zdCByZXN0b3JlZEFycmF5ID0gW107XG4gIGNvbnN0IHN0YXRlcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xuICBzdGF0ZXMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgIHJlc3RvcmVkQXJyYXkucHVzaChPYmplY3QuYXNzaWduKHByb2plY3QsIGFkZFByb2plY3RNZXRob2RzKHByb2plY3QpKSk7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhyZXN0b3JlZEFycmF5KTtcbiAgcmV0dXJuIHJlc3RvcmVkQXJyYXk7XG59XG5cbmZ1bmN0aW9uIHNldERlZmF1bHRQcm9qZWN0KCkge1xuICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IGNyZWF0ZVByb2plY3QoJ0dlbmVyYWwgUHJvamVjdCcpO1xuICBkZWZhdWx0UHJvamVjdC5hZGRUYXNrKGNyZWF0ZVRhc2soJ1Rhc2sgb25lJywgJzIwMjMtMDMtMzEnLCAnVGhpcyBpcyB0aGUgZmlyc3QgdGFzayBpbiB0aGUgZGVmYXVsdCBwcm9qZWN0JywgZmFsc2UsIHRydWUpKTtcbiAgZGVmYXVsdFByb2plY3QuYWRkVGFzayhjcmVhdGVUYXNrKCdUYXNrIHR3bycsICcyMDIzLTAzLTE1JywgJ1RoZSBzZWNvbmQgdGFzayBpbiB0aGUgZGVmYXVsdCBwcm9qZWN0IGlzIHRoaXMgb25lIHJpZ2h0IGhlcmUuJywgdHJ1ZSwgdHJ1ZSkpO1xuICByZXR1cm4gW2RlZmF1bHRQcm9qZWN0XTtcbn1cblxuaW5zZXJ0SW1hZ2VzKCk7XG5cbmV4cG9ydCB7IGFkZFByb2plY3QsIHJlbW92ZVByb2plY3QsIGdldFByb2plY3RzLCBzYXZlVG9Mb2NhbFN0b3JhZ2UgfSIsImltcG9ydCB7IHNhdmVUb0xvY2FsU3RvcmFnZSB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyB1cGRhdGVUYXNrc1ZpZXdEb20gfSBmcm9tIFwiLi9kb21cIjtcblxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICBsZXQgc3RhdGUgPSB7XG4gICAgdGFza3M6IFtdLFxuICAgIHByb2plY3ROYW1lLFxuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWRkUHJvamVjdE1ldGhvZHMoc3RhdGUpKTtcbn1cblxuY29uc3QgYWRkUHJvamVjdE1ldGhvZHMgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICBhZGRUYXNrOiBmdW5jdGlvbiAodGFzaykge1xuICAgICAgc3RhdGUudGFza3MucHVzaCh0YXNrKTtcbiAgICAgIHVwZGF0ZVRhc2tzVmlld0RvbSh0aGlzKTtcbiAgICAgIGlmICghKHRhc2suaXNEZWZhdWx0KSkge1xuICAgICAgICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlbGV0ZVRhc2s6IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICBsZXQgaW5kZXggPSB0aGlzLnRhc2tzLmluZGV4T2YodGFzayk7XG4gICAgICBjb25zb2xlLmxvZyhpbmRleCk7XG4gICAgICB0aGlzLnRhc2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB1cGRhdGVUYXNrc1ZpZXdEb20odGhpcyk7XG4gICAgICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgICB9LFxuXG4gIH1cbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVByb2plY3QsIGFkZFByb2plY3RNZXRob2RzIH07XG5cbiIsImZ1bmN0aW9uIGNyZWF0ZVRhc2sodGl0bGUsIGR1ZURhdGUsIGRldGFpbHMsIGlzUHJpb3JpdHksIGlzRGVmYXVsdCkge1xuICByZXR1cm4ge1xuICAgIHRpdGxlLCBkdWVEYXRlLCBkZXRhaWxzLCBpc1ByaW9yaXR5LCBpc0RlZmF1bHQsXG4gICAgaXNGaW5pc2hlZDogZmFsc2UsXG4gICAgZGF0ZUNyZWF0ZWQ6IG5ldyBEYXRlKCksXG4gIH1cbn1cblxuZXhwb3J0IHsgY3JlYXRlVGFzayB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
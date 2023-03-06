import { saveToLocalStorage } from ".";
import { updateTasksViewDom } from "./dom";

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
      updateTasksViewDom(this);
      if (!(task.isDefault)) {
        saveToLocalStorage();
      }
    },
    deleteTask: function (task) {
      let index = this.tasks.indexOf(task);
      console.log(index);
      this.tasks.splice(index, 1);
      updateTasksViewDom(this);
      saveToLocalStorage();
    },

  }
};

export { createProject, addProjectMethods };


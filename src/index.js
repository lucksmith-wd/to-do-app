import './styles/style.scss';
import logo from './assets/logo-no-background.png';
import { createProject, addProjectMethods } from './projects';
import { createTask } from './tasks';
import { updateProjectsDom } from './dom';

function insertImages() {
  const logoImg = document.getElementById('logo');
  logoImg.src = logo;
}

function saveToLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

const projects = localStorage.length > 0
  ? restoreFromStorage()
  : setDefaultProject();

updateProjectsDom(projects);

function getProjects() {
  return projects;
}

function addProject(projectName) {
  projects.push(createProject(projectName));
  updateProjectsDom(projects);
  saveToLocalStorage();
  // console.log(projects);
}

function removeProject(project) {
  let i = projects.indexOf(project);
  projects.splice(i, 1);
  updateProjectsDom(projects);
  saveToLocalStorage();
}

function restoreFromStorage() {
  const restoredArray = [];
  const states = JSON.parse(localStorage.getItem('projects'));
  states.forEach((project) => {
    restoredArray.push(Object.assign(project, addProjectMethods(project)));
  });
  console.log(restoredArray);
  return restoredArray;
}

function setDefaultProject() {
  const defaultProject = createProject('General Project');
  defaultProject.addTask(createTask('Task one', '2023-03-31', 'This is the first task in the default project', false, true));
  defaultProject.addTask(createTask('Task two', '2023-03-15', 'The second task in the default project is this one right here.', true, true));
  return [defaultProject];
}

insertImages();

export { addProject, removeProject, getProjects, saveToLocalStorage }
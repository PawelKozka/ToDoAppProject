import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import MainNavigation from './navigation/MainNavigation/MainNavigation.jsx';
import SideNavigation from './navigation/SideNavigation/SideNavigation.jsx';
import MainSection from './MainSectionDisplay/MainSection';
import ModalAddTask from './Modals/ModalAddTask/ModalAddTask.jsx';
import ModalAddProject from './Modals/ModalAddProject/ModalAddProject.jsx';

class App extends Component {

  state = {
    tasks: [
      {
        id: 0,
        text: 'Pierwsze zadanie',
        date: '2020-11-13',
        active: true,
        finishDate: null,
        important: true,
        project: 'Praca',
        description: '',
      },
    ],
    projects: [
      {
        id: 0,
        name: 'Praca',
        active: true,
        finishDate: '',
        activeTasks: [],
      },
    ],
    modalAddTaskActive: false,
    modalAddProjectActive: false,
  }
  counterProjects = this.state.projects.length;
  counterTasks = this.state.tasks.length;

  // Funkcje wykonywane na zadaniach

  deleteTask = (id) => {
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(task => task.id !== id)
    this.setState({
      tasks
    })
  };
  changeTaskStatus = (id) => {
    let tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === id) {
        task.active = !task.active;
        task.finishDate = new Date().getTime()
      }
    })
    this.setState({
      tasks
    })
  };
  undoTaskDone = (id) => {
    let tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === id) {
        task.finishDate = '';
        task.active = true;
      }
    })
    this.setState({
      tasks
    })
  };
  addTask = (text, date, important, project, description) => {
    const Task = {
      id: this.counterTasks,
      text,
      date,
      active: true,
      finishDate: null,
      important,
      project,
      description,
    }
    this.counterTasks++;
    this.setState(prevState => ({
      tasks: [...prevState.tasks, Task]
    }))
    return true;
  };
  editTask = (id, newText, newDate, newImportant, newProject, newDescription) => {
    let tasks = [...this.state.tasks];
    let editedTask = { ...tasks[id] };
    editedTask.text = newText;
    editedTask.date = newDate;
    editedTask.important = newImportant;
    editedTask.project = newProject;
    editedTask.description = newDescription;
    tasks[id] = editedTask;
    this.setState({
      tasks: tasks,
    })
  }
  // Funkcje wykonywane na projektach

  addProject = (name) => {
    const project = {
      id: this.counterProjects,
      name,
      active: true,
    }
    this.counterProjects++;
    this.setState(prevState => ({
      projects: [...prevState.projects, project]
    }))
    return true;
  };
  undoProjectDone = (id) => {
    let projects = [...this.state.projects];
    projects.forEach(project => {
      if (project.id === id) {
        project.active = true;
        project.finishDate = ''
      }
    })
    this.setState({
      projects
    })
  };
  changeProjectStatus = (id) => {
    let projects = [...this.state.projects];
    const project = projects.filter(project => project.id === id)
    let tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.project === project[0].name) {
        this.changeTaskStatus(task.id);
      }
    })
    projects.forEach(project => {
      if (project.id === id) {
        project.active = false;
        project.finishDate = new Date().getTime()
      }
    })
    this.setState({
      projects: projects,
      tasks: tasks
    })
  };
  deleteProject = (id) => {
    let projects = [...this.state.projects]
    const project = projects.filter(project => project.id === id)
    let tasks = [...this.state.tasks]
    projects = projects.filter(project => project.id !== id)
    tasks = tasks.filter(task => task.project !== project[0].name)
    this.setState({
      projects: projects,
      tasks: tasks,
    })
  };
  editProject = (id, newName) => {
    let projects = [...this.state.projects];
    let editedProject = { ...projects[id] };
    const oldName = editedProject.name
    editedProject.name = newName;
    projects[id] = editedProject;
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.project === oldName) {
        task.project = newName;
      }
    });
    this.setState({
      projects: projects,
      tasks: tasks,
    })
    return true
  }

  // funkcje do wyświetlania modali

  showModalAddTask = () => {
    this.setState({
      modalAddTaskActive: !this.state.modalAddTaskActive
    })
  };
  showModalAddProject = () => {
    this.setState({
      modalAddProjectActive: !this.state.modalAddProjectActive
    })
  };
  render() {
    return (
      <Router>
        <div className="wrapper" >
          <MainNavigation
            projects={this.state.projects}
            showModalAddTask={this.showModalAddTask}
            showModalAddProject={this.showModalAddProject} />
          <SideNavigation
            projects={this.state.projects}
            deleteProject={this.deleteProject}
            finishProject={this.changeProjectStatus}
            undoFinishProject={this.undoProjectDone}
            editProject={this.editProject}
            tasks={this.state.tasks} />
          <MainSection
            tasks={this.state.tasks}
            deleteTask={this.deleteTask}
            changeTask={this.changeTaskStatus}
            addTask={this.addTask}
            editTask={this.editTask}
            undoTaskDone={this.undoTaskDone}
            projects={this.state.projects}
            deleteProject={this.deleteProject}
            finishProject={this.changeProjectStatus}
            undoFinishProject={this.undoProjectDone}
            editProject={this.editProject}
          />
          {this.state.modalAddTaskActive &&
            <ModalAddTask
              addTask={this.addTask}
              projects={this.state.projects}
              showModalAddTask={this.showModalAddTask} />
          }
          {this.state.modalAddProjectActive &&
            <ModalAddProject
              addProject={this.addProject}
              showModalAddProject={this.showModalAddProject} />
          }
        </div>
      </Router >
    );
  }
}

export default App;

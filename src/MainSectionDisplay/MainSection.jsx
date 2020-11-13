import React from 'react';
import { Route } from 'react-router-dom';
import ActiveTaskList from '../TaskList/ActiveTaskList/ActiveTaskList';
import DoneTaskList from '../TaskList/DoneTaskList/DoneTaskList';
import DoneProjectsList from '../ProjectList/DoneProjectList/DoneProjectsList';
import TasksInProject from '../ProjectList/TasksInProject/TasksInProject';

const MainSection = props => {

  const projectList = props.projects.filter(project => project.active).map(project => {
    const pathLink = `/${project.name}`;
    return (
      <Route key={project.name} path={pathLink}>
        <TasksInProject
          tasks={props.tasks}
          project={project}
          addTask={props.addTask}
          changeTask={props.changeTask}
          undoTaskDone={props.undoTaskDone}
          editTask={props.editTask}
          deleteTask={props.deleteTask}
          projects={props.projects}
          deleteProject={props.deleteProject}
          finishProject={props.finishProject}
          undoFinishProject={props.undoFinishProject}
          editProject={props.editProject} />
      </Route>
    )
  })
  return (
    <>
      <main className="main">
        <Route path="/to-do">
          <ActiveTaskList tasks={props.tasks} deleteTask={props.deleteTask} changeTask={props.changeTask} editTask={props.editTask} projects={props.projects} />
        </Route>
        <Route path="/done-tasks">
          < DoneTaskList tasks={props.tasks} delete={props.delete} undo={props.undo} editTask={props.editTask} projects={props.projects} undoTaskDone={props.undoTaskDone} />
        </Route>
        <Route path="/done-projects">
          <DoneProjectsList
            projects={props.projects}
            deleteProject={props.deleteProject}
            finishProject={props.finishProject}
            undoFinishProject={props.undoFinishProject}
            tasks={props.tasks}
            changeTask={props.changeTask}
            editProject={props.editProject}
            deleteTask={props.deleteTask}
            undoTaskDone={props.undoTaskDone} />
        </Route>
        {projectList}
      </main>
    </>
  )
}

export default MainSection;
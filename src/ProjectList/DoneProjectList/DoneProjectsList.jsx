import React from 'react';
import DoneProject from '../ProjectWrapper/DoneProject/DoneProject';

const DoneProjectsList = props => {
  const done = props.projects.filter(project => !project.active)
  if (done.length >= 2) {
    done.sort((a, b) => {
      if (a.finishDate < b.finishDate) {
        return 1
      }
      if (a.finishDate > b.finishDate) {
        return -1
      }
      return 0
    })
  }
  const doneProjects = done.map(item => {
    let projectWord = item.name.toLowerCase();
    let letter = projectWord[0].toUpperCase();
    item.name = letter + projectWord.slice(1, projectWord.length);

    return <li key={item.name} className="project" >
      <DoneProject project={item} deleteProject={props.deleteProject} finishProject={props.finishProject}
        undoFinishProject={props.undoFinishProject} tasks={props.tasks} editProject={props.editProject} deleteTask={props.deleteTask} changeTask={props.changeTask} editTask={props.editTask} projects={props.projects} undoTaskDone={props.undoTaskDone} />
    </li>
  })
  return (
    <div className="done">
      <h2>Wykonane projekty<em>({doneProjects.length})</em></h2>
      {doneProjects}
    </div>
  )
}

export default DoneProjectsList;

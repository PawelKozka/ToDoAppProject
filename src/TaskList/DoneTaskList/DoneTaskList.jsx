import React from 'react';
import TaskElement from '../TaskElement/TaskElement';


const DoneTaskList = props => {
  const done = props.tasks.filter(task => !task.active)
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
  const doneTasks = done.map(task => <TaskElement key={task.id} task={task} deleteTask={props.deleteTask} changeTask={props.changeTask} undo={props.undo} editTask={props.editTask} projects={props.projects}
    undoTaskDone={props.undoTaskDone} />)
  return (
    <div className="done">
      <h2>Wykonane zadania<em>({doneTasks.length})</em></h2>
      {doneTasks}
    </div>
  )
}

export default DoneTaskList;
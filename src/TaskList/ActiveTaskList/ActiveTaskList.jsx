import React from 'react';
import TaskElement from '../TaskElement/TaskElement';
import './ActiveTaskList.css';

const TaskList = props => {

  const active = props.tasks.filter(task => task.active)

  if (active.length >= 2) {
    active.sort((a, b) => {
      a = a.text.toLowerCase();
      b = b.text.toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;

    })
  }

  const activeTasks = active.map(task => <TaskElement key={task.id} task={task} deleteTask={props.deleteTask} changeTask={props.changeTask} editTask={props.editTask} projects={props.projects} />)

  return (
    <>
      <div className="active">
        <h2>lista zadań</h2>
        {activeTasks.length > 0 ? activeTasks : <p>Brak zadań do wykonania</p>}
      </div>
    </>
  )
}

export default TaskList;
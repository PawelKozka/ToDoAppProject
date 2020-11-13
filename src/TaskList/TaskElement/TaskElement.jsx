import React from 'react';

import ActiveTask from '../ActiveTask/ActiveTask';
import DoneTask from '../DoneTask/DoneTask';

const Task = props => {
  const { active } = props.task;
  if (active) {
    return (
      <ActiveTask task={props.task} deleteTask={props.deleteTask} changeTask={props.changeTask} editTask={props.editTask} projects={props.projects} />
    )
  } else {
    return (
      <>
        <DoneTask task={props.task} deleteTask={props.deleteTask} changeTask={props.changeTask} undo={props.undo} editTask={props.editTask} projects={props.projects} undoTaskDone={props.undoTaskDone} />
      </>
    )
  }
}

export default Task;
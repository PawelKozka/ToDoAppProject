import React, { useState } from 'react';
import ActiveTask from '../../TaskList/ActiveTask/ActiveTask';
import DoneTask from '../../TaskList/DoneTask/DoneTask';
import styles from './TasksInProject.module.scss';

import ModalProjectActions from '../../Modals/ModalProjectActions/ModalProjectActions';

const TasksInProject = props => {
  const [isActionPanelShowed, setIsActionPanelShowed] = useState(false);
  const [areDoneTasksShowed, setAreDoneTasksShowed] = useState(false);

  const handleShowActions = () => {
    setIsActionPanelShowed(prev => !prev)
  }


  const taskListInProject = props.tasks.filter(task => task.project === props.project.name);
  const activeTaskList = taskListInProject.filter(task => task.active).map(task => {
    return (
      <ActiveTask key={task.id} task={task} deleteTask={props.deleteTask} changeTask={props.changeTask} editTask={props.editTask} projects={props.projects} />
    )
  }
  )
  const doneTaskList = taskListInProject.filter(task => !task.active).map(task => {
    return (
      <DoneTask key={task.id} task={task} deleteTask={props.deleteTask} changeTask={props.changeTask} undoTaskDone={props.undoTaskDone} editTask={props.editTask} projects={props.projects} />
    )
  })
  const handleShowDoneTasks = () => {
    setAreDoneTasksShowed(prev => !prev)
  }
  return (
    <div>
      <div>
        <h2>{props.project.name}</h2>
        <div className={styles.dots__wrapper} onClick={handleShowActions}><span className={styles.dots}></span></div>
        {isActionPanelShowed && <ModalProjectActions project={props.project} actionPanel={handleShowActions} deleteProject={props.deleteProject} finishProject={props.finishProject} undoFinishProject={props.undoFinishProject} editProject={props.editProject} addTask={props.addTask} projects={props.projects} showDoneTasksList={handleShowDoneTasks} tasks={props.tasks} />}
      </div>
      <ul>
        {activeTaskList}
      </ul>
      {areDoneTasksShowed ?
        <>
          <h3 className={styles.done}>Wykonane ({doneTaskList.length})</h3>
          <ul> {doneTaskList}</ul>
        </>
        :
        null}
    </div>
  )
}

export default TasksInProject;
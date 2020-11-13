import React, { useState } from 'react';
import TaskElement from '../../TaskList/TaskElement/TaskElement';
import ModalEditProject from '../../Modals/ModalEditProject/ModalEditProject';

import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faCheckSquare, faEdit, faChevronDown, faUndo } from '@fortawesome/free-solid-svg-icons';

const Project = props => {
  const [showTasks, setShowTasks] = useState(false);
  const { id, name, active, finishDate } = props.project;
  const [isEditingActive, setIsEditingActive] = useState(false);

  let tasks = props.tasks;
  let taskArray = [];
  let displayTasks = []
  tasks.forEach(task => {
    if (task.project === name) {
      taskArray.push(task);
    }
  });

  displayTasks = taskArray.map(task => <TaskElement key={task.id} task={task} delete={props.delete} change={props.change} projectActive={props.project.active} editTask={props.editTask} projects={props.projects} />)

  const handleDeleteProjectWithTasks = () => {
    tasks.forEach(task => {

      if (task.project === name) { props.delete(task.id) }
    })
    props.deleteProject(id)
  }


  const handleShowTasks = () => {
    setShowTasks(prev => !prev);
  }

  const Edit = e => {
    console.log(e)
    setIsEditingActive(prev => !prev)
  }
  const handleFinishProjectWithTasks = () => {
    props.tasks.forEach(task => {
      if (task.project === name) { props.change(task.id) }
    })
    props.finishProject(id)
  }

  const handleUndoFinishProjectWithTasks = () => {
    tasks.forEach(task => {

      if (task.project === name) { props.change(task.id) }
    })
    props.undoFinishProject(id)
  }

  const showTasksInProject = () => {
    if (displayTasks.length !== 0) {
      return displayTasks
    } else return <li>Brak zadań w projekcie</li>
  }

  if (active) {
    return (
      <>
        <div className="task">
          <div >
            <Tooltip title="Kliknij aby potwierdzić wykonanie" placement="left">
              <div className="icon-undo-delete-edit-show">
                <FontAwesomeIcon icon={faCheckSquare} size="2x" onClick={handleFinishProjectWithTasks} />
              </div>
            </Tooltip>
            <span>{name}</span>
          </div>
          <div>
            <Tooltip title="Kliknij aby zobaczyć zadania" placement="bottom">
              <div className="icon-undo-delete-edit-show" >
                <FontAwesomeIcon icon={faChevronDown} size="2x" onClick={handleShowTasks} />
              </div>
            </Tooltip>
            <Tooltip title="Kliknij aby edytować projekt" placement="bottom">
              <div className="icon-undo-delete-edit-show" onClick={Edit}>
                <FontAwesomeIcon icon={faEdit} size="2x" />
              </div>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Kliknij aby usunąć projekt" placement="right">
              <div className="icon-undo-delete-edit-show">
                <FontAwesomeIcon icon={faMinusSquare} size="2x" onClick={handleDeleteProjectWithTasks} />
              </div>
            </Tooltip>
          </div>
        </div >
        <ul className="project-tasks">
          {showTasks && showTasksInProject()}
        </ul>
        {isEditingActive && <ModalEditProject project={props.project} editProject={props.editProject} isEditingActive={Edit} />}
      </>
    )
  } else if (!active) {
    const finish = new Date(finishDate).toLocaleDateString()
    return (
      <>
        <div className="task">
          <div >
            <Tooltip title="Kliknij aby cofnąć wykonanie" placement="left">
              <div className="icon-undo-delete-edit-show">
                <FontAwesomeIcon icon={faUndo} size="2x" onClick={handleUndoFinishProjectWithTasks} />
              </div>
            </Tooltip>
            <span>{name}</span>
          </div>
          <div>
            <Tooltip title="Kliknij aby zobaczyć zadania" placement="bottom">
              <div className="icon-undo-delete-edit-show">
                <FontAwesomeIcon icon={faChevronDown} size="2x" onClick={handleShowTasks} />
              </div>
            </Tooltip>
            <Tooltip title="Kliknij aby edytować projekt" placement="bottom">
              <div className="icon-undo-delete-edit-show">
                <FontAwesomeIcon icon={faEdit} size="2x" onClick={Edit} />
              </div>
            </Tooltip>
          </div>
          <div>
            <em>{finish}</em>
            <Tooltip title="Kliknij aby usunąć projekt" placement="right">
              <div className="icon-undo-delete-edit-show">
                <FontAwesomeIcon icon={faMinusSquare} size="2x" onClick={handleDeleteProjectWithTasks} />
              </div>
            </Tooltip>
          </div>
        </div >
        <ul className="project-tasks">
          {showTasks && showTasksInProject()}
        </ul>
        {isEditingActive && <ModalEditProject project={props.project} editProject={props.editProject} isEditingActive={Edit} />}
      </>
    )
  }
}

export default Project;
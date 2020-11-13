import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ProjectInNavigation.module.scss';
import ModalEditProject from '../../../Modals/ModalEditProject/ModalEditProject';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const ProjectInNavigation = props => {
  const [projectActions, setPojectActions] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);

  const handleShowEditPanel = () => {
    setShowEditPanel(prev => !prev);
    setPojectActions(false);
  }
  return (
    <li className={styles.projectList} onMouseEnter={() => setPojectActions(true)} onMouseLeave={() => setPojectActions(false)}>
      <span className={styles.list__circle}></span>
      <NavLink to={props.project.name}><span className={styles.project__name}>{props.project.name}</span></NavLink>
      <div className={styles.actions} >
        {projectActions &&
          <>
            <FontAwesomeIcon icon={faCheckSquare} size="2x" className={styles.project__action} onClick={() => props.finishProject(props.currentID)} />
            <FontAwesomeIcon icon={faEdit} size="2x" className={styles.project__action} onClick={handleShowEditPanel} />
          </>
        }
        {showEditPanel && <ModalEditProject editProject={props.editProject} project={props.project} handleShowEditPanel={handleShowEditPanel} tasks={props.tasks} />}
      </div>
    </li>
  )
}

export default ProjectInNavigation;
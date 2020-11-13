import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideNavigation.module.scss';
import ProjectInNavigation from './ProjectInNavigation/ProjectInNavigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const list = [
  { routeName: "Lista Zadań", path: "/to-do" },
  { routeName: "Projekty", path: "/projects" },
  { routeName: "Zrobione Zadania", path: "/done-tasks" },
  { routeName: "Wykonane projekty", path: "/done-projects" },
]
const SideNavigation = props => {
  const [isProjectListShowed, setIsProjectListShowed] = useState(false);

  const handleShowProjectList = () => setIsProjectListShowed(prev => !prev);

  const showProjectList = props.projects.filter(project => project.active).map(project =>
    <ProjectInNavigation key={project.id} project={project} deleteProject={props.deleteProject} finishProject={props.finishProject} currentID={project.id} editProject={props.editProject} tasks={props.tasks} />
  )
  const menu = list.map(item => {
    if (item.routeName === "Projekty") {
      return (
        <div key={item.routeName}>
          <li className={styles.row__element__project}>
            {isProjectListShowed ?
              <FontAwesomeIcon icon={faAngleDown} size="1x" className={styles.icon__navigation} />
              :
              <FontAwesomeIcon icon={faAngleRight} size="1x" className={styles.icon__navigation} />
            }
            <span onClick={handleShowProjectList}>{item.routeName}</span>
            {isProjectListShowed && <ul>{showProjectList}</ul>}
          </li>
        </div>
      )
    } else {
      return (
        <li key={item.routeName} className={styles.row__element}>
          <NavLink to={item.path} exact={item.exact ? item.exact : false}>{item.routeName}</NavLink>
        </li>
      )
    }
  }
  )
  return (
    <aside className="aside-menu">
      <ul className={styles.sideNavigation__wrapper}>
        {menu}
      </ul>
    </aside>
  )
}

export default SideNavigation;

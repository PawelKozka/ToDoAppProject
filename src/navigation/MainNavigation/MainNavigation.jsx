import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MainNavigation.module.scss';


const MainNavigation = props => {
  const [isShowedAsideMenu, setIsShowedAsideMenu] = useState(false);
  let projectOption = [...props.projects];

  const showAsideMenu = (e) => {
    e.preventDefault();
    setIsShowedAsideMenu(prev => !prev);
    const asideMenu = document.querySelector(".aside-menu");
    if (!isShowedAsideMenu) {
      asideMenu.style.opacity = '0';
      setTimeout(() => asideMenu.style.display = 'none', 200)

    } else if (isShowedAsideMenu) {
      asideMenu.style.display = 'block'
      setTimeout(() => asideMenu.style.opacity = '1', 100)
    }
  }

  const handleShowModalAddTask = () => {
    if (projectOption.length === 0) return alert('Najpierw dodaj projekt')
    props.showModalAddTask()
  }
  const handleShowModalAddProject = () => {
    props.showModalAddProject()
  }

  return (
    <nav className="top-navigation">
      <ul className={styles.navAbsolute}>
        <div className={styles.navAbsolute__leftSide}>
          <li className={styles.navAbsolute__leftSide__showSideMenu} onClick={showAsideMenu}><button>Menu</button></li>
          <li className={styles.navAbsolute__leftSide__home}><NavLink to='/' exact={true} >Home</NavLink></li>
        </div>
        <div className={styles.navAbsolute__rigthSide}>
          <li className={styles.navAbsolute__rigthSide__addTask} onClick={handleShowModalAddTask}>
            <button>Dodaj zadanie</button></li>
          <li className={styles.navAbsolute__rigthSide__addProject} onClick={handleShowModalAddProject}><button>Dodaj projekt</button></li>
        </div>
      </ul>
    </nav>
  )
}
export default MainNavigation;

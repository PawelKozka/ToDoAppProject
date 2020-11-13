import React from 'react';
import styles from './DateInfo.module.scss';

const DateInfo = ({ date = 0, finish = 0 }) => {

  let daysDisActive;
  if (finish !== 0) {
    let nowTime = new Date().toISOString().slice(0, 10);
    nowTime = new Date(nowTime).getTime();
    let dayInfo = finish - nowTime;
    dayInfo = dayInfo / (60 * 60 * 24 * 1000) + 1;
    if (dayInfo > 1) {
      daysDisActive = Math.abs(Math.floor(dayInfo));
    }
  }

  let daysActive;
  let daysAfterDeadline;

  let myDate = new Date(date).getTime();
  let currentDate = new Date().toISOString().slice(0, 10);
  currentDate = new Date(currentDate).getTime();
  let dayInfo = myDate - currentDate;
  dayInfo = dayInfo / (60 * 60 * 24 * 1000);
  daysActive = Math.round(dayInfo);
  if (daysActive < 0) {
    daysAfterDeadline = Math.abs(daysActive)
  }
  let showInfo;

  if (date !== 0 & finish === 0) {
    if (daysActive < 0) {
      showInfo = <><span >Po czasie:</span><span >{daysAfterDeadline} dni</span></>
    } else if (daysActive === 0) {
      showInfo = <><span >Zrób dzisiaj!</span></>
    } else {
      showInfo = <><span >Zrób w ciągu:</span><span >{daysActive + 1} dni</span></>
    }
  }
  if (date === 0 & finish !== 0) {
    if (daysDisActive > 1) {
      showInfo = <><span >Wykonano:</span><span >{daysDisActive} dni temu</span></>
    } else if (daysDisActive === 1) {
      showInfo = <><span >Wykonano:</span><span >Wczoraj</span></>
    } else {
      showInfo = <><span >Wykonano:</span><span >Dzisiaj</span></>
    }
  }
  return (
    <div className={styles.task__hoveredDateInfo} id="hovered-date">
      {showInfo}
    </div>
  )
}

export default DateInfo;
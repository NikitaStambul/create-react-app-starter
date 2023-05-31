import React from 'react';
import styles from './Crosshair.module.scss';

export const Crosshair = () => {
  return (
    <div className={styles['crosshair-container']}>
      <div className={styles['crosshair-horizontal']} />
      <div className={styles['crosshair-vertical']} />
    </div>
  );
};

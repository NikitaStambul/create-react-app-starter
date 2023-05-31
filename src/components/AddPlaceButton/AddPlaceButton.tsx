import React from 'react';
import styles from './AddPlaceButton.module.scss';

export const AddPlaceButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { className, ...restProps } = props;

  return (
    <button className={styles.button} {...restProps}>
      +
    </button>
  );
};

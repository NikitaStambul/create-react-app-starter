import React from 'react';
import styles from './PopupContent.module.scss';
import { Place } from '../../types/Place';
import classNames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  place: Place;
}

export const PopupContent = ({ place, className, ...restProps }: Props) => {
  return (
    <div className={classNames(styles.popup, className)} {...restProps}>
      <h3 className={styles.name}>{place.name}</h3>
      <h4 className={styles.description}>{place.description}</h4>
    </div>
  );
};

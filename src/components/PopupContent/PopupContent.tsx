import React from 'react';
import styles from './PopupContent.module.scss';
import { Place } from '../../types/Place';
import classNames from 'classnames';
import { deleteById } from '../../api/places';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  place: Place;
}

export const PopupContent = ({ place, className, ...restProps }: Props) => {
  const handleDeleteClick = async (id: string) => {
    await deleteById(id);
  }

  return (
    <div className={classNames(styles.popup, className)} {...restProps}>
      <h3 className={styles.name}>{place.name}</h3>
      <h4 className={styles.description}>{place.description}</h4>
      <button className={styles.delete} onClick={() => handleDeleteClick(place.id)}>Delete place</button>
    </div>
  );
};

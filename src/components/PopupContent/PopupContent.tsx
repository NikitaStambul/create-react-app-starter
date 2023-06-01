import React, { useState } from 'react';
import styles from './PopupContent.module.scss';
import { Place } from '../../types/Place';
import classNames from 'classnames';
import { deleteById } from '../../api/places';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  place: Place;
  reload: () => Promise<void>;
}

export const PopupContent = ({
  place,
  className,
  reload,
  ...restProps
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = async (id: string) => {
    setIsLoading(true);
    await deleteById(id);
    reload();
  };

  return isLoading ? (
    <h3 className={styles.name}>Deleting...</h3>
  ) : (
    <div className={classNames(styles.popup, className)} {...restProps}>
      <h3 className={styles.name}>{place.name}</h3>
      <h4 className={styles.description}>{place.description}</h4>
      <button
        className={styles.delete}
        onClick={() => handleDeleteClick(place.id)}
      >
        Delete place
      </button>
    </div>
  );
};

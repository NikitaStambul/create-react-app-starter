import React, { useState } from 'react';
import styles from './PopupForm.module.scss';
import classNames from 'classnames';
import { postPlace } from '../../api/places';
import { useMap } from 'react-leaflet';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  reloadPlaces: () => Promise<void>;
  handleShadowClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const PopupForm = (props: Props) => {
  const map = useMap();

  const { lat, lng } = map.getCenter();

  const {
    className,
    reloadPlaces,
    handleShadowClick,
    ...restProps
  } = props;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latitude: `${lat}` || '',
    longitude: `${lng}` || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({
      name: '',
      description: '',
      latitude: '',
      longitude: '',
    });

    await postPlace(formData);
    await reloadPlaces();
  };

  return (
    <>
      <div
        className={classNames(styles['popup-form'], className)}
        {...restProps}
      >
        <h2>Add new Place</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles['input-container']}>
            <label htmlFor="name">Name:</label>
            <input
              placeholder="Please enter name"
              className={styles.input}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles['input-container']}>
            <label htmlFor="description">Description:</label>
            <input
              placeholder="Please enter description"
              className={styles.input}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className={styles['input-container']}>
            <label htmlFor="latitude">Latitude:</label>
            <input
              placeholder="Please enter latitude"
              className={styles.input}
              type="text"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </div>

          <div className={styles['input-container']}>
            <label htmlFor="longitude">Longitude:</label>
            <input
              placeholder="Please enter longitude"
              className={styles.input}
              type="text"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </div>

          <button className={styles.submit} type="submit">
            Add
          </button>
        </form>
      </div>
      <div
        className={styles['popup-shadow']}
        onClick={handleShadowClick}
      />
    </>
  );
};

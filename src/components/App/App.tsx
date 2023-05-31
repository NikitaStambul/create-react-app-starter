import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import 'leaflet/dist/leaflet.css';
import { AddPlaceButton } from '../AddPlaceButton';
import { Crosshair } from '../Crosshair';
import { PopupForm } from '../PopupForm';
import { getAllPlaces } from '../../api/places';
import { Place } from '../../types/Place';
import { Map } from '../Map';
import { useMap } from 'react-leaflet';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const map = useMap();
  const { lat, lng } = map.getCenter();

  const getPlaces = async () => {
    const response = await getAllPlaces();
    setPlaces(response.data);
  };

  useEffect(() => {
    getPlaces();
  }, []);

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setIsFormVisible(true);
  };

  const handleShadowClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setIsFormVisible(false);
  };

  return (
    <div className="App">
      <Map places={places} />
      <AddPlaceButton onClick={handleAddClick} />
      <Crosshair />
      {isFormVisible && (
        <>
          <PopupForm
            reloadPlaces={getPlaces}
            latitude={`${lat}`}
            longitude={`${lng}`}
          />
          <div className={styles['popup-shadow']} onClick={handleShadowClick}></div>
        </>
      )}
    </div>
  );
}

export default App;

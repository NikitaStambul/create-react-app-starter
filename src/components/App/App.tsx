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
  const map = useMap();

  const { lat, lng } = map.getCenter();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);

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

  return (
    <div className={styles.app}>
      <Map places={places} />
      <AddPlaceButton onClick={handleAddClick} />
      <Crosshair />
      {isFormVisible && (
        <>
          <PopupForm
            reloadPlaces={getPlaces}
            latitude={`${lat}`}
            longitude={`${lng}`}
            handleShadowClick={() => setIsFormVisible(false)}
          />
        </>
      )}
    </div>
  );
}

export default App;

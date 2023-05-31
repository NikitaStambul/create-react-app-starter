import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App/App';
import { MapContainer } from 'react-leaflet';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <MapContainer center={[50, 15]} zoom={5}>
      <App />
    </MapContainer>
  </React.StrictMode>,
);

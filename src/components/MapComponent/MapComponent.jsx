import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import styles from './mapComponent.module.css'


function MapComponent() {
return (
<div className={styles.mapSizing}>
<MapContainer center={[47.5661541251246, -52.7094622252908]} zoom={14} style={{height: "100%", width: "100%"}}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[47.5661541251246, -52.7094622252908]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
</div>
);
}

export default MapComponent;
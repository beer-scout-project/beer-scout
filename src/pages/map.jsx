import MapComponent from '/src/components/MapComponent/MapComponent';
import '../../src/index.css';

const map = () => {
  return (
    <div>
      <div>map</div>
    
      <div className='map-container'>
        <MapComponent />
      </div>
    </div>
  );
};

export default map;

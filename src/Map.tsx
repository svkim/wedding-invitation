import {
  Container as MapDiv,
  Marker,
  NaverMap,
  useNavermaps,
} from 'react-naver-maps';

const Map = () => {
  const lat = 37.5457;
  const lon = 127.0425;
  const navermaps = useNavermaps();

  return (
    <MapDiv
      style={{
        width: '100%',
        height: '300px',
      }}
    >
      <NaverMap
        defaultCenter={new navermaps.LatLng(lat, lon)}
        defaultZoom={17}
        draggable={true}
        pinchZoom={true}
        zoomControl={true}
        scrollWheel={false}
        keyboardShortcuts={false}
      >
        <Marker defaultPosition={new navermaps.LatLng(lat, lon)} />
      </NaverMap>
    </MapDiv>
  );
};

export default Map;

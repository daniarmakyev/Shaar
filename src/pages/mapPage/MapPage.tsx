import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";

// Выносим libraries в константу
const LIBRARIES: ("places")[] = ["places"];

const MapPage = () => {
  const googleMapsApiKey = import.meta.env.VITE_MAP_KEY;
  const { latitude, longitude } = useParams<{
    latitude: string;
    longitude: string;
  }>();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [routeStatus, setRouteStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const defaultLocation = { lat: 42.840421654800046, lng: 74.60119790139834 };

  // Инициализация координат
  useEffect(() => {
    if (latitude && longitude) {
      setSelectedMarker({
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      });
    } else {
      setSelectedMarker(defaultLocation);
    }
  }, [latitude, longitude]);

  // Запрос маршрута только после загрузки скрипта
  useEffect(() => {
    if (
      isScriptLoaded && // Проверяем, что скрипт загружен
      selectedMarker &&
      (selectedMarker.lat !== defaultLocation.lat ||
        selectedMarker.lng !== defaultLocation.lng)
    ) {
      setLoading(true);

      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: defaultLocation,
          destination: selectedMarker,
          travelMode: google.maps.TravelMode.DRIVING,
          drivingOptions: {
            departureTime: new Date(),
            trafficModel: google.maps.TrafficModel.BEST_GUESS,
          },
        },
        (result, status) => {
          setLoading(false);
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setRouteStatus("Маршрут построен успешно!");
          } else {
            console.error("Ошибка при построении маршрута:", status);
            setRouteStatus("Не удалось построить маршрут.");
          }
        }
      );
    }
  }, [selectedMarker, isScriptLoaded]);

  const MySearchBox: React.FC = () => {
    const handleSearchPlaces = () => {
      if (!searchBoxRef.current || !map) return;
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const location = places[0].geometry?.location;
        if (location) {
          const newCenter = {
            lat: location.lat(),
            lng: location.lng(),
          };
          setMap((prev) => {
            if (prev) prev.panTo(newCenter);
            return prev;
          });
          setSelectedMarker(newCenter);
        }
      }
    };

    return (
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handleSearchPlaces}
      >
        <div>
          <input
            type="text"
            placeholder="Найти место"
            className="rounded-[40px] border-2 border-[#000] absolute top-[22px] left-[50%] translate-x-[-50%] py-[6px] px-[14px] max-w-[702px] w-full flex gap-[14px] justify-between items-center bg-[#F4F4F4] z-[30]"
          />
        </div>
      </StandaloneSearchBox>
    );
  };

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={LIBRARIES} 
      onLoad={() => setIsScriptLoaded(true)}
    >
      {isScriptLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "90vh" }}
          center={selectedMarker || defaultLocation}
          zoom={16}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          <MySearchBox />
          {defaultLocation && <Marker position={defaultLocation} label="A" />}
          {selectedMarker && <Marker position={selectedMarker} label="B" />}
          {loading && <div>Загружается маршрут...</div>}
          {routeStatus && <div>{routeStatus}</div>}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                preserveViewport: true,
                polylineOptions: {
                  strokeColor: "#FF0000",
                  strokeWeight: 4,
                  strokeOpacity: 0.7,
                },
              }}
            />
          )}
        </GoogleMap>
      ) : (
        <div>Загрузка карты...</div>
      )}
    </LoadScript>
  );
};

export default MapPage;
import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";

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
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string>("");

  const defaultLocation = { lat: 42.840421654800046, lng: 74.60119790139834 };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          setLocationError("");
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationError("Не удалось получить ваше местоположение");
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationError("Ваш браузер не поддерживает геолокацию");
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      setSelectedMarker({
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      });
    } else {
      setSelectedMarker(selectedMarker);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (
      isScriptLoaded && 
      selectedMarker &&
      userLocation &&
      (selectedMarker.lat !== userLocation.lat ||
        selectedMarker.lng !== userLocation.lng)
    ) {
      setLoading(true);

      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: userLocation,
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

  const centerOnUserLocation = () => {
    if (userLocation && map) {
      map.panTo(userLocation);
      map.setZoom(16);
    }
  };

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
        <div className="relative">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "90vh" }}
            center={userLocation || defaultLocation}
            zoom={16}
            onLoad={(mapInstance) => setMap(mapInstance)}
          >
            <MySearchBox />
            {selectedMarker && <Marker position={selectedMarker} label="B" />}
            
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "#4285F4",
                  fillOpacity: 1,
                  strokeColor: "#FFFFFF",
                  strokeWeight: 2,
                }}
                zIndex={1000}
              />
            )}
            
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
          
          <button
            onClick={centerOnUserLocation}
            className="absolute bottom-36 right-2 bg-white p-3 rounded-full shadow-lg z-10"
            title="Моё местоположение"
            disabled={!userLocation}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          
          {locationError && (
            <div className="absolute top-20 left-0 right-0 mx-auto text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
              {locationError}
            </div>
          )}
        </div>
      ) : (
        <div>Загрузка карты...</div>
      )}
    </LoadScript>
  );
};

export default MapPage;
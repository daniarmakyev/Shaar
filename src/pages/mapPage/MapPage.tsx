import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  StandaloneSearchBox,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { tours } from "../../constants/term.data";
import { useAtom } from "jotai";
import { tourOnMapAtom } from "../../store/store";

const MapPage = () => {
  const googleMapsApiKey = import.meta.env.VITE_MAP_KEY;
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers] = useState<{ lat: number; lng: number }[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [kyrgyzstanBounds, setKyrgyzstanBounds] =
    useState<google.maps.LatLngBounds | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const [tourOnMap] = useAtom(tourOnMapAtom);

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const center = { lat: 42.826434, lng: 74.548867 }; // Центр карты

  // Обработчик поиска
  const handleSearchPlaces = () => {
    if (!searchBoxRef.current) return;

    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const location = places[0].geometry?.location;
      if (location) {
        const newCenter = {
          lat: location.lat(),
          lng: location.lng(),
        };

        // Создание маршрута от центра до выбранной точки
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: center, // Центр карты
            destination: newCenter, // Выбранная точка
            travelMode: google.maps.TravelMode.DRIVING, // Можно выбрать другие режимы, например WALKING
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              setDirections(result); // Сохраняем результат маршрута
            } else {
              console.error("Ошибка при построении маршрута:", status);
            }
          }
        );

        setMap((prev) => {
          if (prev) prev.panTo(newCenter);
          return prev;
        });
      }
    }
  };

  // @ts-ignore
  const coordinates = tours
    .find(({ id }) => id === tourOnMap)
    ?.schedule.reduce(
      // @ts-ignore
      (pr, cr) => [
        ...pr,
        { lat: cr.location.coordinates.x, lng: cr.location.coordinates.y },
      ],
      []
    );

  // Функция построения маршрута
  const buildRoute = () => {
    //@ts-ignore
    if (coordinates.length < 2) {
      console.error(
        "Необходимо как минимум 2 координаты для построения маршрута"
      );
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    //@ts-ignore
    const [origin, ...rest] = coordinates; // Первая точка - начало маршрута
    const destination = rest.pop(); // Последняя точка - конец маршрута
    const waypoints = rest.map((point) => ({
      location: point,
      stopover: true, // Указывает, что это промежуточная остановка
    }));

    directionsService.route(
      {
        origin, // Начальная точка
        destination, // Конечная точка
        waypoints, // Промежуточные точки
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result); // Сохраняем результат маршрута
        } else {
          console.error("Ошибка при построении маршрута:", status);
        }
      }
    );
  };

  useEffect(() => {
    if (map && tourOnMap) buildRoute(); // Построить маршрут при загрузке карты
  }, [map, tourOnMap]);

  const handleLoad = () => {
    // Установить границы Кыргызстана после загрузки Google Maps API
    setKyrgyzstanBounds(
      new google.maps.LatLngBounds(
        { lat: 39.1726, lng: 69.2646 }, // Юго-западная точка
        { lat: 43.2645, lng: 80.259 } // Северо-восточная точка
      )
    );
  };

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={["places"]}
      onLoad={handleLoad}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "90vh" }}
        center={center}
        zoom={16} // Более общий вид для страны
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {/* Поиск с ограничением на Кыргызстан */}
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={handleSearchPlaces}
          bounds={kyrgyzstanBounds || undefined} // Ограничиваем результаты Кыргызстаном
        >
          <div>
            <input
              type="text"
              placeholder="Найти место"
              className="rounded-[40px] border-2 border-[#000] absolute top-[22px] left-[50%] translate-x-[-50%] py-[6px] px-[14px] max-w-[702px] w-full flex gap-[14px] justify-between items-center bg-[#F4F4F4] z-[50]"
            />
            <img src={"../../assets/images/icons/search.svg"} alt="search" />
          </div>
        </StandaloneSearchBox>

        {/* Маркеры */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}

        {/* InfoWindow */}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h3>Место</h3>
              <p>Информация о маркере.</p>
            </div>
          </InfoWindow>
        )}

        {/* Отображение маршрута */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapPage;

import React, { useState, useRef, FC, useCallback, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  Marker,
  DirectionsRenderer,
  Polygon,
  MarkerClusterer,
} from "@react-google-maps/api";
import greenRound from "../../assets/images/greenRound.png";
import { useTranslation } from "react-i18next";
const googleMapsApiKey = import.meta.env.VITE_MAP_KEY;

export interface SelectedMarkerData {
  lat: number;
  lng: number;
  address: string;
}

const maki = [
  { lat: 42.825977, lng: 74.548159 },
  { lat: 42.82601, lng: 74.548265 },
  { lat: 42.826164, lng: 74.548044 },
  { lat: 42.826288, lng: 74.54796 },
  { lat: 42.82649, lng: 74.547778 },
  { lat: 42.827805271089034, lng: 74.55088415973017 },
  { lat: 42.82782494240816, lng: 74.55095657937358 },
  { lat: 42.82784264659002, lng: 74.55102229349444 },
  { lat: 42.827854449375096, lng: 74.55109068982432 },
  { lat: 42.844948, lng: 74.584776 },
  { lat: 42.844948, lng: 74.584827 },
  { lat: 42.828458, lng: 74.584715 },
  { lat: 42.828458, lng: 74.584824 },
  { lat: 42.828455, lng: 74.584924 },
  { lat: 42.828563, lng: 74.584916 },
  { lat: 42.828574, lng: 74.584773 },
  { lat: 42.828682, lng: 74.584769 },
  { lat: 42.828673, lng: 74.584889 },
  { lat: 42.844962, lng: 74.584647 },
  { lat: 42.844949, lng: 74.584877 },
  { lat: 42.840311, lng: 74.600385 },
  { lat: 42.840265, lng: 74.600396 },
  { lat: 42.840222, lng: 74.600396 },
  { lat: 42.840179, lng: 74.600396 },
  { lat: 42.84014, lng: 74.600399 },
];

const poly = [
  [
    { lat: 42.825880796248526, lng: 74.54850540479502 },
    { lat: 42.82575292854091, lng: 74.54815403541407 },
    { lat: 42.826642095432526, lng: 74.54756931384883 },
    { lat: 42.82674438814841, lng: 74.5478160770782 },
  ],
  [
    { lat: 42.82782199171068, lng: 74.55082112781832 },
    { lat: 42.82769019374678, lng: 74.55092707507441 },
    { lat: 42.82782494240816, lng: 74.55124625794718 },
    { lat: 42.82789969336371, lng: 74.55111751191447 },
  ],
  [
    {
      lat: 42.84036168679825,
      lng: 74.60034301103673,
    },
    {
      lat: 42.84012076158662,
      lng: 74.60038324417195,
    },
    {
      lat: 42.84014042898606,
      lng: 74.60046102823338,
    },
    {
      lat: 42.84040790499677,
      lng: 74.60041811288914,
    },
    {
      lat: 42.84039872048276,
      lng: 74.60033732824876,
    },
  ],
  [
    {
      lat: 42.844991858077364,
      lng: 74.58452597324803,
    },
    {
      lat: 42.84494662660128,
      lng: 74.58452463214353,
    },
    {
      lat: 42.84492597743813,
      lng: 74.58548486297086,
    },
    {
      lat: 42.844976125393785,
      lng: 74.58550497953847,
    },
  ],
  [
    {
      lat: 42.82889705035056,
      lng: 74.58470458076798,
    },
    {
      lat: 42.82838953711723,
      lng: 74.58467775867783,
    },
    {
      lat: 42.828328556564585,
      lng: 74.58508277223908,
    },
    {
      lat: 42.82910359524088,
      lng: 74.5850881366571,
    },
    {
      lat: 42.82910359524088,
      lng: 74.58470189855896,
    },
  ],
];

const clusterOptions = {
  maxZoom: 18,
  gridSize: 60,
  styles: [
    { height: 53, width: 53, textSize: 16 },
    { height: 56, width: 56, textSize: 18 },
    { height: 66, width: 66, textSize: 20 },
  ].map((style) => ({
    ...style,
    url: `${greenRound}`,
    textColor: "#FFFFFF",
  })),
};

const mapStyles = { height: "90vh", width: "100%" };
const defaultCenter = { lat: 42.8746, lng: 74.5698 };
const mapOptions = {
  styles: [
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "poi.business", stylers: [{ visibility: "off" }] },
    { featureType: "road", stylers: [{ visibility: "simplified" }] },
  ],
};

interface ClusterType {
  markers?: google.maps.Marker[];
}

const ParkingPage: FC = React.memo(() => {
  const { t } = useTranslation();
  const [markerClicked, setMarkerClicked] = useState(false);
  const [, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);
  const [, setPolygons] = useState<google.maps.LatLngLiteral[][]>([]);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMarker, setSelectedMarker] =
    useState<SelectedMarkerData | null>(null);
  const [route, setRoute] = useState<google.maps.DirectionsResult | null>(null);
  const [drawingMode, setDrawingMode] =
    useState<google.maps.drawing.OverlayType | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [distance, setDistance] = useState<string | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const geocoder = useRef<google.maps.Geocoder | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const userRole = "admin";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setUserLocation({
            lat: 42.840480748627705,
            lng: 74.60114410741835,
          });
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      setUserLocation({
        lat: 42.840480748627705,
        lng: 74.60114410741835,
      });
    }
  }, []);

  const toggleControls = () => {
    setControlsVisible(!controlsVisible);
  };

  const geocoderLoad = () => {
    geocoder.current = new google.maps.Geocoder();
  };

  const handleOverlayComplete = useCallback(
    (event: google.maps.drawing.OverlayCompleteEvent) => {
      if (event.type === "polygon") {
        const path = (event.overlay as google.maps.Polygon)
          .getPath()
          .getArray()
          .map(({ lat, lng }) => ({ lat: lat(), lng: lng() }));
        setPolygons((prev) => [...prev, path]);
      }
      if (event.type === "marker") {
        const { lat, lng } = (event.overlay as google.maps.Marker)
          .getPosition()!
          .toJSON();
        setMarkers((prev) => [...prev, { lat, lng }]);
      }
    },
    []
  );

  const handleClusterClick = useCallback((cluster: ClusterType) => {
    if (!cluster.markers || cluster.markers.length === 0 || !mapRef.current)
      return;

    const bounds = new google.maps.LatLngBounds();
    cluster.markers.forEach((marker) => {
      const markerPos = marker.getPosition();
      if (markerPos) {
        bounds.extend(markerPos);
      }
    });

    mapRef.current.fitBounds(bounds, 180);
  }, []);

  const handleMarkerClick = useCallback(
    (marker: google.maps.LatLngLiteral) => {
      if (deleteMode) {
        setMarkers((prev) =>
          prev.filter((m) => m.lat !== marker.lat || m.lng !== marker.lng)
        );
      } else {
        setSelectedMarker({ lat: marker.lat, lng: marker.lng, address: "" });
        calculateDistance(marker);
        getAddress(marker);
      }
      setMarkerClicked(true);
    },
    [deleteMode]
  );

  const calculateDistance = useCallback(
    (marker: google.maps.LatLngLiteral) => {
      if (!userLocation) return;

      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [userLocation],
          destinations: [marker],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK && response) {
            const result = response.rows[0].elements[0];
            if (result.status === "OK") {
              setDistance(result.distance.text);
            } else {
              console.error("DistanceMatrix result not OK:", result);
            }
          } else {
            console.error("Error:", status);
          }
        }
      );
    },
    [userLocation]
  );

  const getAddress = useCallback(async (marker: google.maps.LatLngLiteral) => {
    if (!geocoder.current) return;

    try {
      const { results } = await geocoder.current.geocode({ location: marker });
      setSelectedMarker((prev) =>
        prev
          ? {
              ...prev,
              address: results[0]?.formatted_address || "Адрес не найден",
            }
          : null
      );
    } catch (error) {
      console.error("Geocoding error:", error);
      setSelectedMarker((prev) =>
        prev
          ? {
              ...prev,
              address: "Ошибка при получении адреса",
            }
          : null
      );
    }
  }, []);

  const handleRoute = useCallback(() => {
    if (!userLocation || !selectedMarker) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userLocation,
        destination: { lat: selectedMarker.lat, lng: selectedMarker.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setRoute(result);
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  }, [userLocation, selectedMarker]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading map...
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={["drawing", "geometry"]}
      onLoad={() => {
        geocoderLoad();
      }}
      onError={(error) => {
        console.error("Ошибка загрузки Google Maps API:", error);
        setIsLoading(false);
      }}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={userLocation || defaultCenter}
        zoom={16}
        options={mapOptions}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {/* User location marker */}
        {userLocation && google && google.maps.SymbolPath && (
          <Marker
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
            }}
            zIndex={1000}
          />
        )}

        {route && (
          <DirectionsRenderer
            directions={route}
            options={{ suppressMarkers: true }}
          />
        )}

        <MarkerClusterer onClick={handleClusterClick} options={clusterOptions}>
          {(clusterer) => (
            <>
              {maki.map((marker, i) => (
                <Marker
                  key={i}
                  position={marker}
                  clusterer={clusterer}
                  onClick={() => handleMarkerClick(marker)}
                />
              ))}
            </>
          )}
        </MarkerClusterer>

        {poly.map((paths, i) => (
          <Polygon
            key={i}
            paths={paths}
            options={{
              fillColor: "#00ff73",
              fillOpacity: 0.4,
              strokeColor: "#00cb5f",
              strokeWeight: 2,
            }}
            onClick={() =>
              deleteMode &&
              setPolygons((prev) => prev.filter((_, idx) => idx !== i))
            }
          />
        ))}

        {drawingMode && (
          <DrawingManager
            onOverlayComplete={handleOverlayComplete}
            drawingMode={drawingMode}
            options={{
              drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT,
                drawingModes: [
                  google.maps.drawing.OverlayType.MARKER,
                  google.maps.drawing.OverlayType.POLYGON,
                ],
              },
            }}
          />
        )}
      </GoogleMap>
      {userRole === "admin" && (
        <div className="absolute top-20 bg-green-bg rounded-xl ">
          <button
            onClick={toggleControls}
            className="bg-gray-500 text-white px-5 py-2 rounded-xl mb-2"
          >
            {controlsVisible ? "Скрыть управление" : "Показать управление"}
          </button>

          {controlsVisible && (
            <div>
              <button
                onClick={() =>
                  setDrawingMode(google.maps.drawing.OverlayType.MARKER)
                }
                className="bg-blue-500 text-white px-5 py-2 rounded-xl mr-2"
              >
                Добавить маркер
              </button>

              <button
                onClick={() =>
                  setDrawingMode(google.maps.drawing.OverlayType.POLYGON)
                }
                className="bg-blue-500 text-white px-5 py-2 rounded-xl mr-2"
              >
                Добавить полигон
              </button>

              <button
                onClick={() => setDeleteMode(!deleteMode)}
                className="bg-red-500 text-white px-5 py-2 rounded-xl mr-2"
              >
                {deleteMode ? "Отменить удаление" : "Режим удаления"}
              </button>

              <button
                onClick={() => setDrawingMode(null)}
                className="bg-yellow-500 text-white px-5 py-2 rounded-xl"
              >
                Режим руки
              </button>
            </div>
          )}
        </div>
      )}

      {markerClicked && (
        <div className="absolute bottom-24 bg-white max-w-md left-0 right-0 mx-auto mt-4 text-center pb-4 shadow-lg rounded-2xl hover:shadow-md">
          {selectedMarker && selectedMarker.address && (
            <div className="mt-2 text-center font-semibold">
              <span className="text-green-500">{`${t("address")}`}</span>:{" "}
              {selectedMarker.address}
            </div>
          )}
          {distance !== null && (
            <div className="mt-2 text-center font-semibold flex justify-center items-center">
              <span className="text-green-500 font-bold">{`${t(
                "distance"
              )}`}</span>
              <svg
                width="11"
                height="13"
                viewBox="0 0 11 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ms-3 me-1"
              >
                <path
                  d="M2.2 9.4C2.35913 9.35359 2.53018 9.37229 2.67552 9.45199C2.82086 9.5317 2.92859 9.66587 2.975 9.825C3.02141 9.98413 3.00271 10.1552 2.92301 10.3005C2.8433 10.4459 2.70913 10.5536 2.55 10.6C2.2375 10.6912 2.0125 10.7875 1.86813 10.875C2.01688 10.9644 2.25187 11.0644 2.57812 11.1575C3.3 11.3637 4.33313 11.5 5.5 11.5C6.66687 11.5 7.7 11.3637 8.42187 11.1575C8.74875 11.0644 8.98313 10.9644 9.13188 10.875C8.98813 10.7875 8.76313 10.6912 8.45063 10.6C8.294 10.5515 8.16269 10.4435 8.08499 10.2991C8.00729 10.1547 7.98944 9.98562 8.03527 9.82821C8.0811 9.6708 8.18694 9.53769 8.33 9.45759C8.47305 9.37749 8.64184 9.35681 8.8 9.4C9.2175 9.52187 9.6 9.67813 9.89375 9.87875C10.1656 10.0656 10.5 10.3912 10.5 10.875C10.5 11.3644 10.1575 11.6925 9.88125 11.8794C9.5825 12.0806 9.19188 12.2375 8.765 12.3594C7.90375 12.6062 6.75 12.75 5.5 12.75C4.25 12.75 3.09625 12.6062 2.235 12.3594C1.80813 12.2375 1.4175 12.0806 1.11875 11.8794C0.8425 11.6919 0.5 11.3644 0.5 10.875C0.5 10.3912 0.834375 10.0656 1.10625 9.87875C1.4 9.67813 1.7825 9.52187 2.2 9.4ZM5.5 0.25C6.7432 0.25 7.93549 0.74386 8.81456 1.62294C9.69364 2.50201 10.1875 3.6943 10.1875 4.9375C10.1875 6.5425 9.3125 7.8475 8.40625 8.775C8.046 9.13996 7.65887 9.47736 7.24813 9.78437C6.87687 10.0631 6.02813 10.5856 6.02813 10.5856C5.86715 10.6771 5.68516 10.7252 5.5 10.7252C5.31484 10.7252 5.13285 10.6771 4.97187 10.5856C4.55066 10.3414 4.14336 10.0739 3.75187 9.78437C3.34052 9.47811 2.95334 9.14066 2.59375 8.775C1.6875 7.8475 0.8125 6.5425 0.8125 4.9375C0.8125 3.6943 1.30636 2.50201 2.18544 1.62294C3.06451 0.74386 4.2568 0.25 5.5 0.25ZM5.5 3.6875C5.16848 3.6875 4.85054 3.8192 4.61612 4.05362C4.3817 4.28804 4.25 4.60598 4.25 4.9375C4.25 5.26902 4.3817 5.58696 4.61612 5.82138C4.85054 6.0558 5.16848 6.1875 5.5 6.1875C5.83152 6.1875 6.14946 6.0558 6.38388 5.82138C6.6183 5.58696 6.75 5.26902 6.75 4.9375C6.75 4.60598 6.6183 4.28804 6.38388 4.05362C6.14946 3.8192 5.83152 3.6875 5.5 3.6875Z"
                  fill="#159559"
                />
              </svg>
              {distance}
              <span className="ms-1">
                <span className="text-green-500 font-bold">
                  {`${t("price")}`}:
                </span>{" "}
                100 som/hour
              </span>
            </div>
          )}

          <div className="flex items-center mx-auto justify-center gap-6">
            <button
              onClick={handleRoute}
              className="bg-green-500 text-white font-semibold px-5 py-2 rounded-xl mt-4"
            >
              {`${t("build_route")}`}
            </button>
          </div>
        </div>
      )}
    </LoadScript>
  );
});

export default ParkingPage;

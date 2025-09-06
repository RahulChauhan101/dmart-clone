// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix default marker issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

// const MapView = () => {
//   return (
//     <MapContainer center={[28.6139, 77.209]} zoom={12} scrollWheelZoom={true} style={{ height: "100vh", width: "100%" }}>
//       {/* Map tiles from OpenStreetMap (free) */}
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       {/* Marker Example */}
//       <Marker position={[28.6139, 77.209]}>
//         <Popup>
//           📍 New Delhi <br /> You are here.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapView;

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-geosearch/dist/geosearch.css";
// import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
// import "leaflet-routing-machine";

// // Fix default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
//   iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
//   shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
// });

// // Search control component
// const SearchControl = ({ placeholder, setLocation, position }) => {
//   const map = useMap();

//   useEffect(() => {
//     const provider = new OpenStreetMapProvider();
//     const searchControl = new GeoSearchControl({
//       provider,
//       style: "bar",
//       searchLabel: placeholder,
//       autoClose: true,
//       keepResult: true,
//       showMarker: false,
//       position: position,
//     });

//     map.addControl(searchControl);

//     map.on("geosearch/showlocation", (result) => {
//       const { x, y, label } = result.location;
//       setLocation({ position: [y, x], label });
//       map.setView([y, x], 14);
//     });

//     return () => map.removeControl(searchControl);
//   }, [map, placeholder, position, setLocation]);

//   return null;
// };

// // Routing component (inside MapContainer)
// const Routing = ({ pickup, drop, setDistance }) => {
//   const map = useMap();

//   useEffect(() => {
//     if ( !pickup?.position  || !drop?.position) return;

//     // Remove previous route if exists
//     let control = L.Routing.control({
//       waypoints: [
//         L.latLng(pickup.position[0], pickup.position[1]),
//         L.latLng(drop.position[0], drop.position[1]),
//       ],
//       lineOptions: { styles: [{ color: "blue", weight: 4 }] },
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       show: false,
      
//     }).addTo(map);

//     // Listen for route found
//     control.on("routesfound", (e) => {
//       const route = e.routes[0];
//       const km = (route.summary.totalDistance / 1000).toFixed(2);
//       setDistance(km);
//     });

//     return () => map.removeControl(control);
//   }, [pickup, drop, map, setDistance]);

//   return null;
// };

// const MapView = () => {
//   const [pickup, setPickup] = useState({ position: [23.0396, 72.6322], label: "Ahmedabad, Nikol" });
//   const [drop, setDrop] = useState({ position: [23.0496, 72.6422], label: "Ahmedabad, Gota" });

//   const [distance, setDistance] = useState(null);

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <MapContainer center={pickup.position} zoom={13} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
//         />

//         {/* Pickup & Drop Search */}
//         <SearchControl placeholder="Pickup Location" position="topleft" setLocation={setPickup} />
//         <SearchControl placeholder="Drop Location" position="topright" setLocation={setDrop} />

//         {/* Pickup Marker */}
//         {pickup && (
//           <Marker position={pickup.position}>
//             <Popup>📍xcvcxvx Pickup: {pickup.label}</Popup>
//           </Marker>
//         )}

//         {/* Drop Marker */}
//         {drop && (
//           <Marker position={drop.position}>
//             <Popup>🚩 Drop: {drop.label}</Popup>
//           </Marker>
//         )}

//         {/* Route & Distance */}
//         {pickup && drop && <Routing pickup={pickup} drop={drop} setDistance={setDistance} />}
//       </MapContainer>

//       {/* Distance display */}
//       {distance && (
//         <div
//           style={{
//             position: "absolute",
//             bottom: 20,
//             left: "50%",
//             transform: "translateX(-50%)",
//             backgroundColor: "white",
//             padding: "8px 12px",
//             borderRadius: "4px",
//             boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
//             zIndex: 1000,
//           }}
//         >
//           Distance: {distance} km
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapView;
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-routing-machine";
import "./MapView.css";
import { FaCar, FaBiking, FaWalking } from "react-icons/fa"; // ✅ Icons

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

// Routing component
const Routing = ({ pickup, drop, setDistance }) => {
  const map = useMap();
  const routingRef = useRef(null);

  useEffect(() => {
    if (!pickup?.position || !drop?.position) return;

    if (routingRef.current) map.removeControl(routingRef.current);

    const control = L.Routing.control({
      waypoints: [
        L.latLng(pickup.position[0], pickup.position[1]),
        L.latLng(drop.position[0], drop.position[1]),
      ],
      lineOptions: { styles: [{ color: "blue", weight: 4 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
    }).addTo(map);

    control.on("routesfound", (e) => {
      const route = e.routes[0];
      if (route && route.summary) {
        // ✅ format to 2 decimals
        setDistance((route.summary.totalDistance / 1000).toFixed(2));
      }
    });

    routingRef.current = control;

    return () => {
      if (routingRef.current) map.removeControl(routingRef.current);
    };
  }, [pickup, drop, map, setDistance]);

  return null;
};

// Helper: travel time
const travelTime = (speed, distance) => {
  if (!distance) return "0 min";
  const distNum = parseFloat(distance);
  const hours = distNum / speed;
  const totalMinutes = Math.round(hours * 60);

  const hrs = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  if (hrs > 0) {
    return `${hrs} hr ${mins} min`;
  } else {
    return `${mins} min`;
  }
};

const MapView = () => {
  const [pickup, setPickup] = useState({
    position: [23.0396, 72.6322],
    label: "Ahmedabad, Nikol",
  });
  const [drop, setDrop] = useState({
    position: [23.0496, 72.6422],
    label: "Ahmedabad, Gota",
  });
  const [pickupInput, setPickupInput] = useState(pickup.label);
  const [dropInput, setDropInput] = useState(drop.label);
  const [distance, setDistance] = useState(null);
  const provider = new OpenStreetMapProvider();

  const handleSearch = async (value, type) => {
    if (!value) return;
    const results = await provider.search({ query: value });
    if (results.length > 0) {
      const { x, y, label } = results[0];
      const location = { position: [y, x], label };
      if (type === "pickup") {
        setPickup(location);
        setPickupInput(label);
      } else {
        setDrop(location);
        setDropInput(label);
      }
    }
  };

  return (
    <div className="map-container">
      {/* Search Inputs */}
      <div className="search-box">
        <div>
          <input
            type="text"
            placeholder="Pickup location"
            value={pickupInput}
            onChange={(e) => setPickupInput(e.target.value)}
          />
          <button onClick={() => handleSearch(pickupInput, "pickup")}>
            Search
          </button>
        </div>
        <h2 style={{ margin: "0 10px" }}>to</h2>
        <div>
          <input
            type="text"
            placeholder="Drop location"
            value={dropInput}
            onChange={(e) => setDropInput(e.target.value)}
          />
          <button onClick={() => handleSearch(dropInput, "drop")}>Search</button>
        </div>
      </div>

  <MapContainer
  center={pickup.position}
  zoom={13}
  scrollWheelZoom={true}
  dragging={true}         // ✅ enable dragging
  touchZoom={true}        // ✅ pinch zoom on mobile
  doubleClickZoom={true}  // ✅ zoom with double-click
  style={{ height: "100vh", width: "100%" }} // ✅ ensure full height
>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        {pickup?.position && (
          <Marker position={pickup.position}>
            <Popup>📍 Pickup: {pickup.label}</Popup>
          </Marker>
        )}
        {drop?.position && (
          <Marker position={drop.position}>
            <Popup>🚩 Drop: {drop.label}</Popup>
          </Marker>
        )}
        {pickup?.position && drop?.position && (
          <Routing pickup={pickup} drop={drop} setDistance={setDistance} />
        )}
      </MapContainer>

      {/* Distance & Travel Time */}
      {distance && (
        <div className="distance-box">
          <div>📏 Distance: {distance} km</div>
          <div>
            <FaCar style={{ color: "blue", marginRight: "6px" }} /> Car:{" "}
            {travelTime(80, distance)}
          </div>
          <div>
            <FaBiking style={{ color: "green", marginRight: "6px" }} /> Bike:{" "}
            {travelTime(60, distance)}
          </div>
          <div>
            <FaWalking style={{ color: "orange", marginRight: "6px" }} /> Walk:{" "}
            {travelTime(15, distance)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
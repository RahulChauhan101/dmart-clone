import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./MapPickupDrop.css";
import MapView from "./Mapview";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
};

const MapPickupDrop = ({ setIsMapOpen }) => {
  const [pickup, setPickup] = useState({ lat: 23.0554, lng: 72.6686 });
  const [drop, setDrop] = useState({ lat: 23.0600, lng: 72.6700 });

  const handlePickupDragEnd = (e) => {
    setPickup({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const handleDropDragEnd = (e) => {
    setDrop({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    <div className="map-modal">
      <button className="close-btn" onClick={() => setIsMapOpen(false)}>Close</button>
      <MapView/>;

    </div>
  );
};

export default MapPickupDrop;

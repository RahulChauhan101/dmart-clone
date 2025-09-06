import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LiveTrackingMap.css"; // custom CSS

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

const LiveTrackingMap = () => {
  // Initial location: somewhere in India (Delhi)
  const [position, setPosition] = useState([28.6139, 77.209]);

  useEffect(() => {
    // Simulate live tracking: update position every 3 seconds
    const interval = setInterval(() => {
      setPosition((prev) => [
        prev[0] + (Math.random() - 0.5) * 0.05, // latitude
        prev[1] + (Math.random() - 0.5) * 0.05, // longitude
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="map-wrapper">
      <MapContainer center={position} zoom={5} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>🚚 Live Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LiveTrackingMap;

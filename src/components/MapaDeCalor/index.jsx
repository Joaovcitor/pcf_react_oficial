/* eslint-disable react/prop-types */
// Mapa.js

import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const Mapa = ({ visita }) => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  return (
    <MapContainer
      center={
        visita.latitude_beneficiario && visita.longitude_beneficiario
          ? [visita.latitude_beneficiario, visita.longitude_beneficiario]
          : visita.latitude && visita.longitude
            ? [visita.latitude, visita.longitude]
            : [0, 0]
      }
      zoom={13}
      style={{
        height: "50vh",
        width: "100%",
        border: "2px solid #007bff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {visita.latitude_beneficiario && visita.longitude_beneficiario ? (
        <Marker
          key={`${visita.id}-beneficiario`}
          position={[
            visita.latitude_beneficiario,
            visita.longitude_beneficiario,
          ]}
        />
      ) : visita.latitude && visita.longitude ? (
        <Marker
          key={`${visita.id}-default`}
          position={[visita.latitude, visita.longitude]}
        />
      ) : null}
    </MapContainer>
  );
};

export default Mapa;

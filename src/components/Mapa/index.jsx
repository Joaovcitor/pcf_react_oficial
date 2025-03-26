/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet.heat";
import axios from "../../services/axios";

const Heatmap = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || data.length === 0) return;

    const heatLayer = L.heatLayer(data, {
      radius: 20,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    return () => {
      heatLayer.remove();
    };
  }, [map, data]);

  return null;
};

const MapaDeCalor = () => {
  const [pontosDeCalor, setPontosDeCalor] = useState([]);
  const [centro, setCentro] = useState([-4.97813, -39.0188]); // Posição inicial

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/detalhes/mapa");
        const dados = response.data;

        console.log("Dados recebidos:", dados);

        const visitasArray = dados.visitas || [];

        // Filtrar visitas com latitude e longitude válidas
        const heatmapData = visitasArray
          .filter((visita) => visita.latitude && visita.longitude) // Remove entradas inválidas
          .map((visita) => [visita.latitude, visita.longitude, 1]); // Formato [lat, lng, intensidade]

        setPontosDeCalor(heatmapData);

        // Calcular o centro (média das latitudes e longitudes)
        const latitudes = visitasArray
          .filter((v) => v.latitude)
          .map((v) => v.latitude);
        const longitudes = visitasArray
          .filter((v) => v.longitude)
          .map((v) => v.longitude);

        const centerLatitude =
          latitudes.reduce((acc, lat) => acc + lat, 0) / latitudes.length;
        const centerLongitude =
          longitudes.reduce((acc, lng) => acc + lng, 0) / longitudes.length;

        setCentro([centerLatitude, centerLongitude]); // Atualizar o centro após o cálculo
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer
      center={centro} // Usando as coordenadas calculadas
      zoom={12}
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
      <Heatmap data={pontosDeCalor} />
    </MapContainer>
  );
};

export default MapaDeCalor;

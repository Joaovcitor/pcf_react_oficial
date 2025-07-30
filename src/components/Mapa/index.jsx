/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "../../services/axios";

// --- Correção para o ícone padrão do Leaflet ---
// Importa as imagens do ícone para que o Webpack/Vite as processe corretamente.
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
// --- Fim da correção do ícone ---

// Componente para centralizar o mapa dinamicamente
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapaDeMarcadores = () => {
  const [visitas, setVisitas] = useState([]);
  const [centro, setCentro] = useState([-4.97813, -39.0188]); // Posição inicial (Quixadá)
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/detalhes/mapa");
        const dados = response.data;
        const visitasRecebidas = dados.visitas || [];

        // Filtra apenas visitas com coordenadas válidas
        const visitasValidas = visitasRecebidas.filter(
          (visita) => visita.latitude && visita.longitude
        );

        setVisitas(visitasValidas);

        // Se houver visitas, calcula o novo centro do mapa
        if (visitasValidas.length > 0) {
          // Se for apenas uma visita, centraliza nela com um zoom maior
          if (visitasValidas.length === 1) {
            const { latitude, longitude } = visitasValidas[0];
            setCentro([latitude, longitude]);
            setZoom(15); // Zoom mais próximo para um único ponto
          } else {
            // Se forem várias, calcula a média para centralizar
            const latitudes = visitasValidas.map((v) => v.latitude);
            const longitudes = visitasValidas.map((v) => v.longitude);

            const centerLatitude =
              latitudes.reduce((acc, lat) => acc + lat, 0) / latitudes.length;
            const centerLongitude =
              longitudes.reduce((acc, lng) => acc + lng, 0) / longitudes.length;

            setCentro([centerLatitude, centerLongitude]);
            setZoom(12); // Zoom padrão para múltiplos pontos
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer
      center={centro}
      zoom={zoom}
      style={{
        height: "50vh",
        width: "100%",
        border: "2px solid #007bff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
      }}
    >
      {/* Componente que ajusta o centro e o zoom do mapa quando os dados chegam */}
      <ChangeView center={centro} zoom={zoom} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Mapeia as visitas para criar um marcador para cada uma */}
      {visitas.map((visita) => (
        <Marker
          key={visita.id || `visita-${visita.latitude}-${visita.longitude}`} // Use um ID único, se disponível
          position={[visita.latitude, visita.longitude]}
        >
          <Popup>Localização da visita.</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaDeMarcadores;

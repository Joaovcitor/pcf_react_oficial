/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "../../services/axios";

// Correção para ícones do Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";

// Corrige o problema dos ícones
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
});

const MapaDeMarcadores = ({ visita, id }) => {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Posição inicial (Quixadá)
  const centroInicial = [-4.97813, -39.0188];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Se uma visita específica foi passada como prop, usa ela
        if (visita && visita.latitude && visita.longitude) {
          console.log("Usando visita específica:", visita);
          setVisitas([visita]);
          setLoading(false);
          return;
        }

        // Caso contrário, busca as visitas marcadas para a criança
        if (id) {
          console.log("Buscando visitas marcadas para criança ID:", id);
          const response = await axios.get(
            `/visitasporgeolo/visitas-marcadas/${id}`
          );
          const dados = response.data;
          console.log("Dados recebidos:", dados);

          // Verifica se dados é um array ou se tem uma propriedade com array
          const visitasRecebidas = Array.isArray(dados)
            ? dados
            : dados.visitas || [];
          const visitasValidas = visitasRecebidas.filter(
            (visita) => visita.latitude && visita.longitude
          );

          console.log("Visitas válidas:", visitasValidas);
          setVisitas(visitasValidas);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setVisitas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [visita, id]);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Carregando mapa...
      </div>
    );
  }

  console.log("Renderizando mapa com", visitas.length, "visitas");

  return (
    <MapContainer
      center={centroInicial}
      zoom={13}
      style={{
        height: "50vh",
        width: "100%",
        border: "2px solid #308C50",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Renderiza os marcadores das visitas */}
      {visitas.map((visita, index) => {
        const lat = parseFloat(visita.latitude);
        const lng = parseFloat(visita.longitude);

        console.log(`Marcador ${index}:`, { lat, lng, visita });

        return (
          <Marker key={visita.id || `visita-${index}`} position={[lat, lng]}>
            <Popup>
              <div>
                <strong>Visita {index + 1}</strong>
                <br />
                Latitude: {lat}
                <br />
                Longitude: {lng}
                <br />
                {visita.endereco && `Endereço: ${visita.endereco}`}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapaDeMarcadores;

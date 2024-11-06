import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

const Mapa = () => {
  // Estado para armazenar a localização
  const [localizacao, setLocalizacao] = useState(null); // Inicialmente null até obter a localização

  useEffect(() => {
    // Função para obter a localização atual
    const obterLocalizacao = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocalizacao({ latitude, longitude });
          },
          (error) => {
            console.error("Erro ao obter localização", error);
          }
        );
      }
    };

    // Obter a localização inicial ao carregar o componente
    obterLocalizacao();

    // Atualizar a localização a cada 10 segundos
    const intervalo = setInterval(() => {
      obterLocalizacao();
    }, 10000);

    // Configurar ícones do Leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalo);
  }, []);

  // Se ainda não obteve a localização, não renderiza o mapa
  if (!localizacao) {
    return <p>Carregando mapa...</p>;
  }

  return (
    <MapContainer
      center={[localizacao.latitude, localizacao.longitude]}
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
      <Marker
        key={localizacao.latitude + localizacao.longitude} // Garante que o marker é re-renderizado
        position={[localizacao.latitude, localizacao.longitude]}
      />
    </MapContainer>
  );
};

export default Mapa;

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "../../services/axios";
import { Box, Typography, Chip, CircularProgress, Alert } from "@mui/material";
import { LocationOn as LocationOnIcon, Schedule as ScheduleIcon } from "@mui/icons-material";

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

// Ícones customizados para diferentes tipos de visitas
const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="41">
        <path fill="${color}" stroke="#fff" stroke-width="2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle fill="#fff" cx="12" cy="9" r="3"/>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: iconShadow,
    shadowSize: [41, 41]
  });
};

const iconePendente = createCustomIcon('#ff9800'); // Laranja
const iconeValidada = createCustomIcon('#4caf50'); // Verde
const iconeInvalida = createCustomIcon('#f44336'); // Vermelho
const iconePadrao = createCustomIcon('#2196f3'); // Azul

  const MapaDeMarcadores = ({ visita, id }) => {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Posição inicial (Quixadá)
  const centroInicial = [-4.97813, -39.0188];

  // Função para determinar o ícone baseado no status da visita
  const getIconeVisita = (visita) => {
    if (visita.isValidationPending) return iconePendente;
    if (visita.isFakeVisit) return iconeInvalida;
    if (visita.isFinished) return iconeValidada;
    return iconePadrao;
  };

  // Função para determinar a cor do chip baseado no status
  const getStatusVisita = (visita) => {
    if (visita.isValidationPending) return { label: "Pendente", color: "warning" };
    if (visita.isFakeVisit) return { label: "Inválida", color: "error" };
    if (visita.isFinished) return { label: "Validada", color: "success" };
    return { label: "Em andamento", color: "info" };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
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
        setError("Erro ao carregar dados do mapa");
        setVisitas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [visita, id]);

  if (loading) {
    return (
      <Box 
        sx={{ 
          height: "50vh", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          border: "2px solid #e0e0e0",
          borderRadius: 2,
          backgroundColor: "#f5f5f5"
        }}
      >
        <Box textAlign="center">
          <CircularProgress size={40} sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Carregando mapa...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ height: "50vh", display: "flex", alignItems: "center" }}>
        <Typography variant="body1">{error}</Typography>
      </Alert>
    );
  }

  console.log("Renderizando mapa com", visitas.length, "visitas");

  return (
    <Box sx={{ position: "relative" }}>
      {/* Legenda do mapa */}
      <Box sx={{ 
        position: "absolute", 
        top: 10, 
        right: 10, 
        zIndex: 1000, 
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        p: 1,
        borderRadius: 1,
        boxShadow: 2
      }}>
        <Typography variant="caption" fontWeight="bold" display="block" gutterBottom>
          Legenda:
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Chip size="small" label="Pendente" color="warning" variant="outlined" />
          <Chip size="small" label="Validada" color="success" variant="outlined" />
          <Chip size="small" label="Inválida" color="error" variant="outlined" />
        </Box>
      </Box>

      <MapContainer
        center={visitas.length > 0 ? [parseFloat(visitas[0].latitude), parseFloat(visitas[0].longitude)] : centroInicial}
        zoom={visitas.length === 1 ? 15 : 13}
        style={{
          height: "50vh",
          width: "100%",
          border: "2px solid #308C50",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
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
          const status = getStatusVisita(visita);

          console.log(`Marcador ${index}:`, { lat, lng, visita });

          return (
            <Marker 
              key={visita.id || `visita-${index}`} 
              position={[lat, lng]}
              icon={getIconeVisita(visita)}
            >
              <Popup>
                <Box sx={{ minWidth: 200 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    <LocationOnIcon sx={{ mr: 1, fontSize: "small" }} />
                    Visita #{visita.id || index + 1}
                  </Typography>
                  
                  <Chip 
                    label={status.label} 
                    color={status.color} 
                    size="small" 
                    sx={{ mb: 2 }}
                  />
                  
                  <Typography variant="body2" gutterBottom>
                    <strong>Coordenadas:</strong>
                  </Typography>
                  <Typography variant="caption" display="block">
                    Latitude: {lat.toFixed(6)}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    Longitude: {lng.toFixed(6)}
                  </Typography>
                  
                  {visita.endereco && (
                    <>
                      <Typography variant="body2" gutterBottom>
                        <strong>Endereço:</strong>
                      </Typography>
                      <Typography variant="caption">
                        {visita.endereco}
                      </Typography>
                    </>
                  )}
                  
                  {visita.scheduledDate && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" gutterBottom>
                        <ScheduleIcon sx={{ mr: 0.5, fontSize: "small" }} />
                        <strong>Data:</strong>
                      </Typography>
                      <Typography variant="caption">
                        {new Date(visita.scheduledDate).toLocaleDateString('pt-BR')}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {visitas.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            Nenhuma visita com coordenadas válidas encontrada para exibir no mapa.
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

export default MapaDeMarcadores;

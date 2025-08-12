/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";

const GraficoBarras = ({
  visitador,
  childrens,
  visitas,
  visitasInvalidas,
  planos,
}) => {
  const visitaFeita = filtroDeVisitasFeitas(visitas);

  const options = {
    title: {
      text: "Resultados Gerais",
      left: "center",
      textStyle: {
        color: "#00010D",
        fontSize: 20,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      data: ["Quantidade"],
      top: "10%",
      textStyle: {
        color: "#00010D",
        fontSize: 16,

        fontWeight: "bold",
      },
    },
    grid: {
      left: "30%",
      right: "30%",
      bottom: "30%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Visitadores",
        "Crianças",
        "Visitas feitas",
        "Visitas Invalidas",
        "Planos criados",
      ],
      axisLine: {
        lineStyle: {
          color: "#00010D",
        },
      },
      axisLabel: {
        textStyle: {
          color: "#00010D",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#00010D",
        },
      },
      axisLabel: {
        textStyle: {
          color: "#00010D",
        },
      },
    },
    series: [
      {
        name: "Quantidade",
        type: "bar",
        data: [
          visitador.length,
          childrens.length,
          visitaFeita.length,
          visitasInvalidas.length,
          planos.length,
        ],
        itemStyle: {
          color: "#67c23a",
        },
        barWidth: "40%",
      },
    ],
  };

  return <ReactECharts option={options} />;
};

const filtroDeVisitasFeitas = (visitas) => {
  return visitas.filter((visita) => visita.isScheduledVisitFinished === true);
};

export default GraficoBarras;

/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";

const GraficoBarrasCriancas = ({ caregiver, childrens, visitas, planos }) => {
  const criancaBpc = criancasBpc(childrens);
  const criancaSemBpc = criancasSemBpc(childrens);
  const gestantesFiltradas = gestantes(caregiver);

  const options = {
    title: {
      text: "Tipos de beneficiários",
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
      data: ["Gestantes", "Crianças s/ BPC", "Crianças c/ BPC"],
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
          gestantesFiltradas.length,
          criancaSemBpc.length,
          criancaBpc.length,
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

const criancasBpc = (child) => {
  return child.filter((bpc) => bpc.isBpc === true);
};

const criancasSemBpc = (child) => {
  return child.filter((bpc) => bpc.isBpc === false);
};

const gestantes = (pregnant) => {
  return pregnant.filter((preg) => preg.pregnant === true);
};

export default GraficoBarrasCriancas;

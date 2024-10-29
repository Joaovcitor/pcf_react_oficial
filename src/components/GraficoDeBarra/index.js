/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const GraficoBarras = ({ visitador, childrens, visitas, planos }) => {
  const visitaFeita = filtroDeVisitasFeitas(visitas);

  const options = {
    title: {
      text: 'Resultados Gerais',
      left: 'center',
      textStyle: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: ['Quantidade'],
      top: '10%',
      textStyle: {
        color: '#666'
      }
    },
    grid: {
      left: '30%',
      right: '30%',
      bottom: '30%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Visitadores', 'Crianças', 'Visitas feitas', 'Planos criados'],
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#666'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#666'
        }
      }
    },
    series: [
      {
        name: 'Quantidade',
        type: 'bar',
        data: [visitador.length, childrens.length, visitaFeita.length, planos.length],
        itemStyle: {
          color: '#67c23a'
        },
        barWidth: '40%'
      }
    ]
  };

  return <ReactECharts option={options} />;
};

const filtroDeVisitasFeitas = (visitas) => {
  return visitas.filter(visita => visita.visita_marcada_finalizada === true);
};

export default GraficoBarras;

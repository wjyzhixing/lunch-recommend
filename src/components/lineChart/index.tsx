import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import * as ChartComponent from 'echarts/components';
import * as Chart from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  Object.values(ChartComponent),
  Object.values(Chart),
  CanvasRenderer,
]);

const LineChart = (props) => {
  const { id = 'id', data = [] } = props;
  useEffect(() => {
    let myChart = echarts.init(document.getElementById(id));
    const value = data;
    const dataX = data?.map((item) => item?.food);
    const dataTimes = data?.map((item) => item?.times);
    const dataLoves = data?.map((item) => item?.love);
    myChart.setOption({
      // title: {
      //     text: '堆叠区域图'
      // },
      tooltip: {
        trigger: 'axis',
        // formatter: '{b0} <br ?>{a0}: {c0}<br />{a1}: {c1}',
      },
      legend: {
        type: 'plain',
        left: true,
        icon: 'roundRect',
        textStyle: {
          color: '#000000',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: dataX,
          axisLabel: {
            interval: 'auto',
            rotate: 50,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '次数',
          type: 'line',
          areaStyle: {
            color: '#6699FF',
          },
          itemStyle: {
            normal: {
              color: '#6699FF',
              lineStyle: {
                color: '#6699FF',
                width: 2,
                type: 'dotted', //'dotted'虚线 'solid'实线
              },
            },
          },
          emphasis: {
            focus: 'series',
          },
          data: dataTimes,
        },
        {
          name: '喜爱程度',
          type: 'line',
          areaStyle: {
            color: '#A1E6CE',
          },
          itemStyle: {
            normal: {
              color: '#A1E6CE',
              lineStyle: {
                color: '#A1E6CE',
                width: 2,
                type: 'dotted', //'dotted'虚线 'solid'实线
              },
            },
          },
          emphasis: {
            focus: 'series',
          },
          data: dataLoves,
        },
      ],
    });
  }, [data]);
  return (
    <>
      <div id={id} style={{ height: 300, margin: 10 }}></div>
    </>
  );
};

export default LineChart;

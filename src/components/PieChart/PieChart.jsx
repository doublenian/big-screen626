import React, { useMemo, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import './PieChart.css';

const PieChart = ({ data, title, type = 'pie' }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const chartInstance = chartRef.current.getEchartsInstance();
        if (chartInstance) {
          chartInstance.resize();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getOption = useMemo(() => {
    const chartData = data.map(item => ({
      value: item.value || item.count,
      name: item.name || item.type || item.level || item.label
    }));

    const colorPalette = [
      '#00d4ff',
      '#4dc9ff',
      '#00ffcc',
      '#66ff99',
      '#ff8fab',
      '#ffaa66',
      '#aa66ff',
      '#66aaff'
    ];

    return {
      title: {
        text: title,
        textStyle: {
          color: '#ffffff',
          fontSize: 16,
          fontWeight: 600
        },
        left: 'center',
        top: 0
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(77, 201, 255, 0.9)',
        borderColor: 'rgba(77, 201, 255, 0.6)',
        textStyle: {
          color: '#ffffff'
        },
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        bottom: 0,
        left: 'center',
        textStyle: {
          color: '#ffffff',
          fontSize: 12
        },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 10,
        pageIconColor: '#4dc9ff',
        pageIconInactiveColor: 'rgba(255, 255, 255, 0.3)',
        pageTextStyle: {
          color: '#ffffff'
        }
      },
      series: [{
        name: title || '统计',
        type: 'pie',
        radius: type === 'donut' ? ['40%', '70%'] : '65%',
        center: ['50%', '55%'],
        data: chartData,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#1e3a8a',
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 8
        },
        color: colorPalette,
        label: {
          show: true,
          formatter: '{b}: {d}%',
          fontSize: 11,
          color: '#ffffff',
          distance: 20
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)',
            width: 1
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(77, 201, 255, 0.8)'
          },
          label: {
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }]
    };
  }, [data, title, type]);

  return (
    <div className="pie-chart">
      <ReactECharts
        ref={chartRef}
        option={getOption}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};

export default PieChart; 
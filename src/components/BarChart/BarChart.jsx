import React, { useMemo, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import './BarChart.css';

const BarChart = ({ data, type = 'single', title }) => {
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
    if (type === 'dual') {
      // 双重条形图（男女年龄分布）
      const categories = data.map(item => item.age);
      const maleData = data.map(item => item.male);
      const femaleData = data.map(item => item.female);

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
          trigger: 'axis',
          backgroundColor: 'rgba(77, 201, 255, 0.9)',
          borderColor: 'rgba(77, 201, 255, 0.6)',
          textStyle: {
            color: '#ffffff'
          }
        },
        legend: {
          data: ['男性', '女性'],
          bottom: 10,
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          },
          itemWidth: 12,
          itemHeight: 12
        },
        grid: {
          left: '8%',
          right: '8%',
          top: '20%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLine: {
            lineStyle: {
              color: 'rgba(77, 201, 255, 0.3)'
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 11
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'rgba(77, 201, 255, 0.3)'
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 11
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(77, 201, 255, 0.1)'
            }
          }
        },
        series: [
          {
            name: '男性',
            type: 'bar',
            data: maleData,
            barWidth: '30%',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#00d4ff' },
                  { offset: 1, color: '#4dc9ff' }
                ]
              },
              shadowColor: 'rgba(77, 201, 255, 0.5)',
              shadowBlur: 8,
              borderRadius: [2, 2, 0, 0]
            }
          },
          {
            name: '女性',
            type: 'bar',
            data: femaleData,
            barWidth: '30%',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#ff8fab' },
                  { offset: 1, color: '#ff6b9d' }
                ]
              },
              shadowColor: 'rgba(255, 107, 157, 0.5)',
              shadowBlur: 8,
              borderRadius: [2, 2, 0, 0]
            }
          }
        ]
      };
    } else {
      // 单一条形图（学历分布）
      const categories = data.map(item => item.level || item.name);
      const values = data.map(item => item.count || item.value);

      return {
        title: {
          text: title,
          textStyle: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 600
          },
          left: 'center',
          top: 10
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(77, 201, 255, 0.9)',
          borderColor: 'rgba(77, 201, 255, 0.6)',
          textStyle: {
            color: '#ffffff'
          }
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '20%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLine: {
            lineStyle: {
              color: 'rgba(77, 201, 255, 0.3)'
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 11
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'rgba(77, 201, 255, 0.3)'
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 11
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(77, 201, 255, 0.1)'
            }
          }
        },
        series: [{
          type: 'bar',
          data: values,
          barWidth: '50%',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#00d4ff' },
                { offset: 1, color: '#4dc9ff' }
              ]
            },
            shadowColor: 'rgba(77, 201, 255, 0.5)',
            shadowBlur: 8,
            borderRadius: [2, 2, 0, 0]
          }
        }]
      };
    }
  }, [data, type, title]);

  return (
    <div className="bar-chart">
      <ReactECharts
        ref={chartRef}
        option={getOption}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};

export default BarChart; 
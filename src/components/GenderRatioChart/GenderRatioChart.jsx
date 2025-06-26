import React, { useMemo, useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import './GenderRatioChart.css';

const GenderRatioChart = ({ data, title = "性别比例" }) => {
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
    const maleRatio = data.male;
    const femaleRatio = data.female;

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
        formatter: function (params) {
          return `${params.name}: ${params.value}%`;
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['60%', '80%'],
          center: ['50%', '55%'],
          startAngle: 90,
          data: [
            {
              value: maleRatio,
              name: '男性',
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 1, y2: 1,
                  colorStops: [
                    { offset: 0, color: '#00d4ff' },
                    { offset: 1, color: '#4dc9ff' }
                  ]
                },
                shadowColor: 'rgba(77, 201, 255, 0.6)',
                shadowBlur: 15
              }
            },
            {
              value: femaleRatio,
              name: '女性',
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 1, y2: 1,
                  colorStops: [
                    { offset: 0, color: '#00ffcc' },
                    { offset: 1, color: '#66ff99' }
                  ]
                },
                shadowColor: 'rgba(102, 255, 153, 0.6)',
                shadowBlur: 15
              }
            }
          ],
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 25,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          },
          animationType: 'scale',
          animationEasing: 'elasticOut'
        }
      ],
      graphic: [
        // 中心图标
        {
          type: 'group',
          left: 'center',
          top: 'center',
          children: [
            {
              type: 'rect',
              shape: {
                width: 40,
                height: 40,
                x: -20,
                y: -20
              },
              style: {
                fill: 'transparent',
                stroke: 'rgba(77, 201, 255, 0.8)',
                lineWidth: 2
              }
            },
            {
              type: 'rect',
              shape: {
                width: 8,
                height: 20,
                x: -15,
                y: -10
              },
              style: {
                fill: '#00d4ff'
              }
            },
            {
              type: 'rect',
              shape: {
                width: 8,
                height: 25,
                x: -5,
                y: -12
              },
              style: {
                fill: '#4dc9ff'
              }
            },
            {
              type: 'rect',
              shape: {
                width: 8,
                height: 15,
                x: 5,
                y: -7
              },
              style: {
                fill: '#00ffcc'
              }
            },
            {
              type: 'rect',
              shape: {
                width: 8,
                height: 22,
                x: 15,
                y: -11
              },
              style: {
                fill: '#66ff99'
              }
            }
          ]
        }
      ]
    };
  }, [data, title]);

  return (
    <div className="gender-ratio-chart">
      <div className="gender-ratio-chart__container">
        <ReactECharts
          ref={chartRef}
          option={getOption}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />

        {/* 左右两侧的数据显示 */}
        <div className="gender-ratio-chart__labels">
          <div className="gender-ratio-chart__label gender-ratio-chart__label--male">
            <div className="gender-ratio-chart__label-title">男生</div>
            <div className="gender-ratio-chart__label-value">{data.male}%</div>
          </div>
          <div className="gender-ratio-chart__label gender-ratio-chart__label--female">
            <div className="gender-ratio-chart__label-title">女生</div>
            <div className="gender-ratio-chart__label-value">{data.female}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderRatioChart; 
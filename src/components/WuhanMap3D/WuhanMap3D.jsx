import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl'; // 导入3D插件
import './WuhanMap3D.css';
import wuhanGeoData from '../../utils/wuhan.json';

const WuhanMap3D = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // 初始化和resize的通用函数
  const initializeChart = () => {
    if (!chartRef.current) return;

    // 获取容器的实际尺寸
    const containerRect = chartRef.current.getBoundingClientRect();
    const width = chartRef.current.offsetWidth;
    const height = chartRef.current.offsetHeight;

    console.log('Container dimensions:', { width, height });

    // 如果已存在实例，先销毁
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }

    // 初始化图表时明确指定尺寸
    try {
      chartInstance.current = echarts.init(chartRef.current, null, {
        width: width,
        height: height,
        devicePixelRatio: window.devicePixelRatio || 1
      });
      console.log('Chart instance created with dimensions:', { width, height });
    } catch (error) {
      console.error('Error initializing chart:', error);
      return;
    }

    return { width, height };
  };

  useEffect(() => {
    console.log('WuhanMap3D component mounted');
    console.log('echarts:', echarts);
    console.log('wuhanGeoData:', wuhanGeoData);

    // 等待DOM渲染完成
    const timer = setTimeout(() => {
      const dimensions = initializeChart();
      if (!dimensions || !chartInstance.current) return;

      // 注册武汉地图
      echarts.registerMap('wuhan', wuhanGeoData);
      console.log('Map registered');

      // 准备数据 - 为每个区设置数据，江夏区特殊处理
      const districts = wuhanGeoData.features.map(feature => {
        const name = feature.properties.name;
        const isJiangxia = name === '江夏区';

        return {
          name: name,
          value: isJiangxia ? 100 : Math.random() * 50 + 10, // 江夏区值设为最高
        };
      });

      console.log('Districts data:', districts);

      // 简化的2D地图配置用于测试
      const option = {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        // title: {
        //   text: '武汉市地图 (测试版)',
        //   left: 'center',
        //   textStyle: {
        //     color: '#4dc9ff',
        //     fontSize: 20,
        //     fontWeight: 'bold'
        //   }
        // },
        tooltip: {
          show: false,
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#4dc9ff',
          borderWidth: 1,
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          },
          padding: [4, 6],
          formatter: function (params) {
            if (!params || !params.name) return '';
            const isJiangxia = params.name === '江夏区';
            const value = params.value || 0;
            return [
              `<div style="color: ${isJiangxia ? '#ff6b6b' : '#4dc9ff'}; font-weight: bold; font-size: 11px;">`,
              `${params.name} ${isJiangxia ? '(重点区域)' : ''}`,
              `</div>`,
              `<div style="font-size: 10px; margin-top: 2px;">数值: ${Math.round(value)}</div>`
            ].join('');
          }
        },
        visualMap: {
          min: 0,
          max: 100,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          textStyle: {
            color: '#4dc9ff'
          },
          inRange: {
            color: ['#4575b4', '#74add1', '#abd9e9', '#fee090', '#fdae61', '#f46d43', '#d73027']
          },
          show: false
        },
        //地图上移并缩放
        series: [{
          type: 'map3D',
          map: 'wuhan',
          data: districts,
          roam: true,
          nameMap: {},
          // 确保tooltip可以显示
          tooltip: {
            show: true
          },
          // 调整地图位置和大小，确保完整显示
          top: '-20%',
          left: '5%',
          width: '100%',
          height: '100%',
          // 3D视角配置 - 优化显示范围
          viewControl: {
            distance: 120,
            alpha: 25,
            beta: 0,
            center: [0, -0.1, 0],
            rotateSensitivity: 1,
            zoomSensitivity: 1,
            panSensitivity: 1,
            minDistance: 80,
            maxDistance: 200
          },
          // 3D地图材质和光照配置
          shading: 'realistic',
          realisticMaterial: {
            detailTexture: '#fff',
            textureTiling: 1,
            roughness: 0.2,
            metalness: 0.1
          },
          light: {
            main: {
              color: '#ffffff',
              intensity: 1.2,
              shadow: true,
              shadowQuality: 'medium',
              alpha: 40,
              beta: 40
            },
            ambient: {
              color: '#ffffff',
              intensity: 0.3
            }
          },
          itemStyle: {
            borderColor: '#ffffff',
            borderWidth: 2,
            color: function (params) {
              const isJiangxia = params.name === '江夏区';
              return isJiangxia ? '#FFD700' : '#4dc9ff';
            },
            opacity: function (params) {
              const isJiangxia = params.name === '江夏区';
              return isJiangxia ? 0.95 : 0.85;
            }
          },
          emphasis: {
            itemStyle: {
              borderColor: '#ffffff',
              borderWidth: 3,
              color: function (params) {
                const isJiangxia = params.name === '江夏区';
                return isJiangxia ? '#FFFF00' : '#00d4ff';
              },
              opacity: 1
            }
          },
          label: {
            show: true,
            textStyle: {
              color: '#ffffff',
              fontSize: 11
            }
          }
        }]
      };

      console.log('Setting chart option...');
      try {
        chartInstance.current.setOption(option);
        console.log('Chart option set successfully');

        // 确保图表渲染完成后，再次调整canvas尺寸
        setTimeout(() => {
          if (chartInstance.current && chartRef.current) {
            const canvas = chartRef.current.querySelector('canvas');
            if (canvas) {
              const containerWidth = chartRef.current.offsetWidth;
              const containerHeight = chartRef.current.offsetHeight;

              console.log('Final canvas size check:', {
                containerWidth,
                containerHeight,
                canvasWidth: canvas.width,
                canvasHeight: canvas.height,
                canvasStyleWidth: canvas.style.width,
                canvasStyleHeight: canvas.style.height
              });

              // 强制同步canvas尺寸
              chartInstance.current.resize({
                width: containerWidth,
                height: containerHeight
              });
            }
          }
        }, 200);
      } catch (error) {
        console.error('Error setting chart option:', error);
      }
    }, 100); // 延迟100ms确保DOM完全渲染

    // 响应式处理
    const handleResize = () => {
      if (chartInstance.current && chartRef.current) {
        // 获取最新的容器尺寸
        const width = chartRef.current.offsetWidth;
        const height = chartRef.current.offsetHeight;
        console.log('Resizing to:', { width, height });

        // 调用resize方法，确保canvas尺寸与容器一致
        chartInstance.current.resize({
          width: width,
          height: height
        });
      }
    };

    // 使用ResizeObserver监听容器尺寸变化（更精确）
    let resizeObserver;
    if (window.ResizeObserver && chartRef.current) {
      resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          console.log('Container resized:', { width, height });
          if (chartInstance.current) {
            chartInstance.current.resize({
              width: width,
              height: height
            });
          }
        }
      });
      resizeObserver.observe(chartRef.current);
    }

    // 传统的window resize事件作为备用
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, []);

  console.log('WuhanMap3D render called');

  return (
    <div className="wuhan-map-3d-container">
      <div ref={chartRef} className="wuhan-map-3d-chart"></div>
    </div>
  );
};

export default WuhanMap3D; 
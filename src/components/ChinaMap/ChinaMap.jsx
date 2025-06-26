import React, { useState, useEffect } from 'react';
import './ChinaMap.css';

const ChinaMap = ({ title = "全国分布" }) => {
  const [geoData, setGeoData] = useState(null);
  const [hoveredProvince, setHoveredProvince] = useState(null);

  useEffect(() => {
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      .then(response => response.json())
      .then(data => {
        setGeoData(data);
      })
      .catch(error => {
        console.error('Error loading map data:', error);
      });
  }, []);

  // 将GeoJSON坐标转换为SVG路径
  const coordsToPath = (coords, scale = 1, offsetX = 0, offsetY = 0) => {
    if (!coords || coords.length === 0) return '';

    return coords.map(ring => {
      return ring.map((coord, index) => {
        const x = (coord[0] + offsetX) * scale;
        const y = (coord[1] + offsetY) * scale;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ') + ' Z';
    }).join(' ');
  };

  // 计算边界框并缩放
  const calculateViewBox = (features) => {
    if (!features || features.length === 0) return "0 0 800 600";

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    features.forEach(feature => {
      const coords = feature.geometry.coordinates;
      const flatCoords = coords.flat(2);
      flatCoords.forEach(coord => {
        if (coord[0] < minX) minX = coord[0];
        if (coord[0] > maxX) maxX = coord[0];
        if (coord[1] < minY) minY = coord[1];
        if (coord[1] > maxY) maxY = coord[1];
      });
    });

    const width = maxX - minX;
    const height = maxY - minY;
    const scale = 2;

    return `${minX * scale} ${minY * scale} ${width * scale} ${height * scale}`;
  };

  if (!geoData) {
    return (
      <div className="china-map">
        <h3 className="china-map__title">{title}</h3>
        <div className="china-map__loading">地图加载中...</div>
      </div>
    );
  }

  const viewBox = calculateViewBox(geoData.features);

  return (
    <div className="china-map">
      <h3 className="china-map__title">{title}</h3>
      <div className="china-map__container">
        <svg className="china-map__svg" viewBox={viewBox}>
          {geoData.features.map((feature, index) => {
            const provinceName = feature.properties.name;
            const isHubei = provinceName === '湖北省';
            const isHighlighted = isHubei;

            return (
              <g key={index}>
                <path
                  d={coordsToPath(feature.geometry.coordinates.flat(1), 2)}
                  className={`china-map__province ${isHighlighted ? 'china-map__province--highlighted' : ''}`}
                  onMouseEnter={() => setHoveredProvince(provinceName)}
                  onMouseLeave={() => setHoveredProvince(null)}
                />
              </g>
            );
          })}

          {/* 江夏区标记点 */}
          <circle
            cx="227.4"
            cy="60.8"
            r="3"
            className="china-map__marker"
          />
          <text
            x="235"
            y="64"
            className="china-map__marker-text"
          >
            江夏区
          </text>
        </svg>

        {hoveredProvince && (
          <div className="china-map__tooltip">
            {hoveredProvince}
          </div>
        )}
      </div>

      <div className="china-map__info">
        <div className="china-map__legend">
          <div className="china-map__legend-item">
            <div className="china-map__legend-color china-map__legend-color--normal"></div>
            <span>其他省份</span>
          </div>
          <div className="china-map__legend-item">
            <div className="china-map__legend-color china-map__legend-color--highlighted"></div>
            <span>重点区域</span>
          </div>
          <div className="china-map__legend-item">
            <div className="china-map__legend-marker"></div>
            <span>项目位置</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChinaMap; 
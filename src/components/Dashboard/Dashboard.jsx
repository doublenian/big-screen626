import React, { useState, useEffect } from 'react';
import DataCard from '../DataCard/DataCard';
import ProgressBar from '../ProgressBar/ProgressBar';
import BarChart from '../BarChart/BarChart';
import PieChart from '../PieChart/PieChart';
import ChinaMap from '../ChinaMap/ChinaMap';
import WuhanMap3D from '../WuhanMap3D/WuhanMap3D';
import GenderRatioChart from '../GenderRatioChart/GenderRatioChart';
import { mockData, formatNumber, getCurrentTime } from '../../utils/mockData';
import './Dashboard.css';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 全屏切换
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="dashboard">
      {/* 头部 */}
      <header className="dashboard__header">
        <div className="dashboard__header-left">
          <h1 className="dashboard__title">保租房运营数据可视化大屏</h1>
        </div>
        <div className="dashboard__header-center">
          <div className="dashboard__time">{currentTime}</div>
        </div>
        <div className="dashboard__header-right">
          <button
            className="dashboard__fullscreen-btn"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? '🔳' : '⛶'}
          </button>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="dashboard__main">

        {/* 左侧面板 */}
        <section className="dashboard__left">
          {/* 租赁统计 */}
          <div className="dashboard__panel">
            <h3 className="dashboard__panel-title">租赁统计</h3>
            <div className="dashboard__rental-stats">
              <div className="dashboard__stat-item">
                <span className="dashboard__stat-label">年收入总额</span>
                <span className="dashboard__stat-value">
                  {formatNumber(mockData.rentalStats.yearlyIncome)}
                </span>
              </div>
              <div className="dashboard__stat-item">
                <span className="dashboard__stat-label">平均出租率</span>
                <span className="dashboard__stat-value">
                  {mockData.rentalStats.occupancyRate}%
                </span>
              </div>
              <div className="dashboard__stat-item">
                <span className="dashboard__stat-label">平均租金</span>
                <span className="dashboard__stat-value">
                  ¥{mockData.rentalStats.averageRent}
                </span>
              </div>
            </div>
          </div>

          {/* 各门店出租率 */}
          <div className="dashboard__panel">
            <h3 className="dashboard__panel-title">各门店出租率</h3>
            <div className="dashboard__store-rates">
              {mockData.storeRates.map((store, index) => (
                <ProgressBar
                  key={index}
                  label={store.name}
                  percentage={store.rate}
                  color={store.color}
                />
              ))}
            </div>
          </div>

          {/* 类型分布 */}
          <PieChart
            data={mockData.typeDistribution}
            title="类型分布"
            type="donut"
          />
        </section>

        {/* 中间区域 */}
        <section className="dashboard__center">
          {/* 数据卡片区域 */}
          <div className="dashboard__cards-section">
            <div className="dashboard__cards-row">
              {mockData.topCards.map((card, index) => (
                <DataCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  value={card.value}
                />
              ))}
            </div>
            <div className="dashboard__cards-row">
              {mockData.bottomCards.map((card, index) => (
                <DataCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  value={card.value}
                />
              ))}
            </div>
          </div>

          {/* 地图区域 */}
          <div className="dashboard__map-container">
            <WuhanMap3D />
          </div>
        </section>

        {/* 右侧面板 */}
        <section className="dashboard__right">
          {/* 年龄分布 */}
          <div className="dashboard__right-chart">
            <BarChart
              data={mockData.ageDistribution}
              type="dual"
              title="年龄分布"
            />
          </div>

          {/* 学历分布 */}
          <div className="dashboard__right-chart">
            <BarChart
              data={mockData.educationData}
              type="single"
              title="学历分布"
            />
          </div>

          {/* 性别比例 */}
          <div className="dashboard__right-chart">
            <GenderRatioChart
              data={mockData.genderRatio}
              title="性别比例"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard; 
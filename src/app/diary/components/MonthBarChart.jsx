import React, { useRef, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 月份分布柱状图组件
 * 使用 ECharts 实现
 */
const MonthBarChart = ({ data = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const chartRef = useRef(null);

  // 默认数据
  const defaultData = [
    { month: '1月', value: 1 },
    { month: '2月', value: 2 },
    { month: '3月', value: 3 },
    { month: '4月', value: 2 },
    { month: '5月', value: 4 },
    { month: '6月', value: 3 },
    { month: '7月', value: 5 },
    { month: '8月', value: 4 },
    { month: '9月', value: 3 },
    { month: '10月', value: 4 },
    { month: '11月', value: 2 },
    { month: '12月', value: 3 }
  ];

  const chartData = data.length > 0 ? data : defaultData;
  const xData = chartData.map(d => d.month);
  const yData = chartData.map(d => d.value);

  // ECharts 配置
  const option = {
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    grid: {
      left: '8%',
      right: '4%',
      top: '10%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLine: {
        lineStyle: {
          color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: isDark ? '#9ca3af' : '#6b7280',
        fontSize: 11,
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
          type: 'dashed'
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: isDark ? '#9ca3af' : '#6b7280',
        fontSize: 11
      }
    },
    series: [
      {
        type: 'bar',
        data: yData,
        barWidth: '60%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#a78bfa' },
            { offset: 1, color: '#8b5cf6' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#c4b5fd' },
              { offset: 1, color: '#a78bfa' }
            ])
          }
        },
        showBackground: true,
        backgroundStyle: {
          color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
          borderRadius: [4, 4, 0, 0]
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      textStyle: {
        color: isDark ? '#fff' : '#1f2937',
        fontSize: 13
      },
      padding: [8, 12],
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => {
        const item = params[0];
        return `${item.name}<br/><span style="display:inline-block;margin-right:4px;border-radius:2px;width:8px;height:8px;background:#8b5cf6;"></span>${item.value} 次`;
      }
    }
  };

  return (
    <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-6 md:p-8`}>
      {/* 标题 */}
      <div className="mb-4">
        <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          月份分布
        </h3>
      </div>

      {/* 图表 */}
      <div className="h-52">
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>
    </div>
  );
};

export default MonthBarChart;

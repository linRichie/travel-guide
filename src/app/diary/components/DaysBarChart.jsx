import React, { useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * 旅行天数分布柱状图组件
 * 使用 ECharts 实现
 */
const DaysBarChart = ({ data = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const chartRef = useRef(null);

  // 默认数据
  const defaultData = [
    { name: '1-3天', value: 4 },
    { name: '4-7天', value: 8 },
    { name: '8-14天', value: 6 },
    { name: '15天以上', value: 2 }
  ];

  const chartData = data.length > 0 ? data : defaultData;
  const xData = chartData.map(d => d.name);
  const yData = chartData.map(d => d.value);

  // ECharts 配置
  const option = {
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    grid: {
      left: '8%',
      right: '6%',
      top: '8%',
      bottom: '12%',
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
        fontSize: 12,
        interval: 0,
        margin: 12
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
        barWidth: '50%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#a78bfa' },
            { offset: 1, color: '#7c3aed' }
          ]),
          borderRadius: [6, 6, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#c4b5fd' },
              { offset: 1, color: '#8b5cf6' }
            ])
          },
          shadowBlur: 10,
          shadowColor: 'rgba(139, 92, 246, 0.3)'
        },
        showBackground: true,
        backgroundStyle: {
          color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
          borderRadius: [6, 6, 0, 0]
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

  const maxValue = Math.max(...yData);

  return (
    <div className={`${isDark ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'} border rounded-2xl shadow-xl p-6 md:p-8`}>
      {/* 标题 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          旅行天数分布
        </h3>
        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          最常见: <span className="font-bold text-purple-400">
            {chartData.find(d => d.value === maxValue)?.name || '-'}
          </span>
        </div>
      </div>

      {/* 图表 */}
      <div className="h-44">
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>

      {/* 底部统计 */}
      <div className={`mt-4 pt-4 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className={`flex items-center justify-center gap-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <span>总计 {yData.reduce((a, b) => a + b, 0)} 次旅行</span>
          <span>·</span>
          <span>平均 {Math.round(yData.reduce((sum, v, i) => {
            const avgDays = xData[i].includes('1-3') ? 2 : xData[i].includes('4-7') ? 5.5 : xData[i].includes('8-14') ? 11 : 15;
            return sum + avgDays * v;
          }, 0) / yData.reduce((a, b) => a + b, 0))} 天/次</span>
        </div>
      </div>
    </div>
  );
};

export default DaysBarChart;

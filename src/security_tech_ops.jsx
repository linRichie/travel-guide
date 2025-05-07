
import React, { useState } from 'react';
import { 
  BookOpen, 
  Shield, 
  AlertTriangle, 
  BarChart2, 
  Cpu, 
  RefreshCw, 
  Users, 
  Bookmark, 
  X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const SecurityTechOperations = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  // 示例数据
  const data = [
    { name: '1月', incidents: 4, resolved: 3 },
    { name: '2月', incidents: 3, resolved: 3 },
    { name: '3月', incidents: 2, resolved: 2 },
    { name: '4月', incidents: 5, resolved: 4 },
    { name: '5月', incidents: 3, resolved: 3 },
    { name: '6月', incidents: 4, resolved: 4 },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <motion.header 
        className="w-full text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-6xl md:text-7xl font-bold">
          安全技术运营方法与实践
        </h1>
      </motion.header>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div 
            className="bg-gray-900/50 rounded-2xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">安全评分</h3>
            <p className="text-4xl font-bold text-blue-500">92.5%</p>
          </motion.div>

          <motion.div 
            className="bg-gray-900/50 rounded-2xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">待处理警告</h3>
            <p className="text-4xl font-bold text-yellow-500">3</p>
          </motion.div>

          <motion.div 
            className="bg-gray-900/50 rounded-2xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center mb-4">
              <RefreshCw className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">系统可用性</h3>
            <p className="text-4xl font-bold text-green-500">99.9%</p>
          </motion.div>
        </div>

        {/* Chart Section */}
        <motion.div 
          className="bg-gray-900/50 rounded-2xl p-8 mb-12 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">安全事件统计</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="incidents" fill="#ff4d4d" name="安全事件" />
                <Bar dataKey="resolved" fill="#4dff4d" name="已解决" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SecurityTechOperations;

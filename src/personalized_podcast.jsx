
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Volume2, X, Radio } from 'lucide-react';

const PersonalizedPodcastSystem = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);

  const handlePreview = () => {
    setPreviewContent({
      title: '个性化播客系统预览',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-800">系统特点</h3>
            <ul className="mt-4 space-y-2 text-purple-700">
              <li>• 智能推荐算法</li>
              <li>• 本地化资讯整合</li>
              <li>• 沉浸式播放界面</li>
              <li>• 社区互动功能</li>
            </ul>
          </div>
        </div>
      )
    });
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <nav className="fixed top-0 w-full bg-black bg-opacity-50 backdrop-blur-lg z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Radio className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold">个性化播客系统</span>
            </div>
            <button
              onClick={handlePreview}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              预览
            </button>
          </div>
        </div>
      </nav>

      {/* Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 relative text-black"
            >
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4">{previewContent?.title}</h2>
              {previewContent?.content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Add your podcast system content here */}
        </div>
      </main>

      {/* Player Bar */}
      <div className="fixed bottom-0 w-full bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-800 rounded-full">
                <SkipBack className="h-5 w-5" />
              </button>
              <button 
                className="p-3 bg-purple-600 rounded-full hover:bg-purple-700"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-full">
                <SkipForward className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5" />
              <div className="w-24 h-1 bg-gray-700 rounded-full">
                <div className="w-1/2 h-full bg-purple-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedPodcastSystem;

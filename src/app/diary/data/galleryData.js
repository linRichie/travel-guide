/**
 * 旅拍图集数据
 */

export const galleryItems = [
  {
    id: 1,
    title: '巴黎铁塔',
    location: '法国巴黎',
    date: '2024年',
    img: 'https://picsum.photos/600/400',
    tags: ['城市', '建筑', '欧洲'],
    exif: {
      camera: 'Sony A7IV',
      lens: '24-70mm f/2.8',
      aperture: 'f/8',
      shutter: '1/250s',
      iso: 100,
      focal: '35mm'
    }
  },
  {
    id: 2,
    title: '京都寺庙',
    location: '日本京都',
    date: '2023年',
    img: 'https://picsum.photos/601/400',
    tags: ['寺庙', '文化', '亚洲'],
    exif: {
      camera: 'Fujifilm X-T5',
      lens: '16-80mm f/4',
      aperture: 'f/5.6',
      shutter: '1/125s',
      iso: 200,
      focal: '23mm'
    }
  },
  {
    id: 3,
    title: '威尼斯水城',
    location: '意大利威尼斯',
    date: '2023年',
    img: 'https://picsum.photos/602/400',
    tags: ['水城', '浪漫', '欧洲'],
    exif: {
      camera: 'Canon R5',
      lens: '50mm f/1.4',
      aperture: 'f/2.8',
      shutter: '1/500s',
      iso: 400,
      focal: '50mm'
    }
  },
  {
    id: 4,
    title: '圣托里尼',
    location: '希腊',
    date: '2023年',
    img: 'https://picsum.photos/603/400',
    tags: ['海岛', '日落', '欧洲'],
    exif: {
      camera: 'Nikon Z8',
      lens: '14-24mm f/2.8',
      aperture: 'f/11',
      shutter: '1/60s',
      iso: 100,
      focal: '16mm'
    }
  },
  {
    id: 5,
    title: '冰岛极光',
    location: '冰岛',
    date: '2022年',
    img: 'https://picsum.photos/604/400',
    tags: ['极光', '自然', '欧洲'],
    exif: {
      camera: 'Sony A7S III',
      lens: '24mm f/1.4',
      aperture: 'f/1.4',
      shutter: '15s',
      iso: 3200,
      focal: '24mm'
    }
  },
  {
    id: 6,
    title: '瑞士阿尔卑斯',
    location: '瑞士',
    date: '2022年',
    img: 'https://picsum.photos/605/400',
    tags: ['山川', '滑雪', '欧洲'],
    exif: {
      camera: 'Leica Q2',
      lens: '28mm f/1.7',
      aperture: 'f/8',
      shutter: '1/1000s',
      iso: 200,
      focal: '28mm'
    }
  }
];

// 获取所有标签
export const getAllTags = () => {
  const tags = new Set();
  galleryItems.forEach(item => {
    item.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};

// 获取所有年份
export const getAllYears = () => {
  const years = new Set();
  galleryItems.forEach(item => {
    years.add(item.date);
  });
  return Array.from(years).sort().reverse();
};

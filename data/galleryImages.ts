import { GalleryItem } from '../types';

export const GALLERY_IMAGES_EN: GalleryItem[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `img-${i}`,
  src: `https://picsum.photos/1200/1200?random=${i + 10}`,
  alt: `Abstract composition ${i + 1}`,
  category: i % 2 === 0 ? '3D RENDER' : 'PHOTOGRAPHY',
  title: i % 2 === 0 ? `Render Experiment #${i + 1}` : `Urban Study #${i + 1}`,
  description: i % 2 === 0
    ? 'An exploration of procedural generation using Blender geometry nodes. The texture work focuses on imperfection and realism within a digital construct.'
    : 'Captured on 35mm film in Tokyo. This shot emphasizes the interplay between brutalist architecture and organic city life.'
}));

export const GALLERY_IMAGES_ZH: GalleryItem[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `img-${i}`,
  src: `https://picsum.photos/1200/1200?random=${i + 10}`,
  alt: `抽象构图 ${i + 1}`,
  category: i % 2 === 0 ? '3D 渲染' : '摄影',
  title: i % 2 === 0 ? `渲染实验 #${i + 1}` : `城市研究 #${i + 1}`,
  description: i % 2 === 0
    ? '使用 Blender 几何节点探索程序化生成。纹理工作专注于数字构造中的不完美和真实感。'
    : '在东京用 35mm 胶片拍摄。这张照片强调了粗野主义建筑与有机城市生活之间的相互作用。'
}));


import { CONTENT } from '../../data/content';
import GalleryClient from './GalleryClient';

export default async function GalleryPage() {
  return <GalleryClient content={CONTENT} />;
}


import { TRIP_PREVIEW_IMAGES } from '../data';
import { PreviewImage } from '../types';

export default function usePreviewImage(previewImage?: PreviewImage | null) {
  const previewImageSrc = previewImage?.templateImageId
    ? TRIP_PREVIEW_IMAGES.find(
        (image) => image.id === previewImage?.templateImageId,
      )?.src
    : null;

  return previewImageSrc;
}

import { v2 } from 'cloudinary';
import { CLOUDINARY, CloudinaryConfig } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config(CloudinaryConfig);
  },
};

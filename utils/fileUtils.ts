import { filterStyleMap } from '../constants/filters';

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('Failed to read file as base64 string.'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};


export const applyFilterAndConvertToBase64 = (file: File, filterId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const imageUrl = URL.createObjectURL(file);
        const img = new Image();
        img.crossOrigin = 'anonymous'; 
        img.src = imageUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                URL.revokeObjectURL(imageUrl);
                return reject(new Error('Could not get canvas context'));
            }

            ctx.filter = filterStyleMap[filterId] || 'none';
            ctx.drawImage(img, 0, 0);

            URL.revokeObjectURL(imageUrl);
            
            const dataUrl = canvas.toDataURL(file.type);
            const base64String = dataUrl.split(',')[1];
            resolve(base64String);
        };

        img.onerror = (error) => {
            URL.revokeObjectURL(imageUrl);
            reject(error);
        };
    });
};
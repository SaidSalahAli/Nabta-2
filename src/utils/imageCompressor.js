/**
 * Compresses an image file and converts it to WebP format.
 * @param {File} file - The original image file.
 * @param {number} quality - Quality between 0 and 1 (default 0.75).
 * @param {number} maxWidth - Maximum width for resizing (default 1200).
 * @returns {Promise<File>} - A Promise that resolves to the compressed WebP File.
 */
export const compressToWebP = (file, maxSizeBytes = 200 * 1024, maxWidth = 1200) => {
  return new Promise((resolve) => {
    if (!file || !(file instanceof File) || !file.type.startsWith('image/')) {
      return resolve(file); // Return original if not a file or not an image
    }

    // Skip if it's already a standard acceptable format (jpeg/png) and smaller than maxSizeBytes
    if ((file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') && file.size <= maxSizeBytes) {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Resize initially if exceeds maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let nameWithoutExt = file.name;
        const lastDotIndex = file.name.lastIndexOf('.');
        if (lastDotIndex !== -1) {
          nameWithoutExt = file.name.substring(0, lastDotIndex);
        }
        const newFileName = `${nameWithoutExt}.jpg`;

        // Recursive compression function to achieve desired size
        const attemptCompression = (currentWidth, currentHeight, quality) => {
          canvas.width = currentWidth;
          canvas.height = currentHeight;
          ctx.clearRect(0, 0, currentWidth, currentHeight);
          ctx.drawImage(img, 0, 0, currentWidth, currentHeight);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                return resolve(file); // Fallback to original
              }

              // If size is good, resolve
              if (blob.size <= maxSizeBytes) {
                const compressedFile = new File([blob], newFileName, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                });
                return resolve(compressedFile);
              }

              // Otherwise try reducing quality
              if (quality > 0.15) {
                attemptCompression(currentWidth, currentHeight, quality - 0.1);
              } else if (currentWidth > 350) {
                // If quality is too low but image is still large, scale down image dimensions and retry
                const scaleFactor = 0.8;
                const nextWidth = Math.round(currentWidth * scaleFactor);
                const nextHeight = Math.round(currentHeight * scaleFactor);
                attemptCompression(nextWidth, nextHeight, 0.75); // reset quality for smaller size
              } else {
                // Absolute fallback if we can't shrink further
                const compressedFile = new File([blob], newFileName, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                });
                resolve(compressedFile);
              }
            },
            'image/jpeg',
            quality
          );
        };

        // Start compression cycle
        attemptCompression(width, height, 0.75);
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

/**
 * Helper to process any image files inside an object.
 * Checks all fields in the given object and compresses any image Files.
 * @param {Object} data - The data object.
 * @returns {Promise<Object>} - The object with compressed image files.
 */
export const processImageFields = async (data) => {
  if (!data || typeof data !== 'object') return data;

  const processed = { ...data };
  const keys = Object.keys(processed);

  for (const key of keys) {
    const val = processed[key];
    if (val instanceof File && val.type.startsWith('image/')) {
      try {
        processed[key] = await compressToWebP(val);
      } catch (e) {
        console.error(`Failed to compress image field: ${key}`, e);
      }
    }
  }

  return processed;
};

/**
 * Helper to process any image files inside a FormData object.
 * Replaces any image File entries with compressed WebP files.
 * @param {FormData} formData - The original FormData.
 * @returns {Promise<FormData>} - The new FormData with compressed WebP images.
 */
export const processFormDataImages = async (formData) => {
  if (!(formData instanceof FormData)) return formData;

  const newFormData = new FormData();
  
  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.type.startsWith('image/')) {
      try {
        const compressed = await compressToWebP(value);
        newFormData.append(key, compressed);
      } catch (e) {
        console.error(`Failed to compress FormData image field: ${key}`, e);
        newFormData.append(key, value);
      }
    } else {
      newFormData.append(key, value);
    }
  }

  return newFormData;
};


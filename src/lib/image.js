// Convertit un fichier image (PNG, JPEG, WebP, SVG…) en Data URL PNG
// normalisée pour react-pdf, qui ne supporte que PNG et JPEG.
// L'image est réduite à `maxSize` px max pour garder un PDF léger.
export function fileToLogo(file, maxSize = 600) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve({
        url: canvas.toDataURL('image/png'),
        aspect: canvas.width / canvas.height,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image illisible'));
    };
    img.src = url;
  });
}

// Le recadrage (centré, sans déformation) est fait par les templates via
// `objectFit: 'cover'` : chaque template définit sa propre zone d'image.

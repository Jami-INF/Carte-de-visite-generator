import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages sert le site depuis /Carte-de-visite-generator/ (nom du repo),
// pas depuis la racine du domaine. Sans ce `base`, les assets sont demandés
// à /assets/… → 404 → page blanche. En dev, on reste à la racine « / ».
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Carte-de-visite-generator/' : '/',
  plugins: [react(), tailwindcss()],
}));

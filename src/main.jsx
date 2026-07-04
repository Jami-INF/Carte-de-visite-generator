import { Buffer } from 'buffer';
import { createRoot } from 'react-dom/client';

// Polyfill Node requis par le décodage d'images de @react-pdf/renderer
// dans le navigateur (sinon : « Buffer is not defined » en boucle).
globalThis.Buffer = globalThis.Buffer ?? Buffer;

import App from './App.jsx';
import './index.css';

// Pas de StrictMode : le double-montage en dev provoque des re-rendus
// inutiles du worker pdf.js utilisé par <PDFViewer>.
createRoot(document.getElementById('root')).render(<App />);

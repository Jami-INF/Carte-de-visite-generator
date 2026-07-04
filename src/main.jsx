import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Pas de StrictMode : le double-montage en dev provoque des re-rendus
// inutiles du worker pdf.js utilisé par <PDFViewer>.
createRoot(document.getElementById('root')).render(<App />);

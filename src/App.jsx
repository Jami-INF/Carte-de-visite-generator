import { useEffect, useState } from 'react';
import Form from './components/Form.jsx';
import Preview from './components/Preview.jsx';
import useDebounce from './hooks/useDebounce.js';
import { generateQrDataUrl } from './lib/qrcode.js';
import { DEFAULT_ACCENT, DEFAULT_QR_MODE } from './pdf/constants.js';

const INITIAL_DATA = {
  firstName: 'Marie',
  lastName: 'Dupont',
  role: 'Directrice artistique',
  phone: '+33 6 12 34 56 78',
  email: 'marie.dupont@exemple.fr',
  website: 'www.exemple.fr',
  address: '12 rue des Lilas, 75011 Paris',
};

export default function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [template, setTemplate] = useState('minimal');
  const [format, setFormat] = useState('maison');
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [accent, setAccent] = useState(DEFAULT_ACCENT);
  const [logo, setLogo] = useState(null); // { url, aspect } ou null
  const [qrMode, setQrMode] = useState(DEFAULT_QR_MODE); // vcard | website | none

  // Le PDF n'est re-généré que 400 ms après la dernière frappe.
  // L'accent est aussi débouncé : le color picker émet en continu
  // pendant qu'on fait glisser le curseur.
  const debouncedData = useDebounce(data, 400);
  const debouncedAccent = useDebounce(accent, 400);

  // QR code régénéré quand les données (débouncées) ou le mode changent.
  // Renvoie null en mode « aucun » → les templates masquent le QR.
  useEffect(() => {
    let cancelled = false;
    generateQrDataUrl(debouncedData, qrMode).then((url) => {
      if (!cancelled) setQrDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [debouncedData, qrMode]);

  const handleFieldChange = (key, value) =>
    setData((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-lg font-bold text-slate-900">
          Générateur de cartes de visite
        </h1>
        <p className="text-sm text-slate-500">
          Remplissez le formulaire, choisissez un style, téléchargez un PDF
          vectoriel prêt à imprimer.
        </p>
      </header>

      {/* Mobile : empilé — Desktop : côte à côte */}
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 p-6 lg:grid-cols-2">
        <Form
          data={data}
          onFieldChange={handleFieldChange}
          template={template}
          onTemplateChange={setTemplate}
          format={format}
          onFormatChange={setFormat}
          accent={accent}
          onAccentChange={setAccent}
          logo={logo}
          onLogoChange={setLogo}
          qrMode={qrMode}
          onQrModeChange={setQrMode}
        />
        <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-6rem)]">
          <Preview
            data={debouncedData}
            template={template}
            format={format}
            qrDataUrl={qrDataUrl}
            accent={debouncedAccent}
            logo={logo}
          />
        </div>
      </main>
    </div>
  );
}

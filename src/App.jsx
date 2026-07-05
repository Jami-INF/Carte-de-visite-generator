import { useEffect, useMemo, useState } from 'react';
import Form from './components/Form.jsx';
import Preview from './components/Preview.jsx';
import useDebounce from './hooks/useDebounce.js';
import { generateQrDataUrl } from './lib/qrcode.js';
import { loadProject, saveProject, clearProject } from './lib/storage.js';
import { DEFAULT_ACCENT, DEFAULT_QR_MODE } from './pdf/constants.js';

// Valeurs d'exemple pré-remplies : le visiteur voit immédiatement une carte
// complète. Chaque champ se vide au premier focus (voir handleFieldFocus)
// tant qu'il contient encore sa valeur par défaut.
const INITIAL_DATA = {
  firstName: 'Marie',
  lastName: 'Dupont',
  role: 'Directrice artistique',
  company: 'Studio Lumière',
  phone: '+33 6 12 34 56 78',
  email: 'marie@studio-lumiere.fr',
  website: 'www.studio-lumiere.fr',
  address: '12 rue des Lilas, 75011 Paris',
};

export default function App() {
  // Projet éventuellement restauré du localStorage (lu une seule fois).
  const saved = useMemo(loadProject, []);

  const [data, setData] = useState({ ...INITIAL_DATA, ...(saved?.data ?? {}) });
  const [template, setTemplate] = useState(saved?.template ?? 'minimal');
  const [format, setFormat] = useState(saved?.format ?? 'maison');
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [accent, setAccent] = useState(saved?.accent ?? DEFAULT_ACCENT);
  const [logo, setLogo] = useState(saved?.logo ?? null); // { url, aspect } ou null
  const [qrMode, setQrMode] = useState(saved?.qrMode ?? DEFAULT_QR_MODE);
  // Champs déjà mis au point (focus) une fois : ne plus jamais les vider.
  const [touched, setTouched] = useState({});

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

  // Sauvegarde auto. On s'appuie sur les valeurs débouncées pour la frappe
  // et la couleur : évite de réécrire le logo (Data URL, potentiellement
  // lourd) à chaque touche ou à chaque frame du color picker.
  useEffect(() => {
    saveProject({
      data: debouncedData,
      template,
      format,
      accent: debouncedAccent,
      logo,
      qrMode,
    });
  }, [debouncedData, template, format, debouncedAccent, logo, qrMode]);

  const handleFieldChange = (key, value) =>
    setData((prev) => ({ ...prev, [key]: value }));

  // Au premier focus, on vide le champ s'il contient encore sa valeur
  // d'exemple — sans toucher à ce que l'utilisateur aurait déjà saisi.
  const handleFieldFocus = (key) => {
    if (touched[key]) return;
    setTouched((prev) => ({ ...prev, [key]: true }));
    setData((prev) =>
      prev[key] === INITIAL_DATA[key] ? { ...prev, [key]: '' } : prev,
    );
  };

  const handleReset = () => {
    clearProject();
    setData(INITIAL_DATA);
    setTouched({});
    setTemplate('minimal');
    setFormat('maison');
    setAccent(DEFAULT_ACCENT);
    setLogo(null);
    setQrMode(DEFAULT_QR_MODE);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900">
            Générateur de cartes de visite
          </h1>
          <p className="text-sm text-slate-500">
            Remplissez le formulaire, choisissez un style, téléchargez un PDF
            vectoriel prêt à imprimer.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            💾 Enregistré automatiquement sur cet appareil — aucune donnée
            n'est envoyée en ligne.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600"
        >
          Réinitialiser
        </button>
      </header>

      {/* Mobile : empilé — Desktop : côte à côte */}
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 p-6 lg:grid-cols-2">
        <Form
          data={data}
          onFieldChange={handleFieldChange}
          onFieldFocus={handleFieldFocus}
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

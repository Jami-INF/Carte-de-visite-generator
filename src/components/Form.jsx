import { useRef, useState } from 'react';
import { FORMATS, TEMPLATES, ACCENT_PRESETS, QR_MODES } from '../pdf/constants.js';
import { fileToLogo } from '../lib/image.js';

const FIELDS = [
  { key: 'firstName', label: 'Prénom', placeholder: 'Marie', half: true },
  { key: 'lastName', label: 'Nom', placeholder: 'Dupont', half: true },
  { key: 'role', label: 'Poste', placeholder: 'Directrice artistique' },
  { key: 'phone', label: 'Téléphone', placeholder: '+33 6 12 34 56 78', type: 'tel', half: true },
  { key: 'email', label: 'Email', placeholder: 'marie@exemple.fr', type: 'email', half: true },
  { key: 'website', label: 'Site web', placeholder: 'www.exemple.fr', type: 'url' },
  { key: 'address', label: 'Adresse', placeholder: '12 rue des Lilas, 75011 Paris' },
];

function Field({ field, value, onChange }) {
  return (
    <label className={field.half ? 'col-span-1' : 'col-span-2'}>
      <span className="mb-1 block text-xs font-medium text-slate-600">
        {field.label}
      </span>
      <input
        type={field.type ?? 'text'}
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => onChange(field.key, e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
      />
    </label>
  );
}

function LogoPicker({ logo, onLogoChange }) {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setError(null);
      onLogoChange(await fileToLogo(file));
    } catch {
      setError("Impossible de lire cette image — essayez un PNG ou un JPEG.");
    } finally {
      e.target.value = ''; // permet de re-sélectionner le même fichier
    }
  };

  return (
    <div>
      <span className="mb-1 block text-xs font-medium text-slate-600">
        Logo / image (optionnel)
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-dashed border-slate-400 bg-white px-4 py-2 text-sm text-slate-600 transition hover:border-sky-500 hover:text-sky-700"
        >
          {logo ? 'Changer l’image…' : 'Importer une image…'}
        </button>
        {logo ? (
          <>
            <img
              src={logo.url}
              alt="Aperçu du logo"
              className="h-10 max-w-24 rounded border border-slate-200 bg-white object-contain p-1"
            />
            <button
              type="button"
              onClick={() => onLogoChange(null)}
              className="text-xs text-slate-400 underline transition hover:text-red-600"
            >
              Retirer
            </button>
          </>
        ) : null}
      </div>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function AccentPicker({ accent, onAccentChange }) {
  return (
    <div>
      <span className="mb-1 block text-xs font-medium text-slate-600">
        Couleur d'accent
      </span>
      <div className="flex items-center gap-2">
        {ACCENT_PRESETS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onAccentChange(color)}
            aria-label={`Couleur ${color}`}
            aria-pressed={accent === color}
            style={{ backgroundColor: color }}
            className={`h-8 w-8 rounded-full transition ${
              accent === color
                ? 'ring-2 ring-sky-500 ring-offset-2'
                : 'hover:scale-110'
            }`}
          />
        ))}
        <label className="ml-1 flex cursor-pointer items-center gap-1.5 text-xs text-slate-500">
          <input
            type="color"
            value={accent}
            onChange={(e) => onAccentChange(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border border-slate-300 bg-white p-0.5"
          />
          Autre…
        </label>
      </div>
    </div>
  );
}

function QrPicker({ qrMode, onQrModeChange }) {
  return (
    <div>
      <span className="mb-1 block text-xs font-medium text-slate-600">
        Code QR{' '}
        <span className="font-normal text-slate-400">
          (templates Moderne, Contraste, Bandeau, Bicolore)
        </span>
      </span>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(QR_MODES).map(([key, { label, detail }]) => (
          <button
            key={key}
            type="button"
            onClick={() => onQrModeChange(key)}
            aria-pressed={qrMode === key}
            title={detail}
            className={`rounded-lg border px-2 py-2 text-center text-sm font-medium transition ${
              qrMode === key
                ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
            }`}
          >
            {label}
            <span className="mt-0.5 block text-[10px] font-normal text-slate-400">
              {detail}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Form({
  data,
  onFieldChange,
  template,
  onTemplateChange,
  format,
  onFormatChange,
  accent,
  onAccentChange,
  logo,
  onLogoChange,
  qrMode,
  onQrModeChange,
}) {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Vos informations
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {FIELDS.map((field) => (
            <Field
              key={field.key}
              field={field}
              value={data[field.key]}
              onChange={onFieldChange}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Style de la carte
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(TEMPLATES).map(([key, { label }]) => (
            <button
              key={key}
              type="button"
              onClick={() => onTemplateChange(key)}
              aria-pressed={template === key}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                template === key
                  ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                  : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Personnalisation
        </h2>
        <div className="space-y-4">
          <AccentPicker accent={accent} onAccentChange={onAccentChange} />
          <LogoPicker logo={logo} onLogoChange={onLogoChange} />
          <QrPicker qrMode={qrMode} onQrModeChange={onQrModeChange} />
          <p className="text-xs text-slate-400">
            Le template « Minimaliste » reste volontairement monochrome ; les
            autres utilisent la couleur d'accent. L'image est recadrée
            automatiquement au format de chaque template : pastille ronde
            (Minimaliste, Élégant), pleine colonne (Moderne), vignette
            (Contraste).
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Format d'impression
        </h2>
        <div className="space-y-2">
          {Object.entries(FORMATS).map(([key, { label, detail }]) => (
            <button
              key={key}
              type="button"
              onClick={() => onFormatChange(key)}
              aria-pressed={format === key}
              className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
                format === key
                  ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-200'
                  : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  format === key ? 'text-sky-700' : 'text-slate-600'
                }`}
              >
                {label}
              </span>
              <span className="text-xs text-slate-400">{detail}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

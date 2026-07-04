import { FORMATS, TEMPLATES } from '../pdf/constants.js';

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

export default function Form({
  data,
  onFieldChange,
  template,
  onTemplateChange,
  format,
  onFormatChange,
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

import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import CardDocument from '../pdf/CardDocument.jsx';

export default function Preview({
  data,
  template,
  format,
  qrDataUrl,
  accent,
  logo,
}) {
  // Le même arbre react-pdf sert à l'aperçu et au téléchargement :
  // ce qu'on voit est exactement ce qu'on exporte.
  const doc = (
    <CardDocument
      data={data}
      template={template}
      format={format}
      qrDataUrl={qrDataUrl}
      accent={accent}
      logo={logo}
    />
  );

  const fileName = `carte-de-visite-${[data.firstName, data.lastName]
    .filter(Boolean)
    .join('-')
    .toLowerCase() || 'sans-nom'}-${format}.pdf`;

  return (
    <div className="flex h-full flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Aperçu
      </h2>

      <PDFViewer
        className="min-h-[380px] w-full flex-1 rounded-xl border border-slate-300 bg-slate-100 shadow-inner"
        showToolbar={false}
      >
        {doc}
      </PDFViewer>

      <PDFDownloadLink
        document={doc}
        fileName={fileName}
        className="block rounded-xl bg-sky-600 px-6 py-4 text-center text-base font-semibold text-white shadow-lg shadow-sky-600/25 transition hover:bg-sky-700 active:scale-[0.99]"
      >
        {({ loading }) =>
          loading ? 'Préparation du PDF…' : '⬇ Télécharger le PDF'
        }
      </PDFDownloadLink>

      <p className="text-center text-xs text-slate-400">
        PDF vectoriel — {format === 'pro'
          ? '91 × 61 mm avec fond perdu 3 mm et traits de coupe'
          : format === 'planche'
            ? 'planche A4, 10 cartes 85 × 55 mm à découper aux ciseaux'
            : '85 × 55 mm net'}
      </p>
    </div>
  );
}

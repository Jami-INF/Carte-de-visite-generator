import { Document, Page } from '@react-pdf/renderer';
import './fonts.js';
import { PAGE_SIZES, BLEED_PT } from './constants.js';
import CropMarks from './CropMarks.jsx';
import TemplateMinimal from './templates/TemplateMinimal.jsx';
import TemplateModern from './templates/TemplateModern.jsx';

const TEMPLATE_COMPONENTS = {
  minimal: TemplateMinimal,
  modern: TemplateModern,
};

// Composant racine du PDF : choisit le format de page (maison/pro) et le
// template, et superpose les traits de coupe en format pro.
export default function CardDocument({ data, template, format, qrDataUrl }) {
  const size = PAGE_SIZES[format] ?? PAGE_SIZES.maison;
  const bleed = format === 'pro' ? BLEED_PT : 0;
  const Template = TEMPLATE_COMPONENTS[template] ?? TemplateMinimal;
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ');

  return (
    <Document
      title={`Carte de visite — ${fullName || 'sans nom'}`}
      author={fullName}
      creator="Carte-de-visite-generator"
    >
      <Page size={size}>
        <Template data={data} bleed={bleed} qrDataUrl={qrDataUrl} />
        {bleed > 0 && (
          <CropMarks pageWidth={size[0]} pageHeight={size[1]} bleed={bleed} />
        )}
      </Page>
    </Document>
  );
}

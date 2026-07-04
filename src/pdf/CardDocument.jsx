import { Document, Page, View } from '@react-pdf/renderer';
import './fonts.js';
import { PAGE_SIZES, BLEED_PT, A4, SHEET_GRID } from './constants.js';
import CropMarks from './CropMarks.jsx';
import TemplateMinimal from './templates/TemplateMinimal.jsx';
import TemplateModern from './templates/TemplateModern.jsx';
import TemplateElegant from './templates/TemplateElegant.jsx';
import TemplateContrast from './templates/TemplateContrast.jsx';
import TemplateBandeau from './templates/TemplateBandeau.jsx';
import TemplateBicolore from './templates/TemplateBicolore.jsx';
import TemplateLigne from './templates/TemplateLigne.jsx';
import TemplateCadre from './templates/TemplateCadre.jsx';

const TEMPLATE_COMPONENTS = {
  minimal: TemplateMinimal,
  modern: TemplateModern,
  elegant: TemplateElegant,
  contrast: TemplateContrast,
  bandeau: TemplateBandeau,
  bicolore: TemplateBicolore,
  ligne: TemplateLigne,
  cadre: TemplateCadre,
};

const GUIDE_COLOR = '#9CA3AF';
const GUIDE_WIDTH = 0.5;

// Planche A4 : grille de cartes bord à bord (une ligne = un seul coup de
// ciseaux, pas de chutes). Les lignes de guidage traversent toute la page
// et tombent exactement sur les frontières entre cartes.
function Sheet({ Template, templateProps, title, author }) {
  const [pageW, pageH] = A4;
  const { cols, rows } = SHEET_GRID;
  const [cardW, cardH] = PAGE_SIZES.maison;
  const marginX = (pageW - cols * cardW) / 2;
  const marginY = (pageH - rows * cardH) / 2;

  const cards = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cards.push(
        <View
          key={`${r}-${c}`}
          style={{
            position: 'absolute',
            left: marginX + c * cardW,
            top: marginY + r * cardH,
            width: cardW,
            height: cardH,
          }}
        >
          <Template {...templateProps} />
        </View>,
      );
    }
  }

  // Lignes de découpe, dessinées par-dessus les cartes pour rester
  // visibles même sur les templates à fond coloré.
  const guides = [];
  for (let c = 0; c <= cols; c++) {
    guides.push(
      <View
        key={`v-${c}`}
        style={{
          position: 'absolute',
          left: marginX + c * cardW - GUIDE_WIDTH / 2,
          top: 0,
          width: GUIDE_WIDTH,
          height: pageH,
          backgroundColor: GUIDE_COLOR,
        }}
      />,
    );
  }
  for (let r = 0; r <= rows; r++) {
    guides.push(
      <View
        key={`h-${r}`}
        style={{
          position: 'absolute',
          left: 0,
          top: marginY + r * cardH - GUIDE_WIDTH / 2,
          width: pageW,
          height: GUIDE_WIDTH,
          backgroundColor: GUIDE_COLOR,
        }}
      />,
    );
  }

  return (
    <Document title={title} author={author} creator="Carte-de-visite-generator">
      <Page size="A4">
        {cards}
        {guides}
      </Page>
    </Document>
  );
}

// Composant racine du PDF : choisit le format de page (maison/pro/planche)
// et le template, et superpose les traits de coupe en format pro.
export default function CardDocument({
  data,
  template,
  format,
  qrDataUrl,
  accent,
  logo,
}) {
  const size = PAGE_SIZES[format] ?? PAGE_SIZES.maison;
  const bleed = format === 'pro' ? BLEED_PT : 0;
  const Template = TEMPLATE_COMPONENTS[template] ?? TemplateMinimal;
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ');
  const title = `Carte de visite — ${fullName || 'sans nom'}`;

  if (format === 'planche') {
    return (
      <Sheet
        Template={Template}
        templateProps={{ data, bleed: 0, qrDataUrl, accent, logo }}
        title={`${title} (planche A4)`}
        author={fullName}
      />
    );
  }

  return (
    <Document title={title} author={fullName} creator="Carte-de-visite-generator">
      <Page size={size}>
        <Template
          data={data}
          bleed={bleed}
          qrDataUrl={qrDataUrl}
          accent={accent}
          logo={logo}
        />
        {bleed > 0 && (
          <CropMarks pageWidth={size[0]} pageHeight={size[1]} bleed={bleed} />
        )}
      </Page>
    </Document>
  );
}

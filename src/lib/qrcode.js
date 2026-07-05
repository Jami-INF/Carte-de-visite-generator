import QRCode from 'qrcode';

// Construit une vCard 3.0 à partir des données du formulaire.
export function buildVCard(data) {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${data.lastName || ''};${data.firstName || ''};;;`,
    `FN:${[data.firstName, data.lastName].filter(Boolean).join(' ')}`,
  ];
  if (data.company) lines.push(`ORG:${data.company}`);
  if (data.role) lines.push(`TITLE:${data.role}`);
  if (data.phone) lines.push(`TEL;TYPE=CELL:${data.phone}`);
  if (data.email) lines.push(`EMAIL:${data.email}`);
  if (data.website) lines.push(`URL:${data.website}`);
  if (data.address) lines.push(`ADR;TYPE=WORK:;;${data.address};;;;`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

// Normalise l'URL du site (ajoute https:// si absent) pour un QR scannable.
export function normalizeUrl(url) {
  const trimmed = (url || '').trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

// Construit le contenu du QR selon le mode choisi.
// - vcard : contact complet (dense → beaucoup de modules)
// - website : simple URL (peu de modules → bien plus facile à scanner)
// - none / contenu vide : pas de QR
function qrPayload(data, mode) {
  if (mode === 'vcard') return buildVCard(data);
  if (mode === 'website') return normalizeUrl(data.website) || null;
  return null;
}

// Génère le QR code en Data URL (PNG) : react-pdf ne supporte pas les
// SVG complexes, on passe donc une image bitmap haute résolution à <Image>.
// Renvoie `null` quand il n'y a rien à encoder (mode « aucun » ou site vide).
export async function generateQrDataUrl(data, mode = 'vcard') {
  const payload = qrPayload(data, mode);
  if (!payload) return null;
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: 'M',
    // Petite marge intégrée : garantit une zone de silence minimale même
    // si la plaque blanche du template était retirée un jour.
    margin: 1,
    width: 640, // haute résolution → net à l'impression, même agrandi
    color: { dark: '#0B2C49', light: '#FFFFFF' },
  });
}

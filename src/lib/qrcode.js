import QRCode from 'qrcode';

// Construit une vCard 3.0 à partir des données du formulaire.
export function buildVCard(data) {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${data.lastName || ''};${data.firstName || ''};;;`,
    `FN:${[data.firstName, data.lastName].filter(Boolean).join(' ')}`,
  ];
  if (data.role) lines.push(`TITLE:${data.role}`);
  if (data.phone) lines.push(`TEL;TYPE=CELL:${data.phone}`);
  if (data.email) lines.push(`EMAIL:${data.email}`);
  if (data.website) lines.push(`URL:${data.website}`);
  if (data.address) lines.push(`ADR;TYPE=WORK:;;${data.address};;;;`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

// Génère le QR code en Data URL (PNG) : react-pdf ne supporte pas les
// SVG complexes, on passe donc une image bitmap haute résolution à <Image>.
export async function generateQrDataUrl(data) {
  const vcard = buildVCard(data);
  return QRCode.toDataURL(vcard, {
    errorCorrectionLevel: 'M',
    margin: 0,
    width: 512, // suffisamment dense pour rester net à l'impression
    color: { dark: '#0B2C49', light: '#FFFFFF' },
  });
}

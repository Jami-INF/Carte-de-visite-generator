// Toutes les dimensions PDF sont en points (1 mm = 2.83465 pt).
export const MM_TO_PT = 2.83465;

// 3 mm de fond perdu de chaque côté pour l'impression pro.
export const BLEED_MM = 3;
export const BLEED_PT = BLEED_MM * MM_TO_PT; // ≈ 8.5 pt

// Formats de page (largeur x hauteur, en points PDF).
export const PAGE_SIZES = {
  // 85 x 55 mm net — impression maison.
  maison: [240.94, 155.9],
  // 91 x 61 mm — 85x55 + 3 mm de fond perdu sur chaque bord.
  pro: [257.95, 172.91],
};

export const FORMATS = {
  maison: { label: 'Impression Maison', detail: '85 × 55 mm net' },
  pro: { label: 'Impression Pro', detail: '91 × 61 mm — fond perdu + traits de coupe' },
  planche: { label: 'Planche A4', detail: '10 cartes 85 × 55 mm à découper' },
};

// Planche : grille de cartes « maison » bord à bord sur une page A4
// portrait, à découper aux ciseaux en suivant les lignes de guidage.
export const A4 = [595.28, 841.89];
export const SHEET_GRID = { cols: 2, rows: 5 };

// Contenu du QR code sur les templates qui en affichent un (Moderne,
// Contraste). « website » est bien moins dense qu'une vCard → plus lisible.
export const QR_MODES = {
  vcard: { label: 'Contact', detail: 'vCard complète' },
  website: { label: 'Site web', detail: 'lien vers le site' },
  none: { label: 'Aucun', detail: 'pas de QR code' },
};
export const DEFAULT_QR_MODE = 'vcard';

export const TEMPLATES = {
  minimal: { label: 'Minimaliste' },
  modern: { label: 'Moderne' },
  elegant: { label: 'Élégant' },
  contrast: { label: 'Contraste' },
};

// Couleur d'accent par défaut + presets proposés dans l'UI.
export const DEFAULT_ACCENT = '#0F4C81';
export const ACCENT_PRESETS = [
  '#0F4C81', // bleu
  '#B91C1C', // rouge
  '#065F46', // vert
  '#7C3AED', // violet
  '#C2410C', // orange
  '#111827', // noir
];

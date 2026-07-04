# Générateur de cartes de visite

Générateur de cartes de visite 100 % côté client (zéro backend) : formulaire,
aperçu en temps réel, export **PDF vectoriel** prêt pour l'impression.

## Stack

- **Vite + React** — interface
- **Tailwind CSS v4** — styling de l'UI web
- **@react-pdf/renderer** — génération du PDF (texte vectoriel, dimensions au point près)
- **qrcode** — QR code vCard inséré en Data URL dans le PDF

## Formats d'impression

| Format | Dimensions | Usage |
|--------|-----------|-------|
| Maison | 85 × 55 mm net (240.94 × 155.90 pt) | impression personnelle |
| Pro | 91 × 61 mm (257.95 × 172.91 pt) | fond perdu 3 mm + traits de coupe, pour imprimeur |

## Templates

- **Minimaliste** — épuré, centré, texte noir/gris
- **Moderne** — bloc de couleur latéral + QR code vCard scannable

## Développement

```bash
npm install
npm run dev     # serveur de dev
npm run build   # build de production (dist/)
```

## Architecture

```
src/
├── components/
│   ├── Form.jsx            # formulaire (champs, style, format)
│   └── Preview.jsx         # <PDFViewer> + <PDFDownloadLink>
├── pdf/
│   ├── CardDocument.jsx    # racine du PDF (page, format, template)
│   ├── CropMarks.jsx       # traits de coupe (format pro)
│   ├── constants.js        # dimensions en points, fond perdu
│   ├── fonts.js            # Font.register (Roboto TTF)
│   └── templates/
│       ├── TemplateMinimal.jsx
│       └── TemplateModern.jsx
├── hooks/useDebounce.js    # évite de re-générer le PDF à chaque frappe
└── lib/qrcode.js           # vCard + QR code en Data URL
```

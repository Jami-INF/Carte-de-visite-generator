# Générateur de cartes de visite

Générateur de cartes de visite 100 % côté client (zéro backend) : formulaire,
aperçu en temps réel, export **PDF vectoriel** prêt pour l'impression.

https://jami-inf.github.io/Carte-de-visite-generator/

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
| Planche A4 | 10 cartes 85 × 55 mm (grille 2 × 5) | impression maison en série — cartes bord à bord, lignes de découpe pleine page à suivre aux ciseaux |

## Templates

- **Minimaliste** — épuré, centré, texte noir/gris (volontairement monochrome)
- **Moderne** — bloc de couleur latéral (logo ou initiales) + QR code vCard scannable
- **Élégant** — serif classique (PT Serif), centré, double filet couleur
- **Contraste** — aplat de couleur pleine page, texte blanc, QR code

## Personnalisation

- **Couleur d'accent** : presets + color picker libre (tous les templates sauf Minimaliste)
- **Logo / image** : import PNG, JPEG, WebP ou SVG — normalisé en PNG ≤ 600 px
  via canvas (react-pdf ne supporte que PNG/JPEG), puis recadré au centre
  (`objectFit: cover`) dans une zone propre à chaque template : pastille ronde
  (Minimaliste, Élégant), pleine colonne (Moderne), vignette sur plaque
  blanche (Contraste)
- **Code QR** (templates Moderne & Contraste) : au choix _Contact_ (vCard
  complète), _Site web_ (simple lien — bien moins dense, donc plus facile à
  scanner) ou _Aucun_. Agrandi et posé sur une plaque blanche (zone de
  silence) pour rester lisible à l'impression

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

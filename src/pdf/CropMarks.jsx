import { View } from '@react-pdf/renderer';

const MARK_THICKNESS = 0.5;
const GAP = 2; // écart entre le trait et le coin de coupe

// Traits de coupe : aux quatre coins, deux hairlines par coin, alignés sur
// la ligne de coupe (à `bleed` pt du bord de page) et dessinés dans la zone
// de fond perdu.
export default function CropMarks({ pageWidth, pageHeight, bleed }) {
  const len = bleed - GAP; // longueur d'un trait (reste dans le fond perdu)
  const marks = [];

  // Pour chaque coin : [ancrage horizontal, ancrage vertical]
  const corners = [
    { h: { left: 0 }, v: { top: 0 }, x: { left: bleed - MARK_THICKNESS / 2 }, y: { top: bleed - MARK_THICKNESS / 2 } },
    { h: { right: 0 }, v: { top: 0 }, x: { right: bleed - MARK_THICKNESS / 2 }, y: { top: bleed - MARK_THICKNESS / 2 } },
    { h: { left: 0 }, v: { bottom: 0 }, x: { left: bleed - MARK_THICKNESS / 2 }, y: { bottom: bleed - MARK_THICKNESS / 2 } },
    { h: { right: 0 }, v: { bottom: 0 }, x: { right: bleed - MARK_THICKNESS / 2 }, y: { bottom: bleed - MARK_THICKNESS / 2 } },
  ];

  corners.forEach((c, i) => {
    // Trait horizontal (dans la marge gauche/droite, sur la ligne de coupe)
    marks.push(
      <View
        key={`h-${i}`}
        style={{
          position: 'absolute',
          ...c.h,
          ...c.y,
          width: len,
          height: MARK_THICKNESS,
          backgroundColor: '#000000',
        }}
      />,
    );
    // Trait vertical (dans la marge haut/bas, sur la ligne de coupe)
    marks.push(
      <View
        key={`v-${i}`}
        style={{
          position: 'absolute',
          ...c.v,
          ...c.x,
          width: MARK_THICKNESS,
          height: len,
          backgroundColor: '#000000',
        }}
      />,
    );
  });

  return <>{marks}</>;
}

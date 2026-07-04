import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { DEFAULT_ACCENT } from '../constants.js';

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#FFFFFF' },
  // Cadre couleur inséré à l'intérieur de la zone de coupe.
  frame: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: { width: 26, height: 26, borderRadius: 13, objectFit: 'cover' },
  center: { alignItems: 'center' },
  name: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 1,
    color: '#111827',
    textAlign: 'center',
  },
  divider: { width: 24, height: 2, marginTop: 8, marginBottom: 8 },
  role: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 6.5,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: '#6B7280',
    textAlign: 'center',
  },
  footer: { alignItems: 'center' },
  contactLine: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 6.5,
    color: '#44403C',
    textAlign: 'center',
    marginTop: 1.5,
  },
});

// Design cadre : un filet de couleur encadre toute la carte, contenu
// centré, coordonnées au pied. Le logo (s'il existe) coiffe le nom.
export default function TemplateCadre({
  data,
  bleed = 0,
  accent = DEFAULT_ACCENT,
  logo,
}) {
  return (
    <View style={[styles.card, { padding: bleed + 8 }]}>
      <View style={[styles.frame, { borderColor: accent }]}>
        <View>{logo ? <Image src={logo.url} style={styles.logo} /> : null}</View>

        <View style={styles.center}>
          <Text style={styles.name}>
            {[data.firstName, data.lastName].filter(Boolean).join(' ')}
          </Text>
          <View style={[styles.divider, { backgroundColor: accent }]} />
          {data.role ? <Text style={styles.role}>{data.role}</Text> : null}
        </View>

        <View style={styles.footer}>
          {[data.phone, data.email, data.website, data.address]
            .filter(Boolean)
            .map((value) => (
              <Text key={value} style={styles.contactLine}>
                {value}
              </Text>
            ))}
        </View>
      </View>
    </View>
  );
}

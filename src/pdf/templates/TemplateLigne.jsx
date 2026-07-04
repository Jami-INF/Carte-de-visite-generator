import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { DEFAULT_ACCENT } from '../constants.js';

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'space-between' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 20,
    color: '#111827',
  },
  // Barre couleur accent sous le nom : la signature graphique du template.
  bar: { height: 3, width: 42, marginTop: 9, marginBottom: 9 },
  role: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 8,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: '#6B7280',
  },
  logo: { width: 30, height: 30, borderRadius: 15, objectFit: 'cover' },
  contacts: { flexDirection: 'row', flexWrap: 'wrap' },
  contact: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 7,
    color: '#374151',
    marginRight: 12,
    marginBottom: 2,
  },
});

// Design typographique : grand nom aligné à gauche, barre de couleur, et
// coordonnées en une ligne aérée au pied. Beaucoup de blanc.
export default function TemplateLigne({
  data,
  bleed = 0,
  accent = DEFAULT_ACCENT,
  logo,
}) {
  return (
    <View
      style={[
        styles.card,
        {
          paddingTop: bleed + 18,
          paddingBottom: bleed + 16,
          paddingHorizontal: bleed + 18,
        },
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>
            {[data.firstName, data.lastName].filter(Boolean).join(' ')}
          </Text>
          <View style={[styles.bar, { backgroundColor: accent }]} />
          {data.role ? <Text style={styles.role}>{data.role}</Text> : null}
        </View>
        {logo ? <Image src={logo.url} style={styles.logo} /> : null}
      </View>

      <View style={styles.contacts}>
        {[data.phone, data.email, data.website, data.address]
          .filter(Boolean)
          .map((value) => (
            <Text key={value} style={styles.contact}>
              {value}
            </Text>
          ))}
      </View>
    </View>
  );
}

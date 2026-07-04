import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { DEFAULT_ACCENT } from '../constants.js';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Anneau couleur accent autour de la pastille (le cercle de l'image se
  // recadre lui-même, pas besoin de clipping du parent).
  logoRing: {
    width: 31,
    height: 31,
    borderRadius: 15.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    objectFit: 'cover',
  },
  name: {
    fontFamily: 'PT Serif',
    fontWeight: 400,
    fontSize: 15,
    color: '#1C1917',
    textAlign: 'center',
  },
  // double filet de part et d'autre du poste
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  rule: {
    width: 22,
    height: 0.6,
  },
  role: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 6.5,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: '#57534E',
    marginHorizontal: 8,
  },
  footer: {
    alignItems: 'center',
  },
  contactLine: {
    fontFamily: 'PT Serif',
    fontWeight: 400,
    fontSize: 6.5,
    color: '#44403C',
    textAlign: 'center',
  },
  address: {
    fontFamily: 'PT Serif',
    fontWeight: 400,
    fontSize: 6,
    color: '#A8A29E',
    textAlign: 'center',
    marginTop: 3,
  },
});

// Design élégant : serif classique, tout centré, logo en tête,
// double filet couleur accent autour du poste.
export default function TemplateElegant({
  data,
  bleed = 0,
  accent = DEFAULT_ACCENT,
  logo,
}) {
  const contact = [data.phone, data.email, data.website]
    .filter(Boolean)
    .join('   —   ');

  return (
    <View
      style={[
        styles.card,
        {
          paddingTop: bleed + 12,
          paddingBottom: bleed + 12,
          paddingHorizontal: bleed + 18,
        },
      ]}
    >
      <View style={styles.center}>
        {logo ? (
          <View style={[styles.logoRing, { backgroundColor: accent }]}>
            <Image src={logo.url} style={styles.logo} />
          </View>
        ) : null}
        <Text style={styles.name}>
          {[data.firstName, data.lastName].filter(Boolean).join(' ')}
        </Text>
        {data.role ? (
          <View style={styles.ruleRow}>
            <View style={[styles.rule, { backgroundColor: accent }]} />
            <Text style={styles.role}>{data.role}</Text>
            <View style={[styles.rule, { backgroundColor: accent }]} />
          </View>
        ) : null}
      </View>

      <View style={styles.footer}>
        {contact ? <Text style={styles.contactLine}>{contact}</Text> : null}
        {data.address ? (
          <Text style={styles.address}>{data.address}</Text>
        ) : null}
      </View>
    </View>
  );
}

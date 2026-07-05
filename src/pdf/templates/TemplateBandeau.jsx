import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { DEFAULT_ACCENT } from '../constants.js';

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#FFFFFF' },
  // Bandeau de couleur en tête : déborde dans le fond perdu (haut + côtés).
  band: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 15,
    color: '#FFFFFF',
  },
  role: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 7,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    opacity: 0.85,
    marginTop: 3,
  },
  company: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 8,
    color: '#FFFFFF',
    marginTop: 3,
  },
  logo: { width: 38, height: 38, borderRadius: 19, objectFit: 'cover' },
  body: { flex: 1, justifyContent: 'flex-end' },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  contactLine: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 7,
    color: '#374151',
    marginBottom: 3,
  },
  qrBox: { backgroundColor: '#FFFFFF', padding: 2, borderRadius: 2 },
  qr: { width: 52, height: 52 },
});

// Design bandeau : bloc de couleur horizontal en tête (nom + logo),
// coordonnées et QR sur fond blanc en dessous.
export default function TemplateBandeau({
  data,
  bleed = 0,
  qrDataUrl,
  accent = DEFAULT_ACCENT,
  logo,
}) {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.band,
          {
            backgroundColor: accent,
            paddingTop: bleed + 14,
            paddingBottom: 12,
            paddingLeft: bleed + 16,
            paddingRight: bleed + 16,
          },
        ]}
      >
        <View>
          <Text style={styles.name}>
            {[data.firstName, data.lastName].filter(Boolean).join(' ')}
          </Text>
          {data.company ? (
            <Text style={styles.company}>{data.company}</Text>
          ) : null}
          {data.role ? <Text style={styles.role}>{data.role}</Text> : null}
        </View>
        {logo ? <Image src={logo.url} style={styles.logo} /> : null}
      </View>

      <View
        style={[
          styles.body,
          {
            paddingTop: 12,
            paddingBottom: bleed + 12,
            paddingLeft: bleed + 16,
            paddingRight: bleed + 16,
          },
        ]}
      >
        <View style={styles.bottom}>
          <View>
            {[data.phone, data.email, data.website, data.address]
              .filter(Boolean)
              .map((value) => (
                <Text key={value} style={styles.contactLine}>
                  {value}
                </Text>
              ))}
          </View>
          {qrDataUrl ? (
            <View style={styles.qrBox}>
              <Image src={qrDataUrl} style={styles.qr} />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

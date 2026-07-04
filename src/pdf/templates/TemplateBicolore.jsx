import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { DEFAULT_ACCENT } from '../constants.js';

const styles = StyleSheet.create({
  card: { flex: 1, flexDirection: 'row', backgroundColor: '#FFFFFF' },
  // Moitié gauche colorée (déborde à gauche + haut + bas) portant le nom.
  left: { width: '46%', justifyContent: 'center' },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    objectFit: 'cover',
    marginBottom: 10,
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
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    opacity: 0.85,
    marginTop: 4,
  },
  right: { flex: 1, justifyContent: 'space-between' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  label: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 5.5,
    letterSpacing: 1,
    color: '#9CA3AF',
    width: 26,
  },
  value: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 7,
    color: '#374151',
    flex: 1,
  },
  qrBox: {
    backgroundColor: '#FFFFFF',
    padding: 2,
    borderRadius: 2,
    alignSelf: 'flex-end',
  },
  qr: { width: 40, height: 40 },
});

function ContactRow({ label, value }) {
  if (!value) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

// Design bicolore : la carte est coupée en deux verticalement — nom sur
// l'aplat de couleur à gauche, coordonnées + QR sur le blanc à droite.
export default function TemplateBicolore({
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
          styles.left,
          {
            backgroundColor: accent,
            paddingTop: bleed + 14,
            paddingBottom: bleed + 14,
            paddingLeft: bleed + 16,
            paddingRight: 14,
          },
        ]}
      >
        {logo ? <Image src={logo.url} style={styles.logo} /> : null}
        <Text style={styles.name}>
          {[data.firstName, data.lastName].filter(Boolean).join(' ')}
        </Text>
        {data.role ? <Text style={styles.role}>{data.role}</Text> : null}
      </View>

      <View
        style={[
          styles.right,
          {
            paddingTop: bleed + 14,
            paddingBottom: bleed + 14,
            paddingRight: bleed + 16,
            paddingLeft: 14,
          },
        ]}
      >
        <View>
          <ContactRow label="TÉL" value={data.phone} />
          <ContactRow label="MAIL" value={data.email} />
          <ContactRow label="WEB" value={data.website} />
          <ContactRow label="ADR" value={data.address} />
        </View>
        {qrDataUrl ? (
          <View style={styles.qrBox}>
            <Image src={qrDataUrl} style={styles.qr} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

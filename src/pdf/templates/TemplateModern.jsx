import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { DEFAULT_ACCENT } from '../constants.js';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  // Bloc de couleur : collé au bord gauche, il « déborde » naturellement
  // dans le fond perdu (haut, bas et gauche) en format pro.
  sidebar: {
    justifyContent: 'space-between',
  },
  // L'image remplit toute la colonne : recadrée au centre (cover),
  // elle déborde dans le fond perdu comme le bloc de couleur.
  sidebarPhoto: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: 'cover',
  },
  initials: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 20,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  initialsBar: {
    width: 16,
    height: 2,
    backgroundColor: '#7FB2D9',
    marginTop: 5,
  },
  qrBox: {
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  qr: {
    width: 52,
    height: 52,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 13,
    color: '#111827',
  },
  company: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 8,
    color: '#374151',
    marginTop: 2,
  },
  role: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 7,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginTop: 3,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3.5,
  },
  rowLabel: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 5.5,
    letterSpacing: 1,
    color: '#9CA3AF',
    width: 26,
  },
  rowValue: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 7,
    color: '#374151',
    flex: 1,
  },
});

function ContactRow({ label, value }) {
  if (!value) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

// Design moderne : bloc de couleur à gauche (logo ou initiales + QR code
// vCard), coordonnées détaillées à droite.
export default function TemplateModern({
  data,
  bleed = 0,
  qrDataUrl,
  accent = DEFAULT_ACCENT,
  logo,
}) {
  const initials = [data.firstName, data.lastName]
    .filter(Boolean)
    .map((s) => s[0].toUpperCase())
    .join('');

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.sidebar,
          {
            backgroundColor: accent,
            width: bleed + 86,
            paddingTop: bleed + 12,
            paddingBottom: bleed + 12,
            paddingLeft: bleed + 12,
            paddingRight: 12,
          },
        ]}
      >
        {logo ? <Image src={logo.url} style={styles.sidebarPhoto} /> : null}
        <View>
          {!logo ? (
            <>
              <Text style={styles.initials}>{initials}</Text>
              <View style={styles.initialsBar} />
            </>
          ) : null}
        </View>
        {qrDataUrl ? (
          <View style={styles.qrBox}>
            <Image src={qrDataUrl} style={styles.qr} />
          </View>
        ) : null}
      </View>

      <View
        style={[
          styles.main,
          {
            paddingTop: bleed + 12,
            paddingBottom: bleed + 12,
            paddingLeft: 14,
            paddingRight: bleed + 14,
          },
        ]}
      >
        <Text style={styles.name}>
          {[data.firstName, data.lastName].filter(Boolean).join(' ')}
        </Text>
        {data.company ? (
          <Text style={styles.company}>{data.company}</Text>
        ) : null}
        {data.role ? (
          <Text style={[styles.role, { color: accent }]}>{data.role}</Text>
        ) : null}
        <ContactRow label="TÉL" value={data.phone} />
        <ContactRow label="MAIL" value={data.email} />
        <ContactRow label="WEB" value={data.website} />
        <ContactRow label="ADR" value={data.address} />
      </View>
    </View>
  );
}

import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { DEFAULT_ACCENT } from '../constants.js';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: 16,
    color: '#FFFFFF',
  },
  role: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 7,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    opacity: 0.75,
    marginTop: 4,
  },
  // Vignette recadrée (cover) sur plaque blanche : reste visible quelle
  // que soit la couleur d'accent choisie.
  logoPlate: {
    backgroundColor: '#FFFFFF',
    padding: 2,
    borderRadius: 5,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 3,
    objectFit: 'cover',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  contactLine: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 6.5,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 2.5,
  },
  qrBox: {
    backgroundColor: '#FFFFFF',
    padding: 3,
    borderRadius: 2,
  },
  qr: {
    width: 32,
    height: 32,
  },
});

// Design contraste : aplat de couleur pleine page (déborde dans le fond
// perdu), texte blanc, logo en haut à droite, QR code en bas à droite.
export default function TemplateContrast({
  data,
  bleed = 0,
  qrDataUrl,
  accent = DEFAULT_ACCENT,
  logo,
}) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: accent,
          paddingTop: bleed + 14,
          paddingBottom: bleed + 14,
          paddingHorizontal: bleed + 16,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View>
          <Text style={styles.name}>
            {[data.firstName, data.lastName].filter(Boolean).join(' ')}
          </Text>
          {data.role ? <Text style={styles.role}>{data.role}</Text> : null}
        </View>
        {logo ? (
          <View style={styles.logoPlate}>
            <Image src={logo.url} style={styles.logo} />
          </View>
        ) : null}
      </View>

      <View style={styles.bottomRow}>
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
  );
}

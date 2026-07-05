import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';

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
  name: {
    fontFamily: 'Roboto',
    fontWeight: 300,
    fontSize: 15,
    letterSpacing: 2,
    color: '#111111',
    textAlign: 'center',
  },
  lastName: {
    fontWeight: 700,
  },
  // Pastille ronde : l'image est recadrée au centre (cover), jamais déformée.
  logo: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginBottom: 8,
    objectFit: 'cover',
  },
  divider: {
    width: 26,
    height: 1,
    backgroundColor: '#9CA3AF',
    marginTop: 8,
    marginBottom: 8,
  },
  role: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 7,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: '#6B7280',
    textAlign: 'center',
  },
  company: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 7,
    color: '#374151',
    textAlign: 'center',
    marginTop: 4,
  },
  footer: {
    alignItems: 'center',
  },
  contactLine: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 6.5,
    color: '#374151',
    textAlign: 'center',
  },
  address: {
    fontFamily: 'Roboto',
    fontWeight: 300,
    fontSize: 6,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 3,
  },
});

// Design épuré : tout est centré, texte noir/gris, un seul filet.
// `bleed` (en pt) est ajouté aux marges pour que le contenu reste dans la
// zone de coupe en format « pro » (0 en format « maison »).
// Volontairement monochrome : l'accent n'est pas utilisé ici.
export default function TemplateMinimal({ data, bleed = 0, logo }) {
  const contact = [data.phone, data.email, data.website]
    .filter(Boolean)
    .join('   ·   ');

  return (
    <View
      style={[
        styles.card,
        {
          paddingTop: bleed + 14,
          paddingBottom: bleed + 12,
          paddingHorizontal: bleed + 18,
        },
      ]}
    >
      <View style={styles.center}>
        {logo ? <Image src={logo.url} style={styles.logo} /> : null}
        <Text style={styles.name}>
          {data.firstName}{' '}
          <Text style={styles.lastName}>
            {(data.lastName || '').toUpperCase()}
          </Text>
        </Text>
        {data.role ? (
          <>
            <View style={styles.divider} />
            <Text style={styles.role}>{data.role}</Text>
          </>
        ) : null}
        {data.company ? (
          <Text style={styles.company}>{data.company}</Text>
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

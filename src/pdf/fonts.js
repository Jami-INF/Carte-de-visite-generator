import { Font } from '@react-pdf/renderer';

// Roboto en TTF statique (react-pdf ne supporte ni les WOFF2 ni les
// polices variables). URLs gstatic stables, utilisées par les exemples
// officiels de react-pdf.
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fBBc9.ttf',
      fontWeight: 300,
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf',
      fontWeight: 500,
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc9.ttf',
      fontWeight: 700,
    },
  ],
});

// PT Serif pour le template Élégant (TTF statiques, même contrainte).
Font.register({
  family: 'PT Serif',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/ptserif/v17/EJRVQgYoZZY2vCFuvDFRxL6ddjb-.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/ptserif/v17/EJRSQgYoZZY2vCFuvAnt65qVXSr3pNNB.ttf',
      fontWeight: 700,
    },
  ],
});

// Pas de césure automatique : sur une carte de visite, un mot coupé
// est toujours une erreur.
Font.registerHyphenationCallback((word) => [word]);

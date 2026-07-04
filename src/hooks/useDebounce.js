import { useEffect, useState } from 'react';

// Retourne `value` avec un retard de `delay` ms. Indispensable ici :
// <PDFViewer> re-génère tout le PDF à chaque changement de props, on ne
// veut donc pas le nourrir à chaque frappe au clavier.
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

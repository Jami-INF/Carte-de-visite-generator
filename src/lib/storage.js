// Sauvegarde du projet dans le navigateur (localStorage). Aucune donnée ne
// quitte l'appareil : c'est le pendant « vie privée » du zéro-backend.
const KEY = 'cvgen:project:v1';

// Lit le projet sauvegardé, ou null si absent / illisible (mode privé,
// quota, JSON corrompu…). Toujours tolérant : jamais d'exception à l'appelant.
export function loadProject() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

// Écrit le projet. Silencieux en cas d'échec (quota dépassé par un gros
// logo, stockage bloqué par le navigateur…) : la sauvegarde est un confort,
// jamais un point de blocage.
export function saveProject(project) {
  try {
    localStorage.setItem(KEY, JSON.stringify(project));
  } catch {
    /* stockage indisponible : on continue sans sauvegarder */
  }
}

// Efface la sauvegarde (bouton « Réinitialiser »).
export function clearProject() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}

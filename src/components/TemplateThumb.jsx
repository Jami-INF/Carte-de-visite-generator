// Vignette CSS légère qui imagine le rendu de chaque template (sans générer
// un vrai PDF, bien trop lourd à multiplier). Les zones colorées reflètent
// la couleur d'accent choisie ; les textes sont figurés par des barres.

// Barre grise (texte figuré). `light` = sur fond coloré → barre blanche.
function Bar({ w, h = 3, light = false, className = '' }) {
  return (
    <span
      className={`block rounded-full ${light ? 'bg-white/85' : 'bg-slate-300'} ${className}`}
      style={{ width: w, height: h }}
    />
  );
}

// Rendu miniature par template. `a` = accent.
function Inner({ id, a }) {
  switch (id) {
    case 'modern':
      return (
        <div className="flex h-full w-full">
          <div
            className="flex h-full w-[32%] flex-col justify-between p-1.5"
            style={{ backgroundColor: a }}
          >
            <Bar w="60%" h={5} light />
            <Bar w="70%" h={9} light />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 p-2">
            <Bar w="70%" h={4} />
            <Bar w="45%" h={2.5} />
            <span className="mt-1 flex flex-col gap-0.5">
              <Bar w="80%" h={2} />
              <Bar w="75%" h={2} />
              <Bar w="60%" h={2} />
            </span>
          </div>
        </div>
      );
    case 'contrast':
      return (
        <div
          className="flex h-full w-full flex-col justify-between p-2"
          style={{ backgroundColor: a }}
        >
          <span className="flex flex-col gap-1">
            <Bar w="65%" h={5} light />
            <Bar w="40%" h={2.5} light />
          </span>
          <span className="flex items-end justify-between">
            <span className="flex flex-col gap-0.5">
              <Bar w="70px" h={2} light />
              <Bar w="55px" h={2} light />
            </span>
            <span className="h-6 w-6 rounded-sm bg-white/90" />
          </span>
        </div>
      );
    case 'elegant':
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-white p-2">
          <Bar w="55%" h={4} />
          <span className="flex items-center gap-1">
            <span className="h-0.5 w-3 rounded" style={{ backgroundColor: a }} />
            <Bar w="30%" h={2.5} />
            <span className="h-0.5 w-3 rounded" style={{ backgroundColor: a }} />
          </span>
          <span className="mt-2 flex flex-col items-center gap-0.5">
            <Bar w="60%" h={2} />
            <Bar w="45%" h={2} />
          </span>
        </div>
      );
    case 'bandeau':
      return (
        <div className="flex h-full w-full flex-col bg-white">
          <div
            className="flex items-center justify-between p-2"
            style={{ backgroundColor: a, height: '44%' }}
          >
            <span className="flex flex-col gap-1">
              <Bar w="60px" h={5} light />
              <Bar w="40px" h={2.5} light />
            </span>
            <span className="h-6 w-6 rounded-full bg-white/90" />
          </div>
          <div className="flex flex-1 items-end justify-between p-2">
            <span className="flex flex-col gap-0.5">
              <Bar w="70px" h={2} />
              <Bar w="55px" h={2} />
            </span>
            <span className="h-6 w-6 rounded-sm bg-slate-300" />
          </div>
        </div>
      );
    case 'bicolore':
      return (
        <div className="flex h-full w-full bg-white">
          <div
            className="flex w-[46%] flex-col justify-center gap-1 p-2"
            style={{ backgroundColor: a }}
          >
            <Bar w="80%" h={5} light />
            <Bar w="55%" h={2.5} light />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-0.5 p-2">
            <Bar w="85%" h={2} />
            <Bar w="80%" h={2} />
            <Bar w="70%" h={2} />
            <Bar w="60%" h={2} />
          </div>
        </div>
      );
    case 'ligne':
      return (
        <div className="flex h-full w-full flex-col justify-between bg-white p-2">
          <span className="flex flex-col gap-1">
            <Bar w="70%" h={6} />
            <span className="h-1 w-6 rounded" style={{ backgroundColor: a }} />
            <Bar w="45%" h={2.5} />
          </span>
          <span className="flex gap-1.5">
            <Bar w="30%" h={2} />
            <Bar w="35%" h={2} />
          </span>
        </div>
      );
    case 'cadre':
      return (
        <div className="h-full w-full bg-white p-1">
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-1"
            style={{ border: `1.5px solid ${a}` }}
          >
            <Bar w="55%" h={4} />
            <span className="h-0.5 w-4 rounded" style={{ backgroundColor: a }} />
            <Bar w="35%" h={2.5} />
            <span className="mt-1 flex flex-col items-center gap-0.5">
              <Bar w="50%" h={2} />
              <Bar w="45%" h={2} />
            </span>
          </div>
        </div>
      );
    case 'minimal':
    default:
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-white p-2">
          <Bar w="55%" h={4} />
          <span className="h-px w-5 bg-slate-300" />
          <Bar w="35%" h={2.5} />
          <span className="mt-2 flex flex-col items-center gap-0.5">
            <Bar w="60%" h={2} />
            <Bar w="45%" h={2} />
          </span>
        </div>
      );
  }
}

export default function TemplateThumb({ id, label, accent, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      aria-pressed={selected}
      className={`group flex flex-col overflow-hidden rounded-lg border bg-white text-left transition ${
        selected
          ? 'border-sky-500 ring-2 ring-sky-200'
          : 'border-slate-300 hover:border-slate-400'
      }`}
    >
      {/* Ratio carte de visite 85×55 ≈ 1.545 */}
      <span className="block w-full overflow-hidden" style={{ aspectRatio: '85 / 55' }}>
        <Inner id={id} a={accent} />
      </span>
      <span
        className={`px-2 py-1.5 text-center text-xs font-medium ${
          selected ? 'text-sky-700' : 'text-slate-600'
        }`}
      >
        {label}
      </span>
    </button>
  );
}

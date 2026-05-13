function quadrilateralGridFigureMarkup() {
  return `
    <article class="quad-figure-card" aria-label="Quadrilateral grid figure">
      <svg class="quad-grid-svg" viewBox="0 0 300 300" role="img" aria-label="A square divided into four smaller squares with one diagonal from top-left to bottom-right">
        <rect x="30" y="30" width="240" height="240" fill="white" stroke="#172034" stroke-width="4" />
        <line x1="150" y1="30" x2="150" y2="270" stroke="#172034" stroke-width="4" />
        <line x1="30" y1="150" x2="270" y2="150" stroke="#172034" stroke-width="4" />
        <line x1="30" y1="30" x2="270" y2="270" stroke="#172034" stroke-width="4" />
      </svg>
    </article>
  `;
}

((root) => {
  root.sketches = root.sketches || {};
  Object.assign(root.sketches, {
    quadrilateralGridFigureMarkup
  });
})(window.CT8 = window.CT8 || {});

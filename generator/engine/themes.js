// Phase 3A visual theme tokens.
(function(){
  const E = window.TargilimEngine = window.TargilimEngine || {};
  E.themes = {
    // Professional, print-friendly palette: light slate fill, dark slate strokes,
    // deep blue for given data, restrained red only for the unknown.
    geometry: {
      fill:'#f1f5f9', stroke:'#334155', helper:'#94a3b8',
      unknown:'#dc2626', given:'#1d4ed8', label:'#0f172a', bg:'#ffffff'
    },
    print: {
      fill:'#ffffff', stroke:'#111827', helper:'#64748b',
      unknown:'#111827', given:'#111827', label:'#111827', bg:'#ffffff'
    }
  };
})();

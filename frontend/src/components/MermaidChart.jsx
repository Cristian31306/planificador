import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, ZoomOut, Maximize, Download } from 'lucide-react';

export default function MermaidChart({ chart, id }) {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1);

  const zoomIn = () => setScale(s => Math.min(s + 0.3, 3));
  const zoomOut = () => setScale(s => Math.max(s - 0.3, 0.4));
  const resetZoom = () => setScale(1);

  const downloadSvg = () => {
    if (!svg) return;
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diagrama-${id}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'default' });
    if (chart) {
      setError(null);
      setScale(1);
      mermaid.render(id, chart)
        .then(res => {
          setSvg(res.svg);
        })
        .catch(e => {
          console.error("Mermaid Render Error:", e);
          setError(e.message || 'Error renderizando diagrama');
        });
    }
  }, [chart, id]);
  
  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg border border-red-200 w-full overflow-x-auto">
        <p className="text-red-600 font-bold mb-2">Error en el diagrama:</p>
        <pre className="text-red-500 text-xs whitespace-pre-wrap">{error}</pre>
        <p className="text-slate-600 font-bold mt-4 mb-2">Código generado:</p>
        <pre className="text-slate-500 text-xs">{chart}</pre>
      </div>
    );
  }
  
  return (
    <div className="relative group border border-slate-100 rounded-xl bg-slate-50">
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button onClick={downloadSvg} className="p-1.5 text-slate-500 hover:text-cyan-600 hover:bg-slate-50 rounded" title="Descargar como SVG"><Download size={16}/></button>
        <div className="w-px h-4 bg-slate-200 mx-1"></div>
        <button onClick={zoomOut} className="p-1.5 text-slate-500 hover:text-cyan-600 hover:bg-slate-50 rounded" title="Alejar"><ZoomOut size={16}/></button>
        <button onClick={resetZoom} className="p-1.5 text-slate-500 hover:text-cyan-600 hover:bg-slate-50 rounded" title="Restaurar"><Maximize size={16}/></button>
        <button onClick={zoomIn} className="p-1.5 text-slate-500 hover:text-cyan-600 hover:bg-slate-50 rounded" title="Acercar"><ZoomIn size={16}/></button>
      </div>
      <style>{`.mermaid-wrapper svg { width: 100% !important; height: auto !important; max-width: none !important; }`}</style>
      <div className="overflow-x-auto w-full p-4 mermaid-wrapper">
        <div 
          className="transition-all duration-200 ease-out mx-auto" 
          style={{ width: `${scale * 100}%`, minWidth: `${scale * 800}px` }}
          dangerouslySetInnerHTML={{ __html: svg }} 
        />
      </div>
    </div>
  );
}

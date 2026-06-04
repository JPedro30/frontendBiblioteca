export default function DetalleLibro({ libro, volverInicio, irAEditar }) {
  
  const handleEliminar = () => {
    const confirmar = window.confirm(`¿Seguro que quieres eliminar "${libro.titulo}"?`);
    if (!confirmar) return;
    fetch(`http://localhost:8081/libros/${libro.idLibro}`, { method: 'DELETE' })
    .then(() => { alert("Libro eliminado"); volverInicio(); })
    .catch(error => console.error("Error al borrar:", error));
  };

  return (
    <div className="max-w-4xl mx-auto bg-zinc-900/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-purple-900/10 border border-purple-500/20 flex flex-col md:flex-row gap-10 mt-6">
      
      <div className="flex-1 text-zinc-200 flex flex-col gap-5">
        
        {/* Cabecera: Título, Autor y Saga */}
        <div>
          <h2 className="text-4xl font-black text-white">{libro.titulo}</h2>
          <h3 className="text-2xl text-purple-400 font-serif mt-2">por {libro.autor}</h3>
          
          {/* AHORA SE MUESTRA SIEMPRE: Si no hay saga, pone "Independiente" */}
          <span className="inline-block bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm font-bold mt-3 border border-purple-500/30">
            Saga: {libro.saga || 'Independiente'}
          </span>
        </div>
        
        {/* Bloque de datos cortos (Géneros, Dueños y Páginas) */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex-1 min-w-35">
            <span className="block font-bold text-purple-400 mb-1">Géneros</span> 
            <span className="text-zinc-300">{libro.genero && libro.genero.length > 0 ? libro.genero.join(', ') : 'No especificado'}</span>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex-1 min-w-35">
            <span className="block font-bold text-purple-400 mb-1">Dueños</span> 
            <span className="text-zinc-300">{libro.owner && libro.owner.length > 0 ? libro.owner.join(', ') : 'No especificado'}</span>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex-none w-32">
            <span className="block font-bold text-purple-400 mb-1">Páginas</span> 
            <span className="text-zinc-300">{libro.paginas || 'No especificado'}</span>
          </div>
        </div>

        {/* AHORA SE MUESTRA SIEMPRE LA SINOPSIS */}
        <div className="bg-zinc-800/30 p-4 rounded-xl border border-zinc-700/50 mt-2">
          <h4 className="font-bold text-purple-400 mb-2">Sinopsis</h4>
          <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
            {libro.sinopsis || 'No hay sinopsis disponible para este libro.'}
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-4 mt-auto pt-8">
          <button onClick={volverInicio} className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-zinc-300 font-bold transition-colors">Volver</button>
          <button onClick={irAEditar} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-bold shadow-lg shadow-purple-600/30 transition-colors">Editar Libro</button>
          <button onClick={handleEliminar} className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 rounded-lg text-white font-bold shadow-lg shadow-rose-600/30 transition-colors">Eliminar</button>
        </div>
      </div>

      <div className="w-64 h-96 bg-zinc-950 rounded-xl shadow-2xl shrink-0 flex items-center justify-center overflow-hidden border border-zinc-800 sticky top-24">
        {libro.urlPortada ? <img src={libro.urlPortada} alt="Portada" className="w-full h-full object-cover" /> : <span className="text-zinc-600 font-medium">Sin portada</span>}
      </div>
    </div>
  );
}
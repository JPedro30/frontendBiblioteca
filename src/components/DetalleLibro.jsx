export default function DetalleLibro({ libro, volverInicio, irAEditar }) {

  const handleEliminar = () => {
    const confirmar = window.confirm(`¿Seguro que quieres eliminar "${libro.titulo}"?`);
    if (!confirmar) return;
    fetch(`https://backendbiblioteca-j3k0.onrender.com/libros/${libro.idLibro}`, { method: 'DELETE' })
      .then(() => { alert("Libro eliminado"); volverInicio(); })
      .catch(error => console.error("Error al borrar:", error));
  };

  return (
    // FONDO PRINCIPAL: Pasamos de zinc-900 a amber-950 con sombras cálidas
    <div className="max-w-4xl mx-4 md:mx-auto bg-amber-950/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl shadow-amber-900/40 border border-amber-800/50 flex flex-col md:flex-row gap-8 md:gap-10 my-6">

      <div className="flex-1 text-amber-100 flex flex-col gap-5 order-2 md:order-1">

        {/* Cabecera: Título, Autor y Saga */}
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-amber-50 leading-tight">{libro.titulo}</h2>
          <h3 className="text-xl md:text-2xl text-amber-400 font-serif mt-2">por {libro.autor}</h3>

          {/* Renderizado de Estrellas de Valoración */}
          <div className="flex gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((estrella) => (
              <span
                key={estrella}
                className={`text-2xl transition-all ${(libro.valoracion || 0) >= estrella ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-amber-900/80'}`}
              >
                ★
              </span>
            ))}
          </div>

          <span className="inline-block bg-[#F4EBE1] text-amber-700 px-3 py-1 rounded-full text-sm font-bold mt-3 border border-amber-700/50">
            Saga: {libro.saga || 'Independiente'}
          </span>
        </div>

        {/* Bloque de datos cortos (Género, Dueño y Páginas) */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-[#F4EBE1] p-4 rounded-xl border border-amber-800/50 flex-1 min-w-35">
            <span className="block font-bold text-amber-700 mb-1">Género</span>
            <span className="text-amber-500">{libro.genero && libro.genero.length > 0 ? libro.genero.join(', ') : 'No especificado'}</span>
          </div>
          <div className="bg-[#F4EBE1] p-4 rounded-xl border border-amber-800/50 flex-1 min-w-35">
            <span className="block font-bold text-amber-700 mb-1">Dueño</span>
            <span className="text-amber-500">{libro.owner && libro.owner.length > 0 ? libro.owner.join(', ') : 'No especificado'}</span>
          </div>
          <div className="bg-[#F4EBE1] p-4 rounded-xl border border-amber-800/50 flex-none w-full md:w-32">
            <span className="block font-bold text-amber-700 mb-1">Páginas</span>
            <span className="text-amber-500">{libro.paginas || 'No especificado'}</span>
          </div>
        </div>

        {/* Sinopsis */}
        <div className="bg-[#F4EBE1] p-4 rounded-xl border border-amber-800/50 mt-2">
          <h4 className="font-bold text-amber-700 mb-2">Sinopsis</h4>
          <p className="text-amber-600 text-sm leading-relaxed whitespace-pre-wrap">
            {libro.sinopsis || 'No hay sinopsis disponible para este libro.'}
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-wrap gap-3 mt-auto pt-6">
          <button onClick={volverInicio} className="flex-1 md:flex-none px-5 py-2.5 bg-amber-900 hover:bg-amber-800 border border-amber-800 rounded-lg text-amber-200 font-bold transition-colors">
            Volver
          </button>
          <button onClick={irAEditar} className="flex-1 md:flex-none px-5 py-2.5 bg-amber-600 hover:bg-amber-500 rounded-lg text-amber-50 font-bold shadow-lg shadow-amber-600/30 transition-colors">
            Editar
          </button>
          <button onClick={handleEliminar} className="w-full md:w-auto px-5 py-2.5 bg-red-800 hover:bg-red-700 rounded-lg text-white font-bold shadow-lg shadow-red-900/30 transition-colors mt-2 md:mt-0">
            Eliminar
          </button>
        </div>
      </div>

      {/* PORTADA: Borde y fondo ámbar oscuro */}
      <div className="w-48 h-72 md:w-64 md:h-96 mx-auto bg-amber-950 rounded-xl shadow-2xl shrink-0 flex items-center justify-center overflow-hidden border border-amber-900 relative md:sticky md:top-24 order-1 md:order-2">
        {libro.urlPortada ? <img src={libro.urlPortada} alt="Portada" className="w-full h-full object-cover" /> : <span className="text-amber-800 font-medium">Sin portada</span>}
      </div>

    </div>
  );
}
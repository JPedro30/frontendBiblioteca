export default function DetalleLibro({ libro, volverInicio, irAEditar }) {

  const handleEliminar = () => {
    const confirmar = window.confirm(`¿Seguro que quieres eliminar "${libro.titulo}"?`);
    if (!confirmar) return;
    fetch(`https://backendbiblioteca-j3k0.onrender.com/libros/${libro.idLibro}`, { method: 'DELETE' })
      .then(() => { alert("Libro eliminado"); volverInicio(); })
      .catch(error => console.error("Error al borrar:", error));
  };

  return (
    // CAMBIO 1: Añadimos 'mx-4 md:mx-auto' para separar de las paredes en móvil y 'p-6 md:p-8' para ajustar el padding.
    <div className="max-w-4xl mx-4 md:mx-auto bg-zinc-900/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl shadow-purple-900/10 border border-purple-500/20 flex flex-col md:flex-row gap-8 md:gap-10 my-6">

      {/* CAMBIO 2: 'order-2 md:order-1' -> En móvil va debajo de la imagen, en PC va a la izquierda */}
      <div className="flex-1 text-zinc-200 flex flex-col gap-5 order-2 md:order-1">

        {/* Cabecera: Título, Autor y Saga */}
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">{libro.titulo}</h2>
          <h3 className="text-xl md:text-2xl text-purple-400 font-serif mt-2">por {libro.autor}</h3>

          {/* Renderizado de Estrellas de Valoración */}
          <div className="flex gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((estrella) => (
              <span
                key={estrella}
                className={`text-2xl transition-all ${(libro.valoracion || 0) >= estrella ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-zinc-800'}`}
              >
                ★
              </span>
            ))}
          </div>

          <span className="inline-block bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm font-bold mt-3 border border-purple-500/30">
            Saga: {libro.saga || 'Independiente'}
          </span>
        </div>

        {/* Bloque de datos cortos (Géneros, Dueños y Páginas) */}
        <div className="flex flex-wrap gap-4">
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex-1 min-w-35">
            <span className="block font-bold text-purple-400 mb-1">Género</span>
            <span className="text-zinc-300">{libro.genero && libro.genero.length > 0 ? libro.genero.join(', ') : 'No especificado'}</span>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex-1 min-w-35">
            <span className="block font-bold text-purple-400 mb-1">Dueño</span>
            <span className="text-zinc-300">{libro.owner && libro.owner.length > 0 ? libro.owner.join(', ') : 'No especificado'}</span>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex-none w-full md:w-32">
            <span className="block font-bold text-purple-400 mb-1">Páginas</span>
            <span className="text-zinc-300">{libro.paginas || 'No especificado'}</span>
          </div>
        </div>

        {/* Sinopsis */}
        <div className="bg-zinc-800/30 p-4 rounded-xl border border-zinc-700/50 mt-2">
          <h4 className="font-bold text-purple-400 mb-2">Sinopsis</h4>
          <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
            {libro.sinopsis || 'No hay sinopsis disponible para este libro.'}
          </p>
        </div>

        {/* Botones: flex-wrap para que bajen en móvil y w-full para ocupar todo el ancho si es necesario */}
        <div className="flex flex-wrap gap-3 mt-auto pt-6">
          <button onClick={volverInicio} className="flex-1 md:flex-none px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-zinc-300 font-bold transition-colors">
            Volver
          </button>
          <button onClick={irAEditar} className="flex-1 md:flex-none px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-bold shadow-lg shadow-purple-600/30 transition-colors">
            Editar
          </button>
          <button onClick={handleEliminar} className="w-full md:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-500 rounded-lg text-white font-bold shadow-lg shadow-rose-600/30 transition-colors mt-2 md:mt-0">
            Eliminar
          </button>
        </div>
      </div>

      {/* CAMBIO 3: 'order-1 md:order-2' -> En móvil va arriba del todo, en PC a la derecha. Ajustamos tamaño para móvil */}
      <div className="w-48 h-72 md:w-64 md:h-96 mx-auto bg-zinc-950 rounded-xl shadow-2xl shrink-0 flex items-center justify-center overflow-hidden border border-zinc-800 relative md:sticky md:top-24 order-1 md:order-2">
        {libro.urlPortada ? <img src={libro.urlPortada} alt="Portada" className="w-full h-full object-cover" /> : <span className="text-zinc-600 font-medium">Sin portada</span>}
      </div>

    </div>
  );
}
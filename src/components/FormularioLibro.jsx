import { useState } from 'react';

export default function FormularioLibro({ volverInicio, libroAEditar }) {
  
  const [datos, setDatos] = useState(
    libroAEditar ? {
      titulo: libroAEditar.titulo,
      autor: libroAEditar.autor,
      urlPortada: libroAEditar.urlPortada || '',
      genero: libroAEditar.genero ? libroAEditar.genero.join(', ') : '',
      owner: libroAEditar.owner ? libroAEditar.owner.join(', ') : '',
      sinopsis: libroAEditar.sinopsis || '',
      paginas: libroAEditar.paginas || '', 
      saga: libroAEditar.saga || '',        
      valoracion: libroAEditar.valoracion || 0
    } : {
      titulo: '', autor: '', urlPortada: '', genero: '', owner: '', sinopsis: '', paginas: '', saga: '', valoracion: ''
    }
  );

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const libroGuardar = {
      titulo: datos.titulo,
      autor: datos.autor,
      urlPortada: datos.urlPortada,
      genero: datos.genero ? datos.genero.split(',').map(g => g.trim()) : [],
      owner: datos.owner ? datos.owner.split(',').map(o => o.trim()) : [],
      sinopsis: datos.sinopsis,
      saga: datos.saga,
      paginas: datos.paginas ? parseInt(datos.paginas) : 0 ,
      valoracion: datos.valoracion
    };

    if (libroAEditar) libroGuardar.idLibro = libroAEditar.idLibro;
    const metodoHTTP = libroAEditar ? 'PUT' : 'POST';

    fetch('https://backendbiblioteca-j3k0.onrender.com/libros', {
      method: metodoHTTP,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(libroGuardar)
    })
      .then(() => {
        alert(libroAEditar ? "¡Libro actualizado!" : "¡Libro guardado!");
        volverInicio();
      })
      .catch(error => console.error("Error al guardar:", error));
  };

  return (
    // CAMBIO DE COLORES: amber-950, sombras y bordes ámbar.
    <div className="max-w-3xl mx-auto bg-amber-950/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl shadow-amber-900/40 mt-10 border border-amber-800/50">
      <h2 className="text-3xl font-bold bg-linear-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent mb-8 text-center drop-shadow-sm">
        {libroAEditar ? 'Editar Libro' : 'Añadir Nuevo Libro'}
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        <div>
          <label className="block text-amber-200/80 mb-2 text-sm font-medium">Título *</label>
          <input required type="text" name="titulo" value={datos.titulo} onChange={handleChange} className="w-full bg-[#F4EBE1] text-amber-50 rounded-lg p-3 outline-none border border-amber-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-amber-900/60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-amber-200/80 mb-2 text-sm font-medium">Autor *</label>
            <input required type="text" name="autor" value={datos.autor} onChange={handleChange} className="w-full bg-[#F4EBE1] text-amber-50 rounded-lg p-3 outline-none border border-amber-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-amber-900/60" />
          </div>
          <div>
            <label className="block text-amber-200/80 mb-2 text-sm font-medium">Saga</label>
            <input type="text" name="saga" value={datos.saga} onChange={handleChange} placeholder="Ej: Nacidos de la bruma" className="w-full bg-[#F4EBE1] text-amber-50 rounded-lg p-3 outline-none border border-amber-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-amber-900/60" />
          </div>
          <div>
            <label className="block text-amber-200/80 mb-2 text-sm font-medium">Géneros (Separados por coma) *</label>
            <input required type="text" name="genero" value={datos.genero} onChange={handleChange} placeholder="Fantasía, Drama" className="w-full bg-[#F4EBE1] text-amber-50 rounded-lg p-3 outline-none border border-amber-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-amber-900/60" />
          </div>
          <div>
            <label className="block text-amber-200/80 mb-2 text-sm font-medium">Dueños (Separados por coma) *</label>
            <input required type="text" name="owner" value={datos.owner} onChange={handleChange} placeholder="Susana, JPedro" className="w-full bg-[#F4EBE1] text-amber-50 rounded-lg p-3 outline-none border border-amber-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-amber-900/60" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-3">
            <label className="block text-amber-200/80 mb-2 text-sm font-medium">URL de la Portada *</label>
            <input required type="text" name="urlPortada" value={datos.urlPortada} onChange={handleChange} placeholder="https://..." className="w-full bg-[#F4EBE1] text-amber-50 rounded-lg p-3 outline-none border border-amber-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-amber-900/60" />
          </div>
          <div className="flex-1">
            <label className="block text-amber-200/80 mb-2 text-sm font-medium">Nº Páginas *</label>
            <input required type="number" name="paginas" value={datos.paginas} onChange={handleChange} min="1" className="w-full bg-[#F4EBE1] text-amber-50 rounded-lg p-3 outline-none border border-amber-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder:text-amber-900/60" />
          </div>
        </div>
        
        <div>
          <label className="block text-amber-200/80 mb-2 text-sm font-medium">Sinopsis</label>
          <textarea name="sinopsis" value={datos.sinopsis} onChange={handleChange} rows="4" placeholder="Escribe de qué trata el libro..."
            className="w-full bg-[#F4EBE1] text-amber-50 rounded-lg p-3 outline-none border border-amber-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none placeholder:text-amber-900/60" />
        </div>

        <div>
          <label className="block text-amber-200/80 mb-2 text-sm font-medium">Valoración</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((estrella) => (
              <button
                key={estrella}
                type="button"
                onClick={() => setDatos({ ...datos, valoracion: estrella })}
                className={`text-4xl transition-colors duration-200 hover:scale-110 active:scale-95 ${
                  datos.valoracion >= estrella ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-[#F4EBE1]'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6 mt-8">
          <button type="button" onClick={volverInicio} className="flex-1 bg-amber-900 hover:bg-amber-800 border border-amber-800 text-amber-200 font-bold py-3 px-4 rounded-lg transition-colors">Cancelar</button>
          <button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-500 text-amber-50 font-bold py-3 px-4 rounded-lg shadow-lg shadow-amber-600/30 transition-colors">Guardar</button>
        </div>
      </form>
    </div>
  );
}
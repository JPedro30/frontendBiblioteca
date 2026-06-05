// src/components/LibroCard.jsx

export default function LibroCard({ libro, onClick }) {
  return (
    // Ampliamos el ancho (w) y el alto (h) para tablet (sm) y ordenador (lg)
    <div onClick={onClick} className="flex flex-col justify-end border-b-10 border-amber-950 w-36 sm:w-48 lg:w-52 h-60 sm:h-72 lg:h-80 px-2 pb-1 relative group">
      
      {/* IMPORTANTE: Ampliamos también el alto del "libro" en sí (h-52 -> h-64 -> h-72) */}
      <div className="w-full h-52 sm:h-64 lg:h-72 bg-zinc-800 rounded-md shadow-lg flex items-center justify-center cursor-pointer group-hover:animate-slide-out-top transition-all duration-200 overflow-hidden border border-zinc-700 group-hover:border-amber-600/80 group-hover:shadow-yellow-600/80 relative">
        
        {libro.urlPortada ? (
          <img src={libro.urlPortada} alt={`Portada de ${libro.titulo}`} className="w-full h-full object-cover" />
        ) : (
          <span className="text-zinc-300 text-center font-sans text-sm font-semibold p-2 z-10">
            {libro.titulo}
          </span>
        )}

        {/* Mini-estrellas superpuestas con degradado oscuro para que destaquen siempre */}
        <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/90 via-black/40 to-transparent pt-6 pb-1.5 flex justify-center gap-0.5 z-20">
          {[1, 2, 3, 4, 5].map((estrella) => (
            <span
              key={estrella}
              className={`text-[10px] sm:text-xs transition-colors ${(libro.valoracion || 0) >= estrella ? 'text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.8)]' : 'text-white/20'}`}
            >
              ★
            </span>
          ))}
        </div>

      </div>

    </div>
  );
}
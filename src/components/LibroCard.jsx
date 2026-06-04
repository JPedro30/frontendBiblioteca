// src/components/LibroCard.jsx

export default function LibroCard({ libro, onClick }) {
  return (
    // Balda moderna oscura con sombra morada
    <div onClick={onClick} className="flex flex-col justify-end border-b-10 border-amber-950 w-36 sm:w-40 h-60 px-2 pb-1 relative group">
      
      {/* Añadimos iluminación morada en los bordes al hacer hover */}
      <div className="w-full h-52 bg-zinc-800 rounded-md shadow-lg flex items-center justify-center cursor-pointer group-hover:animate-tada transition-all duration-300 overflow-hidden border border-zinc-700 group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]">
        
        {libro.urlPortada ? (
          <img src={libro.urlPortada} alt={`Portada de ${libro.titulo}`} className="w-full h-full object-cover" />
        ) : (
          <span className="text-zinc-300 text-center font-sans text-sm font-semibold p-2">
            {libro.titulo}
          </span>
        )}

      </div>

    </div>
  );
}
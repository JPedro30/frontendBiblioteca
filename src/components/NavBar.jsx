// src/components/Navbar.jsx

export default function Navbar({ setVista }) {
  return (
    <nav className="bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50 border-b border-purple-900/30 text-zinc-100 px-4 md:px-8 py-4 shadow-lg shadow-purple-900/10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
      
      {/* Grupo de Logo y Texto */}
      <div 
        className="flex items-center gap-2 md:gap-3 cursor-pointer transition-transform duration-200 hover:scale-105" 
        onClick={() => setVista('estanteria')}
      >
        <img 
          src="/logoBiblio.png" 
          alt="Logo Biblioteca" 
          className="w-8 h-8 md:w-10 md:h-10 object-contain" 
        />
        {/* Texto más pequeño en móvil (text-xl) y normal en PC (md:text-2xl) */}
        <div className="text-xl md:text-2xl font-black tracking-widest bg-purple-600 bg-clip-text text-transparent text-center">
          Susana's Library
        </div>
      </div>

      {/* Menú de enlaces: flex-wrap por si no caben, y texto un pelín más pequeño en móvil */}
      <ul className="flex flex-wrap justify-center gap-4 md:gap-8 font-medium text-sm md:text-base">
        <li onClick={() => setVista('busqueda')} className="hover:text-purple-400 cursor-pointer transition-all duration-200">
          Buscador
        </li>
        <li onClick={() => setVista('formulario')} className="cursor-pointer transition-all duration-300 text-purple-400 hover:text-fuchsia-300 font-semibold">
          + Añadir Libro
        </li>
      </ul>

    </nav>
  );
}
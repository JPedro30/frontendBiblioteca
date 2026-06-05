// src/components/Navbar.jsx

export default function Navbar({ setVista }) {
  return (
    // 1. FONDO Y SOMBRAS: Cambiamos el zinc y el purple por tonos amber (madera oscura)
    <nav className="bg-amber-950/85 backdrop-blur-md sticky top-0 z-50 border-b border-amber-900/50 text-amber-50 px-4 md:px-8 py-4 shadow-lg shadow-amber-900/40 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">

      {/* Grupo de Logo y Texto */}
      <div
        className="flex items-center gap-6 md:gap-6 cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={() => setVista('estanteria')}
      >
        <img
          src="/logoLibrary.png"
          alt="Logo Biblioteca"
          className="w-12 h-12 mb-4 md:w-22 md:h-22 object-contain"
        />
        {/* 2. TÍTULO: Usamos un degradado dorado (de amber-400 a yellow-600) en lugar de morado */}
        <div className="text-xl md:text-4xl font-black tracking-widest bg-linear-to-r from-purple-100 to-yellow-600 bg-clip-text text-transparent text-center drop-shadow-sm">
          SUSANA'S LIBRARY
        </div>
      </div>

      {/* Menú de enlaces */}
      <ul className="flex flex-wrap justify-center gap-4 md:gap-8 font-medium text-base md:text-lg">
        
        {/* Enlace 1: Buscador */}
        <li 
          onClick={() => setVista('busqueda')} 
          // 3. HOVER: Cambiamos el hover:text-purple por hover:text-amber-400 (un amarillo cálido)
          className="flex flex-col items-center gap-0 hover:text-amber-400 cursor-pointer transition-all duration-200"
        >
          <img
            src="/buscarLibro.png"
            alt="Buscar"
            className="w-8 h-8 md:w-14 md:h-14 object-contain"
          />
          <span>Buscador</span>
        </li>
        
        {/* Enlace 2: Agregar Libro */}
        <li 
          onClick={() => setVista('formulario')} 
          // 4. COLORES BASE: Cambiamos el texto base y el hover a tonos ámbar
          className="flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 text-amber-500 hover:text-amber-300 font-semibold"
        >
          <img
            src="/agregarLibro.png"
            alt="Agregar"
            className="w-6 h-6 md:w-12 md:h-12 object-contain"
          />
          <span>Agregar Libro</span>
        </li>
        
      </ul>

    </nav>
  );
}
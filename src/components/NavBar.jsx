// src/components/Navbar.jsx

export default function Navbar({ setVista }) {
  return (
    // bg-zinc-950/80 y backdrop-blur crean un efecto cristal transparente
    <nav className="bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50 border-b border-purple-900/30 text-zinc-100 px-8 py-4 shadow-lg shadow-purple-900/10 flex justify-between items-center">
      
      {/* Texto con degradado morado a fucsia */}
      <div className="text-2xl font-black tracking-widest bg-linear-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent cursor-pointer" onClick={() => setVista('estanteria')}>
        BIBLIOTECA
      </div>

      <ul className="flex gap-8 font-medium">
        <li onClick={() => setVista('estanteria')} className="hover:text-purple-400 cursor-pointer transition-colors duration-300">
          Inicio
        </li>
        <li onClick={() => setVista('busqueda')} className="hover:text-purple-400 cursor-pointer transition-colors duration-300">
          Buscador
        </li>
        <li onClick={() => setVista('formulario')} className="cursor-pointer transition-colors duration-300 text-purple-400 hover:text-fuchsia-300 font-semibold">
          + Añadir Libro
        </li>
      </ul>

    </nav>
  );
}
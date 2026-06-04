// src/components/Navbar.jsx

export default function Navbar({ setVista }) {
  return (
    // bg-zinc-950/80 y backdrop-blur crean un efecto cristal transparente
    <nav className="bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50 border-b border-purple-900/30 text-zinc-100 px-8 py-4 shadow-lg shadow-purple-900/10 flex justify-between items-center">
      
      {/* Grupo de Logo y Texto (Ambos son clickeables) */}
      <div 
        className="flex items-center gap-3 cursor-pointer transition-transform duration-200 hover:scale-105" 
        onClick={() => setVista('estanteria')}
      >
        <img 
          src="/logoBiblio.png" 
          alt="Logo Biblioteca" 
          className="w-10 h-10 object-contain" 
        />
        <div className="text-2xl font-black tracking-widest bg-purple-600 bg-clip-text text-transparent">
          Susana's Library
        </div>
      </div>

      <ul className="flex gap-8 font-medium">
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
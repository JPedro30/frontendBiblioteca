// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css'
import NavBar from './components/NavBar'
import LibroCard from './components/LibroCard'
import FormularioLibro from './components/FormularioLibro'
import DetalleLibro from './components/DetalleLibro'
import BusquedaLibros from './components/BusquedaLibros'

function App() {
  const [vista, setVista] = useState('estanteria'); 
  const [libros, setLibros] = useState([]);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const [letraActiva, setLetraActiva] = useState('Todos');

  const abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  const cargarLibros = () => {
    let url = 'https://backendbiblioteca-j3k0.onrender.com/libros';
    if (letraActiva !== 'Todos') url = `https://backendbiblioteca-j3k0.onrender.com/libros/buscar/titulo/comienzo/${letraActiva}`;

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(datos => setLibros(datos))
      .catch(error => console.error("Error al cargar:", error));
  };

  useEffect(() => {
    if (vista === 'estanteria') cargarLibros();
  }, [vista, letraActiva]); 

  const verDetalle = (libro) => {
    setLibroSeleccionado(libro);
    setVista('detalle');
  };

  return (
    // Fondo moderno súper oscuro (zinc-950)
    <div className="min-h-screen bg-zinc-800 flex flex-col relative text-zinc-200">
      <NavBar setVista={setVista} />

      <main className="flex-1 w-full px-2 py-10 flex flex-col items-center">
        
        {vista === 'estanteria' && (
          <div className="w-full max-w-6xl flex flex-col min-h-full">
            
            {/* Aviso si la letra no tiene libros */}
            {libros.length === 0 && (
              <p className="text-center text-zinc-500 text-xl mb-10">
                No hay libros que empiecen por la letra "{letraActiva}".
              </p>
            )}

            {/* 1. LA ESTANTERÍA (Ahora está arriba) */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-12 mb-20">
              {libros.map((libro) => (
                <LibroCard key={libro.idLibro} libro={libro} onClick={() => verDetalle(libro)} />
              ))}
            </div>

            {/* 2. GLOSARIO A-Z (Ahora está abajo y flotante) */}
            <div className="sticky bottom-6 w-full max-w-4xl mx-auto z-40 mt-auto">
              <div className="no-scrollbar flex flex-nowrap overflow-x-auto justify-start xl:justify-center gap-2 bg-zinc-900/90 backdrop-blur-md p-3 rounded-2xl shadow-2xl shadow-purple-900/20 border border-purple-500/20">
                
                <button 
                  onClick={() => setLetraActiva('Todos')}
                  className={`px-5 py-2 font-bold rounded-xl transition-all ${letraActiva === 'Todos' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                >
                  Todos
                </button>

                <div className="w-px bg-zinc-700 mx-1"></div> 

                {abecedario.map((letra) => (
                  <button 
                    key={letra}
                    onClick={() => setLetraActiva(letra)}
                    className={`min-w-5 h-10 flex items-center justify-center font-bold rounded-xl transition-all ${letraActiva === letra ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                  >
                    {letra}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* RESTO DE VISTAS (Aquí no sale el glosario) */}
        {vista === 'detalle' && <DetalleLibro libro={libroSeleccionado} volverInicio={() => setVista('estanteria')} irAEditar={() => setVista('editar')} />}
        {vista === 'formulario' && <FormularioLibro volverInicio={() => setVista('estanteria')} />}
        {vista === 'editar' && <FormularioLibro volverInicio={() => setVista('estanteria')} libroAEditar={libroSeleccionado} />}
        {vista === 'busqueda' && <BusquedaLibros verDetalle={verDetalle} />}

      </main>
    </div>
  )
}

export default App
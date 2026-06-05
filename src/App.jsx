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
  const [cargando, setCargando] = useState(true);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const [letraActiva, setLetraActiva] = useState('Todos');

  const abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  const cargarLibros = () => {
    let url = 'https://backendbiblioteca-j3k0.onrender.com/libros';
    if (letraActiva !== 'Todos') url = `https://backendbiblioteca-j3k0.onrender.com/libros/buscar/titulo/comienzo/${letraActiva}`;

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(datos => setLibros(datos))
      .catch(error => console.error("Error al cargar:", error))
      .finally(() => {
      // Magia: El finally SIEMPRE se ejecuta al terminar, 
      // ya sea con éxito o con error. Aquí apagamos el spinner.
      setCargando(false);
    });
  };

  useEffect(() => {
    if (vista === 'estanteria') cargarLibros();
  }, [vista, letraActiva]); 

  const verDetalle = (libro) => {
    setLibroSeleccionado(libro);
    setVista('detalle');
  };

  return (
    // 1. EL FONDO: bg-[#F4EBE1] (pergamino/madera clara) y texto text-amber-950. Añadimos overflow-hidden.
    <div className="min-h-screen bg-[#F4EBE1] flex flex-col relative text-amber-950">
      
      {/* 2. LAS ENREDADERAS (Ajustadas para móvil y sin cortes) */}
      <div className="fixed top-0 left-0 w-60 md:w-60 lg:w-60 h-full bg-[url('/enredadera.png')] bg-size[100%_auto] bg-repeat-y opacity-80 pointer-events-none z-0"></div>
      <div className="fixed top-0 right-0 w-60 md:w-60 lg:w-60 h-full bg-[url('/enredadera.png')] bg-size[100%_auto] bg-repeat-y opacity-80 pointer-events-none z-0 scale-x-[-1]"></div>

      {/* 3. EL CONTENIDO PRINCIPAL (Con z-10 para estar por encima de las hojas) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar setVista={setVista} />

        <main className="flex-1 w-full px-2 py-10 flex flex-col items-center">
          
          {/* ⏳ ESTADO 1: CARGANDO LA ESTANTERÍA (Adaptado a tonos madera/dorados) */}
          {vista === 'estanteria' && cargando && (
            <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
              <div className="w-16 h-16 border-4 border-amber-900/20 border-t-amber-600 rounded-full animate-spin shadow-[0_0_15px_rgba(217,119,6,0.5)] mb-6"></div>
              
              <h2 className="text-2xl font-bold text-amber-700 animate-pulse mb-2">
                Despertando al servidor...
              </h2>
              <p className="text-amber-900/80 max-w-md">
                Como usamos un servidor gratuito, si no ha habido actividad reciente puede tardar unos <span className="text-amber-950 font-bold">50 segundos</span> en arrancar. ¡Gracias por la paciencia!
              </p>
            </div>
          )}

          {/* 📚 ESTADO 2: ESTANTERÍA CARGADA Y LISTA */}
          {vista === 'estanteria' && !cargando && (
            <div className="w-full max-w-400 flex flex-col min-h-full">
              
              {/* Aviso si la letra no tiene libros (color actualizado) */}
              {libros.length === 0 && (
                <p className="text-center text-amber-900/70 font-medium text-xl mb-10">
                  No hay libros que empiecen por la letra "{letraActiva}".
                </p>
              )}

              {/* 1. LA ESTANTERÍA */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-12 mb-20">
                {libros?.map((libro) => (
                  <LibroCard key={libro.idLibro} libro={libro} onClick={() => verDetalle(libro)} />
                ))}
              </div>

              {/* 2. GLOSARIO A-Z (Ahora usa colores de madera oscura y botones ámbar) */}
              <div className="sticky bottom-6 w-full max-w-4xl mx-auto z-40 mt-auto">
                <div className="no-scrollbar flex flex-nowrap overflow-x-auto justify-start xl:justify-center gap-2 bg-amber-950/85 backdrop-blur-md p-3 rounded-2xl shadow-2xl shadow-amber-950/40 border border-amber-800/50">
                  
                  <button 
                    onClick={() => setLetraActiva('Todos')}
                    className={`px-5 py-2 font-bold rounded-xl transition-all ${letraActiva === 'Todos' ? 'bg-amber-800 text-amber-50 shadow-lg shadow-amber-600/40 transition-colors duration-200 ease-in-out' : 'text-amber-200/70 hover:bg-amber-800 hover:text-amber-50'}`}
                  >
                    Todos
                  </button>

                  <div className="w-px bg-amber-800 mx-1"></div> 

                  {abecedario.map((letra) => (
                    <button 
                      key={letra}
                      onClick={() => setLetraActiva(letra)}
                      className={`min-w-5 h-10 flex items-center justify-center font-bold rounded-xl transition-all ${letraActiva === letra ? 'bg-amber-800 text-amber-50 shadow-lg shadow-amber-600/40 transition-colors duration-200 ease-in-out' : 'text-amber-200/70 hover:bg-amber-800 hover:text-amber-50'}`}
                    >
                      {letra}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* RESTO DE VISTAS (Aquí no sale el glosario ni afecta el cargando) */}
          {vista === 'detalle' && <DetalleLibro libro={libroSeleccionado} volverInicio={() => setVista('estanteria')} irAEditar={() => setVista('editar')} />}
          {vista === 'formulario' && <FormularioLibro volverInicio={() => setVista('estanteria')} />}
          {vista === 'editar' && <FormularioLibro volverInicio={() => setVista('estanteria')} libroAEditar={libroSeleccionado} />}
          {vista === 'busqueda' && <BusquedaLibros verDetalle={verDetalle} />}

        </main>
      </div>
    </div>
  )
}

export default App
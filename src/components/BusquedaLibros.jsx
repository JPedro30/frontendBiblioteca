// src/components/BusquedaLibros.jsx

import { useState, useEffect } from 'react';
import LibroCard from './LibroCard';

export default function BusquedaLibros({ verDetalle }) {
  const [filtroActivo, setFiltroActivo] = useState('titulo');
  const [listaAutores, setListaAutores] = useState([]);
  const [listaGeneros, setListaGeneros] = useState([]);
  
  // CORRECCIÓN 1: Declarar el estado que faltaba para los dueños
  const [listaOwners, setListaOwners] = useState([]); 
  
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  useEffect(() => {
    fetch('https://backendbiblioteca-j3k0.onrender.com/libros/buscar/autores')
      .then(res => res.json()).then(datos => setListaAutores(datos));
    fetch('https://backendbiblioteca-j3k0.onrender.com/libros/buscar/generos')
      .then(res => res.json()).then(datos => setListaGeneros(datos));
    
    // Ahora esta función de abajo ya existe gracias a la corrección 1
    fetch('https://backendbiblioteca-j3k0.onrender.com/libros/buscar/owners')
      .then(res => res.json()).then(datos => setListaOwners(datos));
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    if (!terminoBusqueda.trim()) return;

    let url = '';
    if (filtroActivo === 'titulo') url = `https://backendbiblioteca-j3k0.onrender.com/libros/buscar/titulo/${terminoBusqueda}`;
    if (filtroActivo === 'autor') url = `https://backendbiblioteca-j3k0.onrender.com/libros/buscar/autores/${terminoBusqueda}`;
    if (filtroActivo === 'genero') url = `https://backendbiblioteca-j3k0.onrender.com/libros/buscar/generos/${terminoBusqueda}`;
    if (filtroActivo === 'owner') url = `https://backendbiblioteca-j3k0.onrender.com/libros/buscar/owners/${terminoBusqueda}`;

    fetch(url)
      .then(res => res.json())
      .then(datos => {
        setResultados(datos);
        setBusquedaRealizada(true);
      })
      .catch(error => console.error("Error en la búsqueda:", error));
  };

  const cambiarFiltro = (nuevoFiltro) => {
    setFiltroActivo(nuevoFiltro);
    setTerminoBusqueda('');
    setResultados([]);
    setBusquedaRealizada(false);
  };

  return (
    // Añadimos px-4 para que no se pegue a los bordes en el móvil
    <div className="w-full flex flex-col items-center mt-6 px-4">
      
      {/* Contenedor del Buscador: w-full es clave */}
      <div className="bg-zinc-900/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-2xl shadow-purple-900/10 border border-purple-500/20 w-full max-w-2xl mb-12">
        
        {/* PESTAÑAS (Tabs): Añadimos flex-wrap y reducimos el texto en móvil */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 border-b border-zinc-700 pb-4">
          <button onClick={() => cambiarFiltro('titulo')} className={`px-2 md:px-4 py-2 font-bold text-sm md:text-base transition-colors ${filtroActivo === 'titulo' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-zinc-500 hover:text-zinc-300'}`}>
            Por Título
          </button>
          <button onClick={() => cambiarFiltro('autor')} className={`px-2 md:px-4 py-2 font-bold text-sm md:text-base transition-colors ${filtroActivo === 'autor' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-zinc-500 hover:text-zinc-300'}`}>
            Por Autor
          </button>
          <button onClick={() => cambiarFiltro('genero')} className={`px-2 md:px-4 py-2 font-bold text-sm md:text-base transition-colors ${filtroActivo === 'genero' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-zinc-500 hover:text-zinc-300'}`}>
            Por Género
          </button>
          <button onClick={() => cambiarFiltro('owner')} className={`px-2 md:px-4 py-2 font-bold text-sm md:text-base transition-colors ${filtroActivo === 'owner' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-zinc-500 hover:text-zinc-300'}`}>
            Por Dueño
          </button>
        </div>

        {/* FORMULARIO DE BÚSQUEDA DINÁMICO: En columna en móvil, fila en ordenador */}
        <form onSubmit={handleBuscar} className="flex flex-col md:flex-row gap-4">
          
          {filtroActivo === 'titulo' && (
            <input type="text" placeholder="Escribe el título..." value={terminoBusqueda} onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="flex-1 w-full bg-zinc-800 text-white rounded-xl p-3.5 outline-none border border-zinc-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" />
          )}

          {filtroActivo === 'autor' && (
            <select value={terminoBusqueda} onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="flex-1 w-full bg-zinc-800 text-white rounded-xl p-3.5 outline-none border border-zinc-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 cursor-pointer transition-all">
              <option value="" disabled>-- Selecciona un Autor --</option>
              {listaAutores.map((autor, index) => (
                <option key={index} value={autor}>{autor}</option>
              ))}
            </select>
          )}

          {filtroActivo === 'genero' && (
            <select value={terminoBusqueda} onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="flex-1 w-full bg-zinc-800 text-white rounded-xl p-3.5 outline-none border border-zinc-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 cursor-pointer transition-all">
              <option value="" disabled>-- Selecciona un Género --</option>
              {listaGeneros.map((genero, index) => (
                <option key={index} value={genero}>{genero}</option>
              ))}
            </select>
          )}

          {filtroActivo === 'owner' && (
            <select value={terminoBusqueda} onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="flex-1 w-full bg-zinc-800 text-white rounded-xl p-3.5 outline-none border border-zinc-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 cursor-pointer transition-all">
              <option value="" disabled>-- Selecciona un Dueño --</option>
              {listaOwners.map((owner, index) => (
                <option key={index} value={owner}>{owner}</option>
              ))}
            </select>
          )}

          <button type="submit" className="w-full md:w-auto bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-purple-600/30 transition-colors disabled:opacity-50 disabled:shadow-none" disabled={!terminoBusqueda}>
            Buscar
          </button>
        </form>
      </div>

      {/* ÁREA DE RESULTADOS */}
      <div className="w-full max-w-6xl">
        {busquedaRealizada && resultados.length === 0 && (
          <p className="text-center text-zinc-500 text-xl mt-10">No se han encontrado libros con esos criterios.</p>
        )}

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-12">
          {resultados.map((libro) => (
            <LibroCard key={libro.idLibro} libro={libro} onClick={() => verDetalle(libro)} />
          ))}
        </div>
      </div>

    </div>
  );
}
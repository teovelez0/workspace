import { useState, useEffect } from 'react';
import './App.css';

const tareasIniciales = [
  { id: 1, texto: 'Aprender React', categoria: 'estudio', completada: false },
  { id: 2, texto: 'Hacer ejercicio', categoria: 'salud', completada: true },
  { id: 3, texto: 'Leer un libro', categoria: 'ocio', completada: false },
  { id: 4, texto: 'Practicar debugging', categoria: 'general', completada: false },
];

function App() {
  const [tareas, setTareas] = useState(tareasIniciales);
  const [filtro, setFiltro] = useState('todas');
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log('App renderizada, contador:', contador);
  }, [contador]);

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'todas') return true;
    if (filtro === 'completadas') return tarea.completada === true;
    if (filtro === 'pendientes') return tarea.completada === false;
    return true;
  });

  function agregarTarea(texto) {
    const valor = texto.trim();
    if (!valor) return;

    setTareas((tareasActuales) => [
      ...tareasActuales,
      { id: Date.now(), texto: valor, categoria: 'general', completada: false },
    ]);
  }

  function completarTarea(id) {
    setTareas((tareasActuales) =>
      tareasActuales.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: true } : tarea
      )
    );
  }

  return (
    <div className="app">
      <h1>Mis Tareas</h1>

      <div className="filtros">
        <button onClick={() => setFiltro('todas')}>Todas</button>
        <button onClick={() => setFiltro('pendientes')}>Pendientes</button>
        <button onClick={() => setFiltro('completadas')}>Completadas</button>
      </div>

      <button className="contador-btn" onClick={() => setContador((actual) => actual + 1)}>
        Incrementar contador
      </button>
      <p className="contador">Contador: {contador}</p>

      <ul className="lista-tareas">
        {tareasFiltradas.map((tarea) => (
          <li key={tarea.id} className={tarea.completada ? 'completada' : ''}>
            <span>{tarea.texto}</span>
            <span className="categoria">{tarea.categoria.toUpperCase()}</span>
            <button onClick={() => completarTarea(tarea.id)}>✔</button>
          </li>
        ))}
      </ul>

      <AgregarTarea onAgregar={agregarTarea} />
      <RastreadorVentana />
      <PerfilUsuario />
    </div>
  );
}

function AgregarTarea({ onAgregar }) {
  const [texto, setTexto] = useState('');

  function manejarEnvio(e) {
    e.preventDefault();
    onAgregar(texto);
    setTexto('');
  }

  return (
    <form onSubmit={manejarEnvio} className="form-agregar">
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

function RastreadorVentana() {
  const [ancho, setAncho] = useState(() => window.innerWidth);

  useEffect(() => {
    const manejarResize = () => {
      setAncho(window.innerWidth);
    };

    window.addEventListener('resize', manejarResize);

    return () => {
      window.removeEventListener('resize', manejarResize);
    };
  }, []);

  return <p className="perfil">Ancho de ventana: {ancho}px</p>;
}

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelado = false;
    const timer = setTimeout(() => {
      if (cancelado) return;

      const exito = Math.random() > 0.5;

      if (exito) {
        setUsuario({ nombre: 'Estudiante React' });
      } else {
        setError('No se pudo cargar el usuario');
      }
    }, 1000);

    return () => {
      cancelado = true;
      clearTimeout(timer);
    };
  }, []);

  if (error) return <p className="perfil error">{error}</p>;
  if (!usuario) return <p className="perfil">Cargando perfil...</p>;

  return <p className="perfil">Perfil: {usuario.nombre}</p>;
}

export default App;

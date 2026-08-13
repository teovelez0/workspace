import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [mostrarReloj, setMostrarReloj] = useState(true);
  const [usuarioId, setUsuarioId] = useState(1);

  return (
    <div className="app">
      <h1>useEffect y Ciclo de Vida</h1>

      <section>
        <h2>1. Reloj con cleanup</h2>
        <button onClick={() => setMostrarReloj((valor) => !valor)}>
          {mostrarReloj ? 'Ocultar reloj' : 'Mostrar reloj'}
        </button>
        {mostrarReloj && <Reloj />}
      </section>

      <section>
        <h2>2. Contador automático</h2>
        <ContadorAutomatico />
      </section>

      <section>
        <h2>3. Ancho de ventana</h2>
        <RastreadorVentana />
      </section>

      <section>
        <h2>4. Perfil de usuario</h2>
        <div className="botones-usuario">
          <button onClick={() => setUsuarioId(1)}>Usuario 1</button>
          <button onClick={() => setUsuarioId(2)}>Usuario 2</button>
        </div>
        <PerfilUsuario id={usuarioId} />
      </section>

      <section>
        <h2>5. Experimento: fases del ciclo de vida</h2>
        <ExperimentoFases />
      </section>
    </div>
  );
}

function Reloj() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    console.log('⏰ Reloj montado');

    const id = setInterval(() => {
      setSegundos((valorActual) => {
        const nuevoValor = valorActual + 1;
        console.log('tick, segundos:', nuevoValor);
        return nuevoValor;
      });
    }, 1000);

    return () => {
      console.log('⏰ Reloj desmontado / cleanup');
      clearInterval(id);
    };
  }, []);

  return <p>Segundos: {segundos}</p>;
}

function ContadorAutomatico() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log('🧮 Efecto contador montado');

    const id = setInterval(() => {
      setContador((valorActual) => valorActual + 1);
      console.log('El contador se actualiza sin depender de un closure viejo');
    }, 1000);

    return () => {
      console.log('🧮 Cleanup contador');
      clearInterval(id);
    };
  }, []);

  return <p>Contador: {contador}</p>;
}

function RastreadorVentana() {
  const [ancho, setAncho] = useState(() => window.innerWidth);

  useEffect(() => {
    function manejarResize() {
      console.log('Resize detectado, ancho:', window.innerWidth);
      setAncho(window.innerWidth);
    }

    window.addEventListener('resize', manejarResize);

    return () => {
      console.log('Listener removido');
      window.removeEventListener('resize', manejarResize);
    };
  }, []);

  return <p>Ancho actual: {ancho}px</p>;
}

function PerfilUsuario({ id }) {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    console.log('Buscando datos del usuario', id);

    const nombres = { 1: 'Ana', 2: 'Luis' };
    setNombre(nombres[id] ?? 'Desconocido');

    return () => {
      console.log('Se cancela la carga previa del usuario', id);
    };
  }, [id]);

  return <p>Nombre: {nombre}</p>;
}

function ExperimentoFases() {
  const [clics, setClics] = useState(0);
  const esPrimeraVez = useRef(true);

  useEffect(() => {
    if (esPrimeraVez.current) {
      console.log('🟢 MONTADO');
      esPrimeraVez.current = false;
    } else {
      console.log('🔵 ACTUALIZADO, clics:', clics);
    }

    return () => {
      console.log('🔴 LIMPIEZA (antes del próximo efecto, o al desmontar)');
    };
  }, [clics]);

  return (
    <div>
      <p>Clics: {clics}</p>
      <button onClick={() => setClics((valorActual) => valorActual + 1)}>Clickeame</button>
    </div>
  );
}

export default App;

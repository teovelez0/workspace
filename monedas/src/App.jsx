import Estudiante from "./components/Estudiante";

function App() {
  return (
    <>
      <h1>Lista de Estudiantes</h1>

      <Estudiante nombre="mateo" edad={16} />
      <Estudiante nombre="miguel" edad={17} />
    </>
  );
}

export default App;
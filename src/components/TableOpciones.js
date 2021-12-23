import { useEffect, useState } from "react";
import hostApi from "../config/host";
function TableOpciones() {
  const [opciones, setOpciones] = useState([]);
  useEffect(() => {
    fetch(`${hostApi}/opcion`)
      .then((res) => res.json())
      .then((data) => {
        setOpciones(data.data);
      });
  });
  return (
    <>
      <table className='ui celled table'>
        <thead>
          <tr>
            <th>Pregunta</th>
            <th>Opcion</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          {opciones.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.pregunta}</td>
                <td>{e.opcion}</td>
                <td>{e.resultado === true ? "verdadero" : "incorrecto"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default TableOpciones;

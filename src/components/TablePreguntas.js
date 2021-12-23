import { useEffect, useState } from "react";
import hostApi from "../config/host";
function TablePreguntas() {
  const [preguntas, setPreguntas] = useState([]);
  useEffect(() => {
    fetch(`${hostApi}/pregunta`)
      .then((res) => res.json())
      .then((data) => {
        setPreguntas(data.data);
      });
  });
  return (
    <>
      <table className='ui celled table'>
        <thead>
          <tr>
            <th>Pregunta</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {preguntas.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.nombre}</td>
                <td>{e.categoria}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default TablePreguntas;

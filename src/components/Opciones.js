import { useEffect, useState } from "react";
import hostApi from "../config/host";

import Menu from "./menu";
import TableOpciones from "./TableOpciones";
function Opciones() {
  const [preguntas, setPreguntas] = useState([]);
  const [opcion, setOpcion] = useState("");
  const [pregunta, setPregunta] = useState(0);
  const [iscorrect, setIscorrect] = useState(false);
  const truty = true;
  const falsy = false;

  useEffect(() => {
    fetch(`${hostApi}/pregunta`)
      .then((res) => res.json())
      .then((data) => {
        setPreguntas(data.data);
      });
  });
  const handleChangeOpcion = (e) => {
    setOpcion(e.target.value);
  };
  const handleChangePregunta = (e) => {
    setPregunta(e.target.value);
  };
  const handleChangeIscorrect = (e) => {
    setIscorrect(e.target.value);
  };
  const handleSaveOpcion = () => {
    console.log(pregunta);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        nombre: opcion,
        pregunta: pregunta,
        resultado: iscorrect,
      }),
    };
    if (opcion.length > 0) {
      fetch(`${hostApi}/opcion`, options)
        .then((res) => res.json())
        .then((data) => {
          setOpcion("");
          setPregunta(0);
          setIscorrect(false);
          console.log(data);
        });
    } else {
      console.log("no iniciando");
    }
  };

  return (
    <>
      <Menu></Menu>
      <div className='ui container'>
        <TableOpciones></TableOpciones>
        <div className='ui form'>
          <div className='three fields'>
            <div className='field'>
              <label>Pregunta</label>
              <select onChange={handleChangePregunta}>
                <option value='0'> Seleccione pregunta</option>
                {preguntas.map((e) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.nombre}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='field'>
              <label>Opcion</label>
              <input
                value={opcion}
                onChange={handleChangeOpcion}
                type='text'
                placeholder='Opcion pregunta'></input>
            </div>
            <div className='field'>
              <label>Respuesta</label>
              <select onChange={handleChangeIscorrect}>
                <option value='0'>Seleccione opcion</option>
                <option value={truty}>Correcta</option>
                <option value={falsy}>Incorrecta</option>
              </select>
            </div>
          </div>
        </div>
        <button onClick={handleSaveOpcion} className='ui button' type='submit'>
          Guardar
        </button>
      </div>
    </>
  );
}

export default Opciones;

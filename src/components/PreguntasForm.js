import { useEffect, useState } from "react";
import Menu from "./menu";
import hostApi from "../config/host";
import TablePreguntas from "./TablePreguntas";
function PreguntasForm() {
  const [categorias, setCategorias] = useState([]);
  const [pregunta, setPregunta] = useState("");
  const [categoria, setCategoria] = useState(0);
  useEffect(() => {
    fetch(`${hostApi}/categoria`)
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data.data);
      });
  });
  const handleChangePregunta = (event) => {
    setPregunta(event.target.value);
  };
  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };

  const savePregunta = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ nombre: pregunta, categoria }),
    };
    if (pregunta.length > 0) {
      console.log("iniciando");
      fetch(`${hostApi}/pregunta`, options)
        .then((res) => res.json())
        .then((data) => {
          setPregunta("");
          setCategoria(0);
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
        <TablePreguntas></TablePreguntas>
        <div className='ui form'>
          <div className='two fields'>
            <div className='field'>
              <label>Pregunta</label>
              <input
                onChange={handleChangePregunta}
                type='text'
                value={pregunta}
                placeholder='Pregunta'></input>
            </div>
            <div className='field'>
              <label>Categoria</label>

              <select
                onChange={handleChangeCategoria}
                className='ui fluid dropdown'>
                <option value='0'>Seleccione una categoria</option>
                {categorias.map((e, index) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.nombre}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <button onClick={savePregunta} className='ui button' type='submit'>
          Guardar
        </button>
      </div>
    </>
  );
}

export default PreguntasForm;

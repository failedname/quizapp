import Menu from "./menu";
import hostApi from "../config/host";
import TableCategoria from "./TableCategoria";
import { useState, useEffect } from "react";
function Categoria() {
  const [categoria, setCategoria] = useState("");
  const [nivel, setNivel] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch(`${hostApi}/categoria`)
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data.data);
      });
  });

  const handleChangeName = (event) => {
    setCategoria(event.target.value);
  };
  const handleChangeNivel = (event) => {
    setNivel(event.target.value);
  };

  const saveCategoria = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ nombre: categoria, nivel }),
    };
    if (categoria.length > 0) {
      console.log("iniciando");
      fetch(`${hostApi}/categoria`, options)
        .then((res) => res.json())
        .then((data) => {
          setCategoria("");
          setNivel("");

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
        <TableCategoria categorias={categorias}></TableCategoria>
        <div className='ui form'>
          <div className='two fields'>
            <div className='field'>
              <label>Nombre Categoria</label>
              <input
                value={categoria}
                onChange={(e) => {
                  handleChangeName(e);
                }}
                type='text'
                placeholder='Nombre Categoria'></input>
            </div>
            <div className='field'>
              <label>Nivel Dificultad</label>
              <input
                value={nivel}
                onChange={(e) => {
                  handleChangeNivel(e);
                }}
                type='text'
                placeholder='Nivel Dificultad'></input>
            </div>
          </div>
        </div>
        <button onClick={saveCategoria} className='ui button' type='submit'>
          Guardar
        </button>
      </div>
    </>
  );
}

export default Categoria;

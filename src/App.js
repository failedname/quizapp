import { useState, useEffect } from "react";
import hostApi from "././config/host";
import Preguntas from "./components/preguntas";
import Menu from "./components/menu";
import { Link, Router, Routes, Route } from "react-router-dom";

function App() {
  const [ganador, setGanador] = useState(false);
  const [score, setScore] = useState(0);
  const [preguntas, setPreguntas] = useState([]);
  const [jugador, setJugador] = useState("");
  const [actualCategoria, setActualCategoria] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    fetch(`${hostApi}/categoria`)
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data.data);
      });
  }, []);
  const HandleRepeat = () => {
    setPlay(false);
    setGanador(false);
    setScore(0);
    setActualCategoria(0);
    setJugador("");
  };
  const handleRetiro = () => {
    setGanador(true);
  };
  const saveGanador = () => {
    console.log(ganador);
    const options = {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jugador, score }),
    };
    if (ganador) {
      console.log("iniciando");
      fetch(`${hostApi}/ganador`, options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      console.log("no iniciando");
    }
  };
  function handleSiguienteCategoria() {
    const siguienteCategoria = actualCategoria + 1;
    if (siguienteCategoria <= categorias.length) {
      setActualCategoria(siguienteCategoria);
      fetch(`${hostApi}/pregunta/${categorias[actualCategoria].id}`)
        .then((res) => res.json())
        .then((data) => {
          const ramdom =
            data.data[Math.floor(Math.random() * data.data.length)];
          const preguntas = [ramdom];
          setPreguntas(preguntas);
        });
    } else {
      setGanador(true);
    }
  }

  const handleOption = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      handleSiguienteCategoria();
    } else {
      setPlay(false);
      setScore(0);
      setJugador("");
    }
  };
  function saveJugador(event) {
    setJugador(event.target.value);
  }

  function handlePlay() {
    setPlay(true);

    handleSiguienteCategoria();
  }
  return (
    <>
      <Menu></Menu>
      <div className='ui container'>
        {play ? (
          <>
            {preguntas.map((element) => {
              return (
                <Preguntas
                  key={element.id}
                  pregunta={element}
                  handle={handleOption}
                  score={score}
                  jugador={jugador}
                  ganador={ganador}
                  handleretiro={handleRetiro}
                  handlerepeat={HandleRepeat}
                />
              );
            })}
          </>
        ) : (
          <div className='ui form'>
            <div className='field'>
              <label>Nombre</label>
              <input onChange={saveJugador} type='text'></input>
            </div>
            {jugador.length > 0 ? (
              <button onClick={handlePlay} className='ui button'>
                Jugar
              </button>
            ) : (
              <button className='ui button' disabled>
                Jugar
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

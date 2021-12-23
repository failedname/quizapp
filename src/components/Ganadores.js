import Menu from "./menu";
import Imagen from "../images/AvatarMaker.png";
import { useState, useEffect } from "react";
import hostApi from "../config/host";
function Ganadores() {
  const [ganadores, setGanadores] = useState([]);
  useEffect(() => {
    fetch(`${hostApi}/ganador`)
      .then((res) => res.json())
      .then((data) => {
        setGanadores(data.data);
      });
  }, []);
  return (
    <>
      <Menu></Menu>
      <div className='ui container'>
        <div className='ui three column grid'>
          {ganadores.map((e) => {
            return (
              <div className='column'>
                <div className='ui card'>
                  <div class='image'>
                    <img src={Imagen}></img>
                  </div>
                  <div className='content'>
                    <div className='header'>{e.nombre}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Ganadores;

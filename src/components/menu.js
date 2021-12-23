import { Link } from "react-router-dom";

function menu() {
  return (
    <>
      <div className='ui menu'>
        <Link to='/' className='header item'>
          QuizApp
        </Link>
        <Link to='/categoria' className='item'>
          Categoria
        </Link>
        <Link to='/pregunta' className='item'>
          preguntas
        </Link>
        <Link to='/opciones' className='item'>
          Opciones
        </Link>
        <Link to='/ganadores' className='item'>
          Ganadores
        </Link>

        <div className='right menu'>
          <a className='ui item'></a>
        </div>
      </div>
    </>
  );
}

export default menu;

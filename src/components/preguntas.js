import Respuestas from "./respuestas";

function preguntas(props) {
  const {
    pregunta,
    handle,
    score,
    jugador,
    ganador,
    handleretiro,
    handlerepeat,
  } = props;

  return (
    <>
      {ganador ? (
        <>
          <div className='ui ten wide column grid'>
            <div className='column'>
              <div className='ui card'>
                <div className='content'>
                  <div className='center aligned header'>
                    !!Has Ganado¡¡ Felicitaciones
                  </div>
                  <div className='center aligned description'>
                    <p>{score} Puntos</p>
                  </div>
                </div>
                <div className='extra content'>
                  <div className='center aligned author'>
                    <img
                      className='ui avatar image'
                      src='https://semantic-ui.com/images/avatar/small/matt.jpg'></img>
                    {jugador}
                  </div>
                </div>
                <div className='extra content'></div>
                <div className='ui buttons'>
                  <div className='ui basic green button' onClick={handlerepeat}>
                    Seguir Ganando
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='ui sixteen wide column grid'>
            <div className='column'>
              <div className='ui fluid card'>
                <div className='content'>
                  <div className='header'>{pregunta.nombre}</div>
                </div>
                <div className='extra content'>
                  <div className='ui  buttons'>
                    {pregunta.opciones.map((element) => {
                      return (
                        <Respuestas
                          key={element.id}
                          resultado={element.resultado}
                          nombre={element.nombre}
                          handle={handle}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='ui ten wide column grid'>
            <div className='column'>
              <div className='ui card'>
                <div className='content'>
                  <div className='center aligned header'>Puntos Obtenidos:</div>
                  <div className='center aligned description'>
                    <p>{score}</p>
                  </div>
                </div>
                <div className='extra content'>
                  <div className='center aligned author'>
                    <img
                      className='ui avatar image'
                      src='https://semantic-ui.com/images/avatar/small/matt.jpg'></img>
                    {jugador}
                  </div>
                </div>
                <div className='extra content'>
                  <div className='ui buttons'>
                    {score > 0 ? (
                      <div
                        onClick={handleretiro}
                        className='ui basic green button'>
                        Retirarse
                      </div>
                    ) : (
                      <div className='ui basic green button disabled '>
                        Retirarse
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default preguntas;

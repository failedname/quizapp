function respuestas(props) {
  const { nombre, resultado, handle } = props;
  return (
    <>
      <div
        onClick={() => {
          handle(resultado);
        }}
        className='ui basic green button'>
        {nombre}
      </div>
    </>
  );
}

export default respuestas;

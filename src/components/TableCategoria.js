function TableCategoria({ categorias }) {
  return (
    <>
      <table className='ui celled table'>
        <thead>
          <tr>
            <th>Nombre Categoria</th>
            <th>Nivel Dificultad</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.nombre}</td>
                <td>{e.nivel}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TableCategoria;

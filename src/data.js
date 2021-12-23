import { useState, useEffect } from "react";

function App() {
  const [question, setQuestion] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    fetch("http://127.0.0.1:4000/pregunta")
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data.data);
      });
  }, []);
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < question.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  if (question.length === 0) {
    return <h1>Cargando...</h1>;
  }
  return (
    <div>
      {showScore ? (
        <div className='ui card'>
          You scored {score} out of {question.length}
        </div>
      ) : (
        <>
          <div className='ui card'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{question.length}
            </div>
            <div className='ui card'>{question[currentQuestion].nombre}</div>
          </div>
          <div className='ui items'>
            <div className='items'>
              {question[currentQuestion].opciones.map((answerOption) => (
                <button
                  key={answerOption.id}
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.resultado)
                  }>
                  {answerOption.nombre}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

import { useState } from 'react';

export default function Questionario({ perguntas, onSubmit }) {
  const [respostas, setRespostas] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [perguntaAtual, setPerguntaAtual] = useState(0);

  const handleChange = (perguntaId, valor) => {
    setRespostas(prev => ({
      ...prev,
      [perguntaId]: valor
    }));
    if (errors[perguntaId]) {
      setErrors(prev => ({
        ...prev,
        [perguntaId]: ''
      }));
    }
  };

  const proximaPergunta = () => {
    const pergunta = perguntas[perguntaAtual];
    if (!respostas[pergunta.id]) {
      setErrors(prev => ({
        ...prev,
        [pergunta.id]: 'Por favor, responda esta pergunta antes de continuar'
      }));
      return;
    }
    setPerguntaAtual(prev => prev + 1);
  };

  const perguntaAnterior = () => {
    setPerguntaAtual(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pergunta = perguntas[perguntaAtual];
    if (!respostas[pergunta.id]) {
      setErrors(prev => ({
        ...prev,
        [pergunta.id]: 'Por favor, responda esta pergunta antes de enviar'
      }));
      return;
    }

    // Validar se todas as perguntas foram respondidas
    const perguntasNaoRespondidas = perguntas.filter(p => !respostas[p.id]);
    if (perguntasNaoRespondidas.length > 0) {
      alert('Por favor, responda todas as perguntas');
      return;
    }

    setLoading(true);
    try {
      // Formatar respostas para enviar à API
      const respostasFormatadas = perguntas.map(pergunta => ({
        pergunta: pergunta.pergunta,
        resposta: respostas[pergunta.id]
      }));
      await onSubmit(respostasFormatadas);
    } catch (error) {
      console.error('Erro ao enviar respostas:', error);
      alert('Erro ao processar suas respostas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!perguntas || perguntas.length === 0) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando perguntas...</p>
        </div>
      </div>
    );
  }

  const pergunta = perguntas[perguntaAtual];
  const progresso = ((perguntaAtual + 1) / perguntas.length) * 100;
  const isUltimaPergunta = perguntaAtual === perguntas.length - 1;

  return (
    <div className="card">
      <div className="card-header">
        <h2>Questionário de Análise</h2>
        <p>Pergunta {perguntaAtual + 1} de {perguntas.length}</p>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          marginTop: '1rem',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progresso}%`,
            height: '100%',
            backgroundColor: 'var(--primary-color)',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            {pergunta.pergunta}
          </label>

          {pergunta.tipo === 'text' && (
            <input
              type="text"
              className="form-input"
              placeholder={pergunta.placeholder}
              value={respostas[pergunta.id] || ''}
              onChange={(e) => handleChange(pergunta.id, e.target.value)}
            />
          )}

          {pergunta.tipo === 'textarea' && (
            <textarea
              className="form-textarea"
              placeholder={pergunta.placeholder}
              value={respostas[pergunta.id] || ''}
              onChange={(e) => handleChange(pergunta.id, e.target.value)}
            />
          )}

          {pergunta.tipo === 'radio' && (
            <div className="form-radio-group">
              {pergunta.opcoes.map((opcao, index) => (
                <label
                  key={index}
                  className={`form-radio ${respostas[pergunta.id] === opcao ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={`pergunta-${pergunta.id}`}
                    value={opcao}
                    checked={respostas[pergunta.id] === opcao}
                    onChange={(e) => handleChange(pergunta.id, e.target.value)}
                  />
                  {opcao}
                </label>
              ))}
            </div>
          )}

          {errors[pergunta.id] && (
            <div className="alert alert-error" style={{ marginTop: '1rem' }}>
              {errors[pergunta.id]}
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {perguntaAtual > 0 && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={perguntaAnterior}
              style={{
                flex: 1,
                backgroundColor: '#6b7280'
              }}
            >
              Anterior
            </button>
          )}

          {!isUltimaPergunta ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={proximaPergunta}
              style={{ flex: 1 }}
            >
              Próxima
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? 'Analisando...' : 'Finalizar e Ver Resultado'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

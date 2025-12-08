export default function Resultado({ analise }) {
  if (!analise) {
    return (
      <div className="card">
        <div className="loading">
          <div className="spinner"></div>
          <p>Processando análise...</p>
        </div>
      </div>
    );
  }

  const { pontuacao, explicacao, medidas_recomendadas, sinais_alerta, nivel_risco } = analise;

  // Determinar classe CSS baseada na pontuação
  const getScoreClass = (score) => {
    if (score < 30) return 'score-baixo';
    if (score < 60) return 'score-medio';
    if (score < 80) return 'score-alto';
    return 'score-critico';
  };

  const getNivelClass = (nivel) => {
    const nivelLower = nivel.toLowerCase();
    if (nivelLower === 'baixo') return 'nivel-baixo';
    if (nivelLower === 'médio' || nivelLower === 'medio') return 'nivel-medio';
    if (nivelLower === 'alto') return 'nivel-alto';
    return 'nivel-critico';
  };

  const getTitulo = (score) => {
    if (score < 30) return 'Risco Baixo';
    if (score < 60) return 'Risco Moderado';
    if (score < 80) return 'Risco Alto';
    return 'Risco Crítico - Provável Golpe!';
  };

  const getMensagem = (score) => {
    if (score < 30) {
      return 'Com base nas informações fornecidas, a situação apresenta baixo risco de fraude. No entanto, mantenha-se sempre alerta.';
    }
    if (score < 60) {
      return 'A situação apresenta alguns sinais de alerta. Recomendamos cautela e verificação adicional antes de prosseguir.';
    }
    if (score < 80) {
      return 'ATENÇÃO: A situação apresenta vários sinais típicos de golpes financeiros. Recomendamos fortemente não prosseguir.';
    }
    return 'ALERTA MÁXIMO: Esta situação possui características muito semelhantes a golpes conhecidos. NÃO prossiga!';
  };

  return (
    <div className="card resultado">
      <div className="score-container">
        <div className={`score-circle ${getScoreClass(pontuacao)}`}>
          {pontuacao}
        </div>
        <div className={`nivel-risco ${getNivelClass(nivel_risco)}`}>
          {getTitulo(pontuacao)}
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        fontSize: '1.125rem',
        color: 'var(--text-color)',
        margin: '1.5rem 0',
        padding: '1rem',
        backgroundColor: '#f9fafb',
        borderRadius: '8px'
      }}>
        {getMensagem(pontuacao)}
      </div>

      {explicacao && (
        <div className="explicacao">
          <h3>📋 Análise Detalhada</h3>
          <p>{explicacao}</p>
        </div>
      )}

      {sinais_alerta && sinais_alerta.length > 0 && (
        <div className="sinais-alerta">
          <h3>⚠️ Sinais de Alerta Identificados</h3>
          <ul>
            {sinais_alerta.map((sinal, index) => (
              <li key={index}>{sinal}</li>
            ))}
          </ul>
        </div>
      )}

      {medidas_recomendadas && medidas_recomendadas.length > 0 && (
        <div className="medidas">
          <h3>✅ Medidas Recomendadas</h3>
          <ol>
            {medidas_recomendadas.map((medida, index) => (
              <li key={index}>{medida}</li>
            ))}
          </ol>
        </div>
      )}

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#eff6ff',
        borderRadius: '8px',
        border: '1px solid #bfdbfe'
      }}>
        <h4 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
          💡 Dica Importante
        </h4>
        <p style={{ color: 'var(--text-color)', lineHeight: '1.6' }}>
          Em caso de dúvida, consulte sempre um especialista em segurança financeira ou
          entre em contato com a instituição financeira oficial. Nunca tome decisões
          precipitadas quando envolver dinheiro.
        </p>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#fef2f2',
        borderRadius: '8px',
        border: '1px solid #fecaca',
        fontSize: '0.875rem'
      }}>
        <strong>Canais para denúncia de golpes:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>Polícia Civil (Delegacia de Crimes Cibernéticos)</li>
          <li>Procon do seu estado</li>
          <li>Banco Central: 145 ou bcb.gov.br</li>
          <li>Portal da Polícia Federal: pf.gov.br</li>
        </ul>
      </div>

      <button
        className="btn btn-primary btn-block"
        onClick={() => window.location.reload()}
        style={{ marginTop: '2rem' }}
      >
        Fazer Nova Análise
      </button>
    </div>
  );
}

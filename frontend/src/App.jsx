import { useState, useEffect } from 'react';
import LeadForm from './components/LeadForm';
import Questionario from './components/Questionario';
import Resultado from './components/Resultado';
import { criarLead, obterPerguntas, analisarFraude } from './services/api';
import './styles/App.css';

function App() {
  const [etapa, setEtapa] = useState('lead'); // 'lead', 'questionario', 'resultado'
  const [leadId, setLeadId] = useState(null);
  const [perguntas, setPerguntas] = useState([]);
  const [analise, setAnalise] = useState(null);
  const [error, setError] = useState(null);

  // Carregar perguntas ao iniciar
  useEffect(() => {
    carregarPerguntas();
  }, []);

  const carregarPerguntas = async () => {
    try {
      const response = await obterPerguntas();
      setPerguntas(response.perguntas);
    } catch (error) {
      console.error('Erro ao carregar perguntas:', error);
      setError('Erro ao carregar perguntas. Tente novamente.');
    }
  };

  const handleLeadSubmit = async (dadosLead) => {
    try {
      setError(null);
      const response = await criarLead(dadosLead);
      setLeadId(response.leadId);
      setEtapa('questionario');
    } catch (error) {
      console.error('Erro ao criar lead:', error);
      setError('Erro ao processar suas informações. Tente novamente.');
    }
  };

  const handleQuestionarioSubmit = async (respostas) => {
    try {
      setError(null);
      const response = await analisarFraude(leadId, respostas);
      setAnalise(response.analise);
      setEtapa('resultado');
    } catch (error) {
      console.error('Erro ao analisar fraude:', error);
      setError('Erro ao processar análise. Tente novamente.');
    }
  };

  const getEtapaNumero = () => {
    switch (etapa) {
      case 'lead': return 1;
      case 'questionario': return 2;
      case 'resultado': return 3;
      default: return 1;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🛡️ Detector de Fraudes Financeiras</h1>
        <p>
          Analise situações suspeitas e descubra o risco de golpe com inteligência artificial
        </p>
      </header>

      <main className="container">
        {/* Barra de progresso */}
        <div className="progress-bar">
          <div className={`progress-step ${etapa === 'lead' ? 'active' : ''} ${getEtapaNumero() > 1 ? 'completed' : ''}`}>
            <div className="progress-step-number">1</div>
            <div className="progress-step-label">Identificação</div>
          </div>
          <div className={`progress-step ${etapa === 'questionario' ? 'active' : ''} ${getEtapaNumero() > 2 ? 'completed' : ''}`}>
            <div className="progress-step-number">2</div>
            <div className="progress-step-label">Questionário</div>
          </div>
          <div className={`progress-step ${etapa === 'resultado' ? 'active' : ''}`}>
            <div className="progress-step-number">3</div>
            <div className="progress-step-label">Resultado</div>
          </div>
        </div>

        {/* Mensagem de erro global */}
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {/* Conteúdo baseado na etapa */}
        {etapa === 'lead' && (
          <LeadForm onSubmit={handleLeadSubmit} />
        )}

        {etapa === 'questionario' && (
          <Questionario
            perguntas={perguntas}
            onSubmit={handleQuestionarioSubmit}
          />
        )}

        {etapa === 'resultado' && (
          <Resultado analise={analise} />
        )}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '2rem 1rem',
        color: 'var(--text-light)',
        fontSize: '0.875rem'
      }}>
        <p>© 2024 Cuidado Financeiro - Proteja-se contra fraudes</p>
        <p style={{ marginTop: '0.5rem' }}>
          Este simulador usa inteligência artificial para análise de risco
        </p>
      </footer>
    </div>
  );
}

export default App;

import { useState } from 'react';

export default function LeadForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.telefone && !/^[\d\s\-\(\)]+$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Identificação</h2>
        <p>Antes de iniciar a análise, precisamos de algumas informações básicas</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="nome">
            Nome completo *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="form-input"
            placeholder="Digite seu nome completo"
            value={formData.nome}
            onChange={handleChange}
          />
          {errors.nome && (
            <div className="alert alert-error" style={{ marginTop: '0.5rem' }}>
              {errors.nome}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="alert alert-error" style={{ marginTop: '0.5rem' }}>
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="telefone">
            Telefone (opcional)
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            className="form-input"
            placeholder="(00) 00000-0000"
            value={formData.telefone}
            onChange={handleChange}
          />
          {errors.telefone && (
            <div className="alert alert-error" style={{ marginTop: '0.5rem' }}>
              {errors.telefone}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Iniciar Análise'}
        </button>
      </form>
    </div>
  );
}

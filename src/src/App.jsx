import { useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || '';

const initialForm = {
  Customer_Age: 40,
  Gender: 'M',
  Education_Level: 'Graduate',
  Marital_Status: 'Married',
  Income_Category: '$80K - $120K',
  Card_Category: 'Blue',
  Credit_Limit: 5000,
  Avg_Open_To_Buy: 2500,
  Total_Trans_Ct: 60,
  Total_Revolving_Bal: 1500,
  Months_Inactive_12_mon: 2,
  Contacts_Count_12_mon: 2,
  Total_Amt_Chng_Q4_Q1: 1.15
}

const selectOptions = {
  Gender: [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Feminino' }
  ],
  Education_Level: [
    { value: 'Uneducated', label: 'Sem instrução' },
    { value: 'High School', label: 'Ensino médio' },
    { value: 'College', label: 'Ensino superior' },
    { value: 'Graduate', label: 'Graduação' },
    { value: 'Post-Graduate', label: 'Pós-graduação' },
    { value: 'Doctorate', label: 'Doutorado' }
  ],
  Marital_Status: [
    { value: 'Single', label: 'Solteiro(a)' },
    { value: 'Married', label: 'Casado(a)' },
    { value: 'Divorced', label: 'Divorciado(a)' }
  ],
  Income_Category: [
    { value: 'Less than $40K', label: 'Menos de $40K' },
    { value: '$40K - $60K', label: '$40K - $60K' },
    { value: '$60K - $80K', label: '$60K - $80K' },
    { value: '$80K - $120K', label: '$80K - $120K' },
    { value: '$120K +', label: 'Acima de $120K' }
  ],
  Card_Category: [
    { value: 'Blue', label: 'Blue' },
    { value: 'Silver', label: 'Silver' },
    { value: 'Gold', label: 'Gold' },
    { value: 'Platinum', label: 'Platinum' }
  ]
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [prediction, setPrediction] = useState(null)
  const [status, setStatus] = useState('Preencha o formulário e clique em calcular.')

  const handleChange = (event) => {
    const { name, value } = event.target
    const parsed = Number(value)
    setForm((prev) => ({
      ...prev,
      [name]: Number.isNaN(parsed) ? value : parsed
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('Calculando probabilidade...')
    setPrediction(null)

    try {
      const response = await fetch(`${API_URL}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const result = await response.json()

      if (!response.ok) {
        setStatus(result.error || 'Erro na previsão')
        return
      }

      setPrediction(result)
      setStatus('Previsão realizada com sucesso!')
    } catch (error) {
      setStatus('Falha ao conectar com o backend')
      console.error(error)
    }
  }

  return (
    <div className="page-container">
      <header>
        <div className="hero">
          <div>
            <p className="eyebrow">Modelo de churn integrado</p>
            <h1>Simulador de Churn de Cartão de Crédito</h1>
            <p>Preencha o perfil do cliente para estimar a probabilidade de cancelamento com base no modelo treinado.</p>
          </div>
        </div>
      </header>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="section-title">
          <div>
            <h3>Dados do cliente</h3>
            <p>Informações pessoais que ajudam a descrever o perfil do portador do cartão.</p>
          </div>
        </div>
        <div className="card">
          <label>Idade</label>
          <input type="number" name="Customer_Age" value={form.Customer_Age} min="18" max="100" onChange={handleChange} />
        </div>
        <div className="card">
          <label>Gênero</label>
          <select name="Gender" value={form.Gender} onChange={handleChange}>
            {selectOptions.Gender.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="card">
          <label>Formação</label>
          <select name="Education_Level" value={form.Education_Level} onChange={handleChange}>
            {selectOptions.Education_Level.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="card">
          <label>Estado Civil</label>
          <select name="Marital_Status" value={form.Marital_Status} onChange={handleChange}>
            {selectOptions.Marital_Status.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="section-title">
          <div>
            <h3>Perfil financeiro</h3>
            <p>Dados de renda e crédito do cliente.</p>
          </div>
        </div>
        <div className="card">
          <label>Faixa de Renda</label>
          <select name="Income_Category" value={form.Income_Category} onChange={handleChange}>
            {selectOptions.Income_Category.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="card">
          <label>Categoria do Cartão</label>
          <select name="Card_Category" value={form.Card_Category} onChange={handleChange}>
            {selectOptions.Card_Category.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="card">
          <label>Limite de Crédito</label>
          <input type="number" name="Credit_Limit" value={form.Credit_Limit} min="0" step="100" onChange={handleChange} />
        </div>
        <div className="card">
          <label>Limite Disponível</label>
          <input type="number" name="Avg_Open_To_Buy" value={form.Avg_Open_To_Buy} min="0" step="100" onChange={handleChange} />
        </div>

        <div className="section-title">
          <div>
            <h3>Atividade do cartão</h3>
            <p>Indicadores de uso e comportamento nos últimos 12 meses.</p>
          </div>
        </div>
        <div className="card">
          <label>Total de Transações (12m)</label>
          <input type="number" name="Total_Trans_Ct" value={form.Total_Trans_Ct} min="0" onChange={handleChange} />
        </div>
        <div className="card">
          <label>Saldos Revolventes</label>
          <input type="number" name="Total_Revolving_Bal" value={form.Total_Revolving_Bal} min="0" onChange={handleChange} />
        </div>
        <div className="card">
          <label>Meses Inativos (12m)</label>
          <input type="number" name="Months_Inactive_12_mon" value={form.Months_Inactive_12_mon} min="0" max="12" onChange={handleChange} />
        </div>
        <div className="card">
          <label>Contatos nos últimos 12m</label>
          <input type="number" name="Contacts_Count_12_mon" value={form.Contacts_Count_12_mon} min="0" max="12" onChange={handleChange} />
        </div>
        <div className="card">
          <label>Variação do valor total</label>
          <input type="number" name="Total_Amt_Chng_Q4_Q1" value={form.Total_Amt_Chng_Q4_Q1} min="0" step="0.01" onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit">Calcular probabilidade</button>
        </div>
      </form>

      <section className="result-card">
        <div className="result-header">
          <div>
            <h2>Resultado da Previsão</h2>
            <p>Veja a estimativa de churn e o comportamento previsto para o cliente.</p>
          </div>
        </div>

        <div className="result-status">
          <span>{status}</span>
        </div>

        {prediction && (
          <div className="result-values">
            <div className="result-item">
              <span>Probabilidade de churn</span>
              <strong>{(prediction.probability * 100).toFixed(1)}%</strong>
            </div>
            <div className="result-item">
              <span>Classe prevista</span>
              <strong>{prediction.label}</strong>
            </div>
            <div className="result-item">
              <span>Confiança</span>
              <strong>{prediction.confidence}</strong>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default App

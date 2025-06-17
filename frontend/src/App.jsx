import React, { useEffect, useState } from 'react';

function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('https://localhost:5000/api/produto')
      .then(res => res.json())
      .then(setProdutos)
      .catch(err => console.error('Erro ao carregar produtos', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Produtos</h1>
      <ul>
        {produtos.map(p => (
          <li key={p.id}>{p.nome} - {p.tempoPreparo} min</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

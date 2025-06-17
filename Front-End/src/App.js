import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NovoPedido from "./pages/NovoPedido";
import PainelCozinha from "./pages/PainelCozinha";
import PedidoRapido from "./pages/PedidoRapido";
import TelaInicial from "./pages/TelaInicial";
import CadastroProduto from "./pages/CadastroProduto";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/painel" element={<PainelCozinha />} />
        <Route path="/novo-pedido" element={<NovoPedido />} />
        <Route path="/pedido-rapido" element={<PedidoRapido />} />
        <Route path="/cadastro-produto" element={<CadastroProduto />} />
      </Routes>
    </Router>
  );
}

export default App;

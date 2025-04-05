import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HubConnectionBuilder } from "@microsoft/signalr";
import PedidoCard from "./PedidoCard";

function App() {
  const [pedidos, setPedidos] = useState([]);
  const connectionRef = useRef(null);
  const audio = useRef(null);

  // Tradutores de enum
  const prioridadeTexto = {
    1: "Alta",
    2: "Média",
    3: "Baixa"
  };

  const statusTexto = {
    0: "Pendente",
    1: "Finalizado"
  };

  useEffect(() => {
    audio.current = new Audio("/alerta.mp3");

    // 🔹 Carrega pedidos existentes da API
    fetch("https://localhost:5000/api/pedido")
      .then((res) => res.json())
      .then((data) => {
        const pedidosFormatados = data.map((pedido) => ({
          ...pedido,
          tempoRestante: pedido.tempoRestante ?? 1200,
          prioridade: prioridadeTexto[pedido.prioridade] ?? "Baixa",
          status: statusTexto[pedido.status] ?? "Pendente",
          finalizado: false
        }));
        setPedidos(pedidosFormatados);
      })
      .catch((err) => console.error("Erro ao carregar pedidos:", err));

    // 🔹 Conecta ao SignalR
    if (!connectionRef.current) {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:5000/hub/pedidos")
        .withAutomaticReconnect()
        .build();

      const handleNovoPedido = (pedido) => {
        const pedidoFormatado = {
          ...pedido,
          tempoRestante: pedido.tempoRestante ?? 1200,
          prioridade: prioridadeTexto[pedido.prioridade] ?? "Baixa",
          status: statusTexto[pedido.status] ?? "Pendente",
          finalizado: false
        };
        setPedidos((prev) => [...prev, pedidoFormatado]);
        audio.current.play();
      };

      connection
        .start()
        .then(() => {
          console.log("✅ Conectado ao SignalR");
          connection.on("NovoPedido", handleNovoPedido);
        })
        .catch((err) => console.error("❌ Erro na conexão:", err));

      connectionRef.current = connection;
    }

    // ⏱️ Timer regressivo
    const timer = setInterval(() => {
      setPedidos((prev) =>
        prev.map((p) =>
          p.tempoRestante > 0 ? { ...p, tempoRestante: p.tempoRestante - 1 } : p
        )
      );
    }, 1000);

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current.off("NovoPedido");
      }
      clearInterval(timer);
    };
  }, []);

  // ✅ Ao clicar em concluir
  const concluirPedido = (id) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, finalizado: true } : p))
    );
    setTimeout(() => {
      setPedidos((prev) => prev.filter((p) => p.id !== id));
    }, 2000);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">📺 Painel da Cozinha</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {pedidos.map((p) => (
          <Col key={p.id}>
            <PedidoCard pedido={p} onConcluir={concluirPedido} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;

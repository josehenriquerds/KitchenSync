import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { HubConnectionBuilder } from '@microsoft/signalr';
import PedidoCard from '../components/PedidoCard';
import { motion } from 'framer-motion';
import { FaFish, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';

const gerarIdUnico = () => crypto?.randomUUID?.() ?? Math.floor(Math.random() * 1e9);

function PainelCozinha() {
  const [pedidos, setPedidos] = useState([]);
  const [destaque, setDestaque] = useState(null);
  const connectionRef = useRef(null);
  const audio = useRef(null);
  const router = useRouter();

  const prioridadeTexto = {
    1: 'Alta',
    2: 'Média',
    3: 'Baixa',
  };

  const statusTexto = {
    0: 'Pendente',
    1: 'Finalizado',
  };

  useEffect(() => {
    audio.current = new Audio('/alerta.mp3');

    fetch('https://localhost:5000/api/pedido')
      .then((res) => res.json())
      .then((data) => {
        const pedidosFormatados = data.map((pedido) => ({
          ...pedido,
          id: typeof pedido.id === 'number' && pedido.id > 0 ? pedido.id : gerarIdUnico(),
          produtoId: pedido.produtoId ?? pedido.produto?.id ?? 0,
          tempoRestante: pedido.tempoRestante ?? 1200,
          prioridade: prioridadeTexto[pedido.prioridade] ?? 'Baixa',
          status: statusTexto[pedido.status] ?? 'Pendente',
          finalizado: false,
        }));
        setPedidos(pedidosFormatados);
      })
      .catch((err) => console.error('Erro ao carregar pedidos:', err));

    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:5000/hub/pedidos')
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log('✅ Conectado ao SignalR');

        connection.on('NovoPedido', (pedido) => {
          const novo = {
            ...pedido,
            id: typeof pedido.id === 'number' && pedido.id > 0 ? pedido.id : gerarIdUnico(),
            produtoId: pedido.produtoId ?? pedido.produto?.id ?? 0,
            tempoRestante: pedido.tempoRestante ?? 1200,
            prioridade: prioridadeTexto[pedido.prioridade] ?? 'Baixa',
            status: statusTexto[pedido.status] ?? 'Pendente',
            finalizado: false,
          };

          setDestaque(novo);
          audio.current.play().catch(() => {});
          setTimeout(() => {
            setPedidos((prev) => [...prev, novo]);
            setDestaque(null);
          }, 5000);
        });
      })
      .catch((err) => console.error('Erro SignalR:', err));

    connectionRef.current = connection;

    const timer = setInterval(() => {
      setPedidos((prev) =>
        prev.map((p) =>
          p.tempoRestante > 0 ? { ...p, tempoRestante: p.tempoRestante - 1 } : p
        )
      );
    }, 1000);

    return () => {
      connectionRef.current?.stop();
      clearInterval(timer);
    };
  }, []);

  const concluirPedido = (id, produtoId) => {
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, finalizado: true } : p))
    );

    setPedidos((prev) => prev.filter((p) => p.id !== id));

    fetch('https://localhost:5000/api/pedido/concluir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ProdutoId: produtoId }),
    })
      .then(() => console.log('✅ Pedido liberado'))
      .catch((err) => console.error('❌ Erro ao liberar:', err));
  };

  return (
    <Container className="py-5">
      {destaque ? (
        <div className="tela-destaque">
          <h1 className="texto-destaque">{destaque.item}</h1>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="d-flex align-items-center"
            >
              <h1 className="d-flex align-items-center m-0">
                <FaFish style={{ color: '#fca311', marginRight: '0.5rem' }} />
                KitchenSync
              </h1>
            </motion.div>
            <Button
              variant="light"
              className="d-flex align-items-center"
              onClick={() => router.push('/')}
            >
              <FaArrowLeft className="me-2" /> Voltar
            </Button>
          </div>

          <motion.h2 className="text-center mb-4">📺 Painel da Cozinha</motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <Row xs={1} md={2} lg={3} className="g-4">
              {pedidos.map((p) => (
                <Col key={p.id}>
                  <PedidoCard
                    pedido={p}
                    onConcluir={() => concluirPedido(p.id, p.produtoId)}
                  />
                </Col>
              ))}
            </Row>
          </motion.div>
        </>
      )}
    </Container>
  );
}

export default PainelCozinha;

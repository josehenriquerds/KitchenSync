import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Toast, ToastContainer, Button } from 'react-bootstrap';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ProdutoCard from '../components/ProdutoCard';
import { motion } from 'framer-motion';
import { FaFish, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PedidoRapido() {
  const [produtos, setProdutos] = useState([]);
  const [produtosEmEspera, setProdutosEmEspera] = useState(new Set());
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const connectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/produtos.json')
      .then((res) => res.json())
      .then(setProdutos)
      .catch(console.error);

    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:5000/hub/pedidos')
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log('✅ Conectado ao SignalR (pedido rápido)');

        connection.off('LiberarProduto');
        connection.on('LiberarProduto', (produtoId) => {
          const id = Number(produtoId);
          setProdutosEmEspera((prev) => {
            const nova = new Set(prev);
            nova.delete(id);
            return new Set(nova);
          });

          setToastMsg(`✅ Produto ${id} liberado!`);
          setShowToast(true);
        });
      })
      .catch(console.error);

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, []);

  const marcarComoAguardando = async (produtoId) => {
    const id = Number(produtoId);
    setProdutosEmEspera((prev) => {
      const nova = new Set(prev);
      nova.add(id);
      return new Set(nova);
    });

    try {
      await fetch('https://localhost:5000/api/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produtoId: id,
          quantidade: 1,
          solicitante: 'Garçom',
          prioridade: 1,
        }),
      });

      setToastMsg(`🕐 Pedido enviado para o produto ${id}`);
      setShowToast(true);
    } catch (err) {
      console.error('Erro ao enviar pedido:', err);
      setToastMsg('❌ Erro ao enviar pedido');
      setShowToast(true);
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="d-flex align-items-center"
        >
          <h2 className="d-flex align-items-center m-0">
            <FaFish style={{ color: '#fca311', marginRight: '0.5rem' }} />
            KitchenSync
          </h2>
        </motion.div>
        <Button
          variant="light"
          className="d-flex align-items-center"
          onClick={() => navigate('/')}
        >
          <FaArrowLeft className="me-2" /> Voltar
        </Button>
      </div>

      <h3 className="text-center mb-4">🔥 Pedido Rápido</h3>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {produtos.map((produto) => (
          <Col key={produto.id}>
            <ProdutoCard
              produto={produto}
              podeSolicitarNovamente={!produtosEmEspera.has(Number(produto.id))}
              emEspera={produtosEmEspera.has(Number(produto.id))}
              onEnviar={marcarComoAguardando}
            />
          </Col>
        ))}
      </Row>

      <ToastContainer position="bottom-center" className="mb-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={2500}
            autohide
            className="toast"
            style={{
              backgroundColor: toastMsg.includes('Erro') ? 'var(--error)' : 'var(--success)',
              color: 'white',
            }}
          >
            <Toast.Body>{toastMsg}</Toast.Body>
          </Toast>
        </motion.div>
      </ToastContainer>
    </Container>
  );
}

export default PedidoRapido;

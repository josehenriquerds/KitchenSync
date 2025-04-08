import React from 'react';
import { Card } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import "./PedidoCard.css";

const PedidoCard = ({ pedido, onConcluir }) => {
  const { tempoRestante, prioridade, status, finalizado, produto } = pedido;
  const initialTime = 1200;
  const progress = (tempoRestante / initialTime) * 100;

  const priorityColor =
    prioridade === 'Alta' ? 'var(--error)' :
    prioridade === 'Média' ? 'var(--primary)' :
    'var(--success)';
    console.log(pedido);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="pedido-card"
        onClick={() => !finalizado && onConcluir()}
        style={{ cursor: finalizado ? 'not-allowed' : 'pointer', opacity: finalizado ? 0.5 : 1 }}
      >
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center nome-item">
          <span className="nome-destaque">{pedido.item}</span>

            <span style={{ color: priorityColor, fontWeight: 500 }}>{prioridade}</span>
          </Card.Title>

          <div className="d-flex align-items-center mb-2">
            <FaClock style={{ marginRight: '8px', color: 'var(--primary)' }} />
            <span>
              {Math.floor(tempoRestante / 60)}:{(tempoRestante % 60).toString().padStart(2, '0')}
            </span>
          </div>

          <div style={{
            height: '4px',
            width: '100%',
            backgroundColor: 'var(--disabled)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: tempoRestante < 300 ? 'var(--error)' : 'var(--primary)',
              transition: 'width 1s linear'
            }} />
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default PedidoCard;

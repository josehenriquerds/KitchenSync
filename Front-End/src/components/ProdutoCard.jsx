import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import "./ProdutoCard.css";

function ProdutoCard({ produto, podeSolicitarNovamente, onEnviar }) {
  const [enviado, setEnviado] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdTimeout = useRef(null);
  const progressInterval = useRef(null);

  const tempoPreparoTexto = `${produto.tempoPreparo} min`;

  const enviarPedido = () => {
    if (enviado) return;

    onEnviar?.(produto.id); 
    setEnviado(true);
    navigator.vibrate?.(100); 
  };

  const iniciarHold = () => {
    if (enviado) return;

    setProgress(0);
    let currentProgress = 0;

    progressInterval.current = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(progressInterval.current);
      }
    }, 120);

    holdTimeout.current = setTimeout(() => {
      enviarPedido();
      setProgress(0);
    }, 1200);
  };

  const cancelarHold = () => {
    clearTimeout(holdTimeout.current);
    clearInterval(progressInterval.current);
    setProgress(0);
  };

  useEffect(() => {
    if (podeSolicitarNovamente && enviado) {
      setEnviado(false);
    }
  }, [podeSolicitarNovamente]);

  return (
    <motion.div
      className="produto-card"
      whileHover={!enviado ? { scale: 1.02 } : {}}
      whileTap={!enviado ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 200 }}
      onMouseDown={!enviado ? iniciarHold : null}
      onMouseUp={cancelarHold}
      onMouseLeave={cancelarHold}
      onTouchStart={!enviado ? iniciarHold : null}
      onTouchEnd={cancelarHold}
      style={{ position: "relative", userSelect: "none" }}
    >
      <div className={`card-wrapper ${enviado ? "enviado" : ""}`}>
        {!enviado && (
          <div
            className="barra-progresso-vertical"
            style={{ width: `${progress}%` }}
          />
        )}

        <div className="card-content">
          <div className="info-texto">
            <h2
              className={`nome-produto mb-1 ${progress > 10 ? 'nome-branco' : ''}`}
            >
              {produto.nome}
            </h2>
          </div>

          <div className="tempo-circulo">{tempoPreparoTexto}</div>
        </div>

        <AnimatePresence>
          {enviado && (
            <motion.div
              key="confirmacao"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(108, 117, 125, 0.95)",
                color: "white",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              <FaCheckCircle size={20} className="mb-2" />
              <span className="fw-bold fs-5">
                Aguardando preparo do {produto.nome}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default ProdutoCard;
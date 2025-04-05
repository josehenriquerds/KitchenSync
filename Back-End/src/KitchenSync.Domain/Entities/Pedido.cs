
using KitchenSync.Domain.Enums;
using System;

namespace KitchenSync.Domain.Entities
{
    public class Pedido
    {
        public int Id { get; set; }
        public Produto Produto { get; set; }  // Relacionamento com o produto
        public int Quantidade { get; set; }
        public string Solicitante { get; set; }
        public DateTime DataHoraSolicitacao { get; set; }
        public int TempoRestante { get; set; } // Tempo restante do pedido (em segundos)
        public int Prioridade { get; set; }
        public int Status { get; set; }
    }

}

using System;

namespace KitchenSync.Domain.Entities
{
    public class PedidoAnalitico
    {
        public int Id { get; set; }
        public int ProdutoId { get; set; }
        public Produto Produto { get; set; }  // relação com entidade já existente
        public int Quantidade { get; set; }
        public DateTime DataHora { get; set; }
    }

}

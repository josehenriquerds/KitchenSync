using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KitchenSync.Application.DTOS
{
    public class CriarPedidoDto
    {
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public string Solicitante { get; set; }
        public int Prioridade { get; set; }
    }

}

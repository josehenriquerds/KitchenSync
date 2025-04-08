using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace KitchenSync.API.Hubs
{
    public class PedidoHub : Hub
    {
        public async Task PedidoConcluido(int produtoId)
        {
            Console.WriteLine($"[HUB] PedidoConcluido chamado com produtoId={produtoId}");
            await Clients.All.SendAsync("LiberarProduto", produtoId);
        }

        public async Task EnviarPedido(int produtoId)
        {
            Console.WriteLine($"[HUB] EnviarPedido chamado com produtoId={produtoId}");
            await Clients.All.SendAsync("NovoPedidoRecebido", produtoId);
        }
    }
}

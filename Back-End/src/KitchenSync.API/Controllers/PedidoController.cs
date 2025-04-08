using KitchenSync.API.Hubs;
using KitchenSync.Application.DTOs;
using KitchenSync.Application.DTOS;
using KitchenSync.Domain.Entities;
using KitchenSync.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace KitchenSync.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidoController : ControllerBase
    {
        private readonly IHubContext<PedidoHub> _hubContext;
        private readonly KitchenSyncDbContext _context;

        public PedidoController(
            IHubContext<PedidoHub> hubContext,
            KitchenSyncDbContext context)
        {
            _hubContext = hubContext;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CriarPedido([FromBody] CriarPedidoDto dto)
        {
            var produto = await _context.Produtos.FindAsync(dto.ProdutoId);
            if (produto == null)
                return NotFound("Produto não encontrado.");

            // Monta e envia o pedido ao painel da cozinha via SignalR
            var pedido = new Pedido
            {
                Produto = produto,
                Quantidade = dto.Quantidade,
                Solicitante = dto.Solicitante,
                DataHoraSolicitacao = DateTime.Now,
                TempoRestante = produto.TempoPreparo * 60,
                Prioridade = dto.Prioridade,
                Status = 0
            };

            var retorno = PedidoDto.FromEntity(pedido);
            await _hubContext.Clients.All.SendAsync("NovoPedido", retorno);

            // Registra pedido analítico no banco
            var analitico = new PedidoAnalitico
            {
                ProdutoId = produto.Id,
                Quantidade = dto.Quantidade,
                DataHora = DateTime.UtcNow
            };

            _context.PedidosAnaliticos.Add(analitico);
            await _context.SaveChangesAsync();

            return Ok(retorno);
        }

        [HttpPost("concluir")]
        public async Task<IActionResult> ConcluirPedido([FromBody] ConcluirPedidoDto dto)
        {
            Console.WriteLine($"[DEBUG] dto recebido: {System.Text.Json.JsonSerializer.Serialize(dto)}");
            Console.WriteLine($"[API] PedidoConcluido via REST - produtoId={dto.ProdutoId}");

            await _hubContext.Clients.All.SendAsync("LiberarProduto", dto.ProdutoId);
            return Ok();
        }




        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoDto>>> GetPedidos()
        {
            // Endpoint opcional para manter compatibilidade
            return Ok(new List<PedidoDto>());
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using KitchenSync.Application.UseCases;
using KitchenSync.Domain.Entities;
using KitchenSync.API.Hubs;
using Microsoft.AspNetCore.SignalR;
using KitchenSync.Application.DTOs;
using KitchenSync.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using KitchenSync.Application.DTOS;

namespace KitchenSync.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidoController : ControllerBase
    {
        private readonly CriarPedidoHandler _handler;
        private readonly IHubContext<PedidoHub> _hubContext;
        private readonly KitchenSyncDbContext _context;

        public PedidoController(
            IHubContext<PedidoHub> hubContext,
            KitchenSyncDbContext context)
        {
            _handler = new CriarPedidoHandler();
            _hubContext = hubContext;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CriarPedido([FromBody] CriarPedidoDto dto)
        {
            var produto = await _context.Produtos.FindAsync(dto.ProdutoId);
            if (produto == null)
                return NotFound("Produto não encontrado.");

            var pedido = new Pedido
            {
                Produto = produto,
                Quantidade = dto.Quantidade,
                Solicitante = dto.Solicitante,
                DataHoraSolicitacao = DateTime.Now,
                TempoRestante = produto.TempoPreparo * 60,
                Prioridade = dto.Prioridade,
                Status = 0 // ou StatusPedido.Pendente
            };

            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();

            var retorno = PedidoDto.FromEntity(pedido);
            await _hubContext.Clients.All.SendAsync("NovoPedido", retorno);

            return CreatedAtAction(nameof(CriarPedido), new { id = pedido.Id }, retorno);
        }


        // ✅ Novo endpoint GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoDto>>> GetPedidos()
        {
            var pedidos = await _context.Pedidos
                .Include(p => p.Produto)
                .ToListAsync();

            var dtos = pedidos.Select(PedidoDto.FromEntity).ToList();
            return Ok(dtos);
        }
    }
}

using KitchenSync.API.Hubs;
using KitchenSync.Application.DTOs;
using KitchenSync.Application.DTOS;
using KitchenSync.Domain.Entities;
using KitchenSync.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Linq;


namespace KitchenSync.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidoController : ControllerBase
    {
        private readonly IHubContext<PedidoHub> _hubContext;
        private readonly ProdutoFileService _produtoService;
        private readonly PedidoInMemoryService _pedidoService;

        public PedidoController(
            IHubContext<PedidoHub> hubContext,
            ProdutoFileService produtoService,
            PedidoInMemoryService pedidoService)
        {
            _hubContext = hubContext;
            _produtoService = produtoService;
            _pedidoService = pedidoService;
        }

        [HttpPost]
        public async Task<IActionResult> CriarPedido([FromBody] CriarPedidoDto dto)
        {
            // Consulta o produto diretamente do arquivo JSON
            var produto = _produtoService.GetById(dto.ProdutoId);
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

            _pedidoService.Add(pedido);

            var retorno = PedidoDto.FromEntity(pedido);
            await _hubContext.Clients.All.SendAsync("NovoPedido", retorno);

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
        public ActionResult<IEnumerable<PedidoDto>> GetPedidos()
        {
            var pedidos = _pedidoService.GetAll().Select(PedidoDto.FromEntity);
            return Ok(pedidos);
        }
    }
}

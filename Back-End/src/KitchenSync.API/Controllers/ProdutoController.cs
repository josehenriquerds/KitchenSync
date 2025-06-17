using KitchenSync.Domain.Entities;
using KitchenSync.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace KitchenSync.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly ProdutoFileService _service;

        public ProdutoController(ProdutoFileService service)
        {
            _service = service;
        }

        // Rota para cadastrar um novo produto
        [HttpPost]
        public ActionResult CadastrarProdutos([FromBody] List<Produto> produtos)
        {
            if (produtos == null || produtos.Count == 0)
                return BadRequest("Nenhum produto recebido.");

            foreach (var produto in produtos)
            {
                if (string.IsNullOrEmpty(produto.Nome) || produto.TempoPreparo <= 0)
                    return BadRequest("Todos os produtos devem ter nome e tempo de preparo.");
            }

            _service.AddRange(produtos);
            return Ok(produtos);
        }


        // Rota para obter um produto específico por ID
        [HttpGet("{id}")]
        public ActionResult<Produto> GetProduto(int id)
        {
            var produto = _service.GetById(id);

            if (produto == null)
            {
                return NotFound();
            }

            return produto;
        }

        // Rota para obter todos os produtos cadastrados (opcional)
        [HttpGet]
        public ActionResult<IEnumerable<Produto>> GetProdutos()
        {
            return Ok(_service.GetAll());
        }

        // Rota para atualizar um produto (opcional)
        [HttpPut("{id}")]
        public IActionResult PutProduto(int id, Produto produto)
        {
            if (id != produto.Id)
            {
                return BadRequest();
            }
            _service.Update(produto);
            return NoContent();
        }

        // Rota para deletar um produto pelo ID
        [HttpDelete("{id}")]
        public IActionResult DeletarProduto(int id)
        {
            var produto = _service.GetById(id);

            if (produto == null)
                return NotFound("Produto não encontrado.");

            _service.Remove(id);

            return Ok(new { message = "Produto excluído com sucesso." });
        }


        // Verifica se o produto existe no banco
        private bool ProdutoExists(int id)
        {
            return _service.GetById(id) != null;
        }
    }
}

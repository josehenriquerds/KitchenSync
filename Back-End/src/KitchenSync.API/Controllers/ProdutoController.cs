using KitchenSync.Domain.Entities;
using KitchenSync.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KitchenSync.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly KitchenSyncDbContext _context;

        // Injeção de dependência do contexto de banco de dados
        public ProdutoController(KitchenSyncDbContext context)
        {
            _context = context;
        }

        // Rota para cadastrar um novo produto
        [HttpPost]
        public async Task<ActionResult<Produto>> CadastrarProduto(Produto produto)
        {
            // Validação simples
            if (string.IsNullOrEmpty(produto.Nome) || produto.TempoPreparo <= 0)
            {
                return BadRequest("Nome do produto e tempo de preparo são obrigatórios.");
            }

            // Adiciona o produto ao banco de dados
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();

            // Retorna o produto recém-cadastrado com status 201
            return CreatedAtAction("GetProduto", new { id = produto.Id }, produto);
        }

        // Rota para obter um produto específico por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> GetProduto(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);

            if (produto == null)
            {
                return NotFound();
            }

            return produto;
        }

        // Rota para obter todos os produtos cadastrados (opcional)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
        {
            return await _context.Produtos.ToListAsync();
        }

        // Rota para atualizar um produto (opcional)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduto(int id, Produto produto)
        {
            if (id != produto.Id)
            {
                return BadRequest();
            }

            _context.Entry(produto).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Verifica se o produto existe no banco
        private bool ProdutoExists(int id)
        {
            return _context.Produtos.Any(e => e.Id == id);
        }
    }
}

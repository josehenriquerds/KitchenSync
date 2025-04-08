namespace KitchenSync.Domain.Entities
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public int TempoPreparo { get; set; }  
        public string Categoria { get; set; }
        public bool Disponivel { get; set; }
    }
}

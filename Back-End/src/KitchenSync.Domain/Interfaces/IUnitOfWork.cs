namespace KitchenSync.Domain.Interfaces
{
    public interface IUnitOfWork
    {
        void Commit();
    }
}
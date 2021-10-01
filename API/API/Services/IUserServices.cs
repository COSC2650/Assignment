using System.Linq;  
using System.Threading.Tasks;
using API.Models;
  
namespace API.Services
{  
   public interface IUserService  
    {  
        Task<User> Create(User user);
        Task<bool> Delete(int UserID);  
        IQueryable<User> GetAll();  
    }  
}  
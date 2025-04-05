using KitchenSync.API.Hubs;
using KitchenSync.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace KitchenSync.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // 🔹 Adiciona o DbContext
            services.AddDbContext<KitchenSyncDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddControllers();
            services.AddEndpointsApiExplorer();

            // 🔹 Configura o CORS para permitir requisições do frontend
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReact", builder =>
                {
                    builder
                        .WithOrigins("http://localhost:3000") // frontend local
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials(); // necessário para SignalR com cookies
                });
            });

            // 🔹 Adiciona suporte ao SignalR
            services.AddSignalR();

            // 🔹 Swagger para documentação
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "KitchenSync API", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "KitchenSync API V1");
                    c.RoutePrefix = string.Empty;
                });

                app.UseDeveloperExceptionPage();
            }

            // 🔹 Habilita o CORS antes do roteamento
            app.UseCors("AllowReact");

            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<PedidoHub>("/hub/pedidos");
            });
        }
    }
}

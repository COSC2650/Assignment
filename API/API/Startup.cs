using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NLog;
using Sentry.AspNetCore;

namespace API
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var cors = System.Environment.GetEnvironmentVariable("CORS");
            var origins = cors?.Split(',', System.StringSplitOptions.RemoveEmptyEntries);

            if (origins == null || origins.Length == 0)
            {
                origins = new string[] { "http://localhost:3000" };
            }

            services
                .AddGraphQLServer()
                .AddQueryType<Query>();

            services
                .AddCors(options =>
                {
                    options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.WithOrigins(origins)
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors();

            app.UseRouting()
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapGraphQL();
                    endpoints.MapGet("/", async context =>
                        {
                            NewRelic.Api.Agent.NewRelic.RecordMetric("Custom/HealthCheck", 1);

                            Logger log = LogManager.GetCurrentClassLogger();
                            log.Debug("Health check");

                            await context.Response.WriteAsync("Health check");
                        });
                });

            app.UseSentryTracing();
        }
    }
}

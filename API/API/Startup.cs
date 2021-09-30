using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using NLog;
using Sentry.AspNetCore;
using API.Data;
using API.Services;
using API.GraphQL;
using HotChocolate;  
using System;  


namespace API
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940

#if DEBUG
        private readonly string ConnectionString = "Server=cosc2650.cl00c6onjmtb.ap-southeast-2.rds.amazonaws.com;Database=cosc2650;uid=admin;pwd=yREcSNJ3XMwPYNGVf6Py5cm75s";
#else
        private readonly string ConnectionString = System.Environment.GetEnvironmentVariable("CONNECTION_STRING");
#endif

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ZipitContext>(options =>
                options.UseMySQL(ConnectionString));
            var cors = System.Environment.GetEnvironmentVariable("CORS");
            var origins = cors?.Split(',', System.StringSplitOptions.RemoveEmptyEntries);

            if (origins == null || origins.Length == 0)
            {
                origins = new string[] { "http://localhost:3000", "http://localhost:5000", "http://localhost:5001" };
            }

            services.AddScoped<Query>()
                .AddScoped<Mutuation>()  
                .AddScoped<IUserService, UserService>();
            // services.AddGraphQL(c => SchemaBuilder.New().AddServices(c).AddType<GraphQLTypes>()  
            //                                                         .AddQueryType<Query>()  
            //                                                         .AddMutationType<Mutuation>()  
            //                                                         .Create());
            services.AddGraphQLServer()
                .AddType<GraphQLTypes>()  
                .AddQueryType<Query>()  
                .AddMutationType<Mutuation>();

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

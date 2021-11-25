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
using HotChocolate;  
using System;
using API.GraphQL.Users;
using API.GraphQL.Listings;
using API.GraphQL.Messages;

namespace API
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940

#if DEBUG
        private readonly string ConnectionString = "";
#else
        private readonly string ConnectionString = System.Environment.GetEnvironmentVariable("CONNECTION_STRING");
#endif

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ZipitContext>(options =>
                options.UseMySQL(ConnectionString));
            var cors = System.Environment.GetEnvironmentVariable("CORS_URLS");
            var origins = cors?.Split(',', System.StringSplitOptions.RemoveEmptyEntries);

            if (origins == null || origins.Length == 0)
            {
                origins = new string[] { "http://localhost:3000", "http://localhost:5000", "http://localhost:5001" };
            }

            services.AddScoped<IUserService, UserService>()
                .AddScoped<IListingService, ListingService>()
                .AddScoped<IMessageService, MessageService>()
                .AddScoped<UserQueries>()
                .AddScoped<UserMutations>()
                .AddScoped<ListingQueries>()
                .AddScoped<ListingMutations>()
                .AddScoped<MessageQueries>()
                .AddScoped<MessageMutations>();

            services.AddGraphQLServer()
                .AddQueryType(d => d.Name("Query"))
                    .AddTypeExtension<UserQueries>()
                    .AddTypeExtension<ListingQueries>()
                    .AddTypeExtension<MessageQueries>()
                .AddMutationType(d => d.Name("Mutation"))
                    .AddTypeExtension<UserMutations>()
                    .AddTypeExtension<ListingMutations>()
                    .AddTypeExtension<MessageMutations>()
                .AddType<UserType>()
                .AddType<ListingType>()
                .AddType<MessageType>();

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

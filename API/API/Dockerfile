FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
RUN mkdir /build-context
COPY . /build-context
WORKDIR /build-context
RUN dotnet restore

# Build
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:3.1
WORKDIR /app
COPY --from=build-env /build-context/out .
EXPOSE 80
ENTRYPOINT ["dotnet", "API.dll"]
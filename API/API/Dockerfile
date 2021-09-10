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

# Install the agent
RUN apt-get update && apt-get install -y wget ca-certificates gnupg
RUN echo 'deb http://apt.newrelic.com/debian/ newrelic non-free' | tee /etc/apt/sources.list.d/newrelic.list
RUN wget https://download.newrelic.com/548C16BF.gpg
RUN apt-key add 548C16BF.gpg
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y newrelic-netcore20-agent
RUN rm -rf /var/lib/apt/lists/*

# Enable the agent
ENV CORECLR_ENABLE_PROFILING=1 \
CORECLR_PROFILER={36032161-FFC0-4B61-B559-F6C5D41BAE5A} \
CORECLR_NEWRELIC_HOME=/usr/local/newrelic-netcore20-agent \
CORECLR_PROFILER_PATH=/usr/local/newrelic-netcore20-agent/libNewRelicProfiler.so \
NEW_RELIC_LICENSE_KEY=3c9e5c618f31bf7394bb19e370a40ef5d2dfNRAL \
NEW_RELIC_APP_NAME="API"

# Set the working directory and copy thr build assets
WORKDIR /app
COPY --from=build-env /build-context/out .

# Expose port 80
EXPOSE 80

# Run the app
ENTRYPOINT ["/usr/local/newrelic-netcore20-agent/run.sh", "/app/API.dll"]

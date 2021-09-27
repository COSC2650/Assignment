FROM mkellock/buildtools:latest AS build-env

# Container arguements
ARG GITHUB_REF

# Update the container
RUN apt-get update \
        && apt-get upgrade -y

# Copy the build files
RUN mkdir /build-context
COPY . /build-context
WORKDIR /build-context/API
RUN dotnet restore

# Build test and publish
RUN if [ "$GITHUB_REF" = "refs/heads/main" ]; then configuration="Release"; else configuration="Debug"; fi \
        && dotnet build ./API.sln -c "$configuration" \
        && dotnet publish ./API/API.csproj -c "$configuration" -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0

# New Relic licence key
ENV NEW_RELIC_LICENCE_KEY=""
ENV NEW_RELIC_API_KEY=""
ENV NEW_RELIC_ACCOUNT_ID=""

# Install the NewRelic agent
RUN apt-get update \
        && apt-get upgrade -y \
        && apt-get install -y wget ca-certificates gnupg \
        && echo 'deb http://apt.newrelic.com/debian/ newrelic non-free' | tee /etc/apt/sources.list.d/newrelic.list \
        && wget https://download.newrelic.com/548C16BF.gpg \
        && apt-key add 548C16BF.gpg \
        && apt-get update \
        && apt-get install -y newrelic-netcore20-agent \
        && rm -rf /var/lib/apt/lists/*

# Enable the NewRelic agent
ENV CORECLR_ENABLE_PROFILING=1 \
CORECLR_PROFILER={36032161-FFC0-4B61-B559-F6C5D41BAE5A} \
CORECLR_NEWRELIC_HOME=/usr/local/newrelic-netcore20-agent \
CORECLR_PROFILER_PATH=/usr/local/newrelic-netcore20-agent/libNewRelicProfiler.so \
NEW_RELIC_LICENSE_KEY=$NEW_RELIC_LICENCE_KEY \
NEW_RELIC_APP_NAME="API"

# Set the working directory and copy thr build assets
COPY --from=build-env /build-context/API/out .

# Expose port 80
EXPOSE 80

# Run the app
ENTRYPOINT ["/usr/local/newrelic-netcore20-agent/run.sh", "dotnet /API.dll"]

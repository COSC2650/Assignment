FROM mkellock/buildtools:latest AS build-env

# Container arguements
ARG GITHUB_REF
ENV GITHUB_REF $GITHUB_REF

ARG SONAR_TOKEN
ENV SONAR_TOKEN="bf72bb52b5317691e33bb9ec3da8dde84351d71d"

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN $GITHUB_TOKEN

# Copy the build files
RUN mkdir /build-context
COPY . /build-context
WORKDIR /build-context/API
RUN dotnet restore

# Install/update the Sonar scanner
RUN if [ ! -d /.sonar/scanner ]; then mkdir -p /.sonar/scanner; fi \
        && dotnet tool update dotnet-sonarscanner --tool-path /.sonar/scanner

RUN echo "Fuckity $SONAR_TOKEN"

# Start the Sonar scanner
RUN /.sonar/scanner/dotnet-sonarscanner begin \
        /k:\"COSC2650_Assignment\" \
        /o:\"cosc2650\" \
        /d:sonar.login=$SONAR_TOKEN \
        /d:sonar.host.url=\"https://sonarcloud.io\" \
        /d:sonar.cs.opencover.reportsPaths=\"**/coverage.opencover.xml\" \
        /d:sonar.coverage.exclusions=\"API/Program.cs\",\"API/Startup.cs\"

# Build test and publish
RUN if [ "${GITHUB_REF}" == "refs/heads/main" ]; then configuration="Release"; else configuration="Debug"; fi \
        && dotnet build ./API/API.sln -c "${configuration}" \
        && dotnet test ./API/API.sln -c "${configuration}" /p:CollectCoverage=true /p:CoverletOutputFormat=opencover \
        && dotnet publish ./API/API/API.csproj -c "${configuration}" -o out

# End the SonarCloud scanner
RUN /.sonar/scanner/dotnet-sonarscanner end /d:sonar.login=$SONAR_TOKEN

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0

# Install the NewRelic agent
RUN apt-get update && apt-get install -y wget ca-certificates gnupg \
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
NEW_RELIC_LICENSE_KEY=3c9e5c618f31bf7394bb19e370a40ef5d2dfNRAL \
NEW_RELIC_APP_NAME="API"

# Set the working directory and copy thr build assets
COPY --from=build-env /build-context/out .

# Expose port 80
EXPOSE 80

# Run the app
ENTRYPOINT ["/usr/local/newrelic-netcore20-agent/run.sh", "dotnet /API.dll"]

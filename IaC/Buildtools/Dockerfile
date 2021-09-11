FROM mcr.microsoft.com/dotnet/sdk:5.0

# Update the Container
RUN apt-get update && \
        apt-get upgrade -y

# Install JRE
RUN apt-get install default-jre default-jdk -y

# Install the Sonar scanner
RUN if [ ! -d ./.sonar/scanner ]; then mkdir -p ./.sonar/scanner; fi \
        && dotnet tool update dotnet-sonarscanner --tool-path ./.sonar/scanner
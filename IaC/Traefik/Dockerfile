FROM traefik:2.5.3

# Add the configuration files
RUN mkdir -p /etc/traefik \ 
        && touch /etc/traefik/acme.json \
        && chmod 600 /etc/traefik/acme.json \
        && echo $'[log] \n\
  level = "WARN" \n\
\n\
[providers] \n\
  [providers.ecs] \n\
    autoDiscoverClusters = true \n\
\n\
[entryPoints] \n\
  [entryPoints.https] \n\
    address = ":443" \n\
\n\
[certificatesResolvers.lets-encrypt.acme] \n\
  storage = "/etc/traefik/acme.json" \n\
  email = "s3812552@student.rmit.edu.au" \n\
  [certificatesResolvers.lets-encrypt.acme.tlsChallenge]' >> /etc/traefik/traefik.toml
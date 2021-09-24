FROM traefik:2.5.3

# Add the configuration files
RUN mkdir -p /etc/traefik \ 
        && touch /etc/traefik/acme.json \
        && chmod 600 /etc/traefik/acme.json \
        && echo $'[log] \n\
  level = "DEBUG" \n\
\n\
[providers] \n\
  [providers.ecs] \n\
    exposedByDefault = false \n\
\n\
[entryPoints]\n\
  [entryPoints.web]\n\
    address = ":80"\n\
\n\
  [entryPoints.websecure]\n\
    address = ":443"\n\
\n\
[certificatesResolvers.letsEncrypt.acme] \n\
  email = "s3812552@student.rmit.edu.au" \n\
  storage = "/etc/traefik/acme.json" \n\
  [certificatesResolvers.letsEncrypt.acme.httpChallenge] \n\
    entryPoint = "web"' >> /etc/traefik/traefik.toml
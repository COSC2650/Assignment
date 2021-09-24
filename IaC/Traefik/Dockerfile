FROM traefik:2.5.3

# Add the configuration files
RUN mkdir -p /traefik/dynamic \ 
        && echo $' \n\
[http.routers] \n\
  [http.routers.force-https] \n\
    entryPoints = ["http"] \n\
    middlewares = ["force-https"] \n\
    rule = "HostRegexp(`{any:.+}`)" \n\
    service = "noop" \n\
\n\
[http.middlewares] \n\
  [http.middlewares.force-https.redirectScheme] \n\
    scheme = "https" \n\
\n\
[http.services] \n\
  [http.services.noop.loadBalancer]'  >> /traefik/dynamic/force-https.toml \
        && touch /traefik/acme.json \
        && chmod 600 /traefik/acme.json \
        && mkdir -p /etc/traefik \
        && echo $'[log] \n\
  level = "WARN" \n\
\n\
[providers] \n\
  [providers.docker] \n\
    exposedByDefault = false \n\
  [providers.file] \n\
    directory = "/etc/traefik/dynamic" \n\
\n\
[entryPoints] \n\
  [entryPoints.http] \n\
    address = ":80" \n\
  [entryPoints.https] \n\
    address = ":443" \n\
\n\
[api]\n\
  dashboard = true\n\
  insecure = true\n\
\n\
[certificatesResolvers.lets-encrypt.acme] \n\
  storage = "/etc/traefik/acme.json" \n\
  email = "s3812552@student.rmit.edu.au" \n\
  [certificatesResolvers.lets-encrypt.acme.tlsChallenge]' >> /etc/traefik/traefik.toml
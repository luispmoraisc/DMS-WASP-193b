# Use the official Caddy image as a parent image
FROM caddy:2-builder AS builder

# Build Caddy with the specified DNS provider plugin
RUN xcaddy build \
  --with github.com/caddy-dns/cloudflare

# Use the official Caddy image to create the final image
FROM caddy:2

# install curl to support using the Caddy API
RUN apk add --no-cache curl

# Copy the custom Caddy build into the final image
COPY --from=builder /usr/bin/caddy /usr/bin/caddy
COPY ./docker/caddy/Caddyfile /etc/caddy/Caddyfile
# ─── Stage 1: Builder ─────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache python3 && \
    ln -sf python3 /usr/bin/python && \
    npm ci --omit=dev

# ─── Stage 2: Runtime ─────────────────────────────────────────
FROM node:22-alpine

# Install yt-dlp + ffmpeg (required for merging video+audio)
RUN apk add --no-cache python3 py3-pip ffmpeg curl && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

# Copy node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy app source
COPY . .

# Server port
EXPOSE 8255

# Non-root user for security
RUN addgroup -S freely && adduser -S freely -G freely && \
    mkdir -p /app/downloads && \
    chown -R freely:freely /app
USER freely

CMD ["node", "server.js"]

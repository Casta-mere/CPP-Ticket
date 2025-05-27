FROM node:18
WORKDIR /cpp-ticket
CMD ["sh", "-c", "npm install && npm run build && cp -r out/* out_exported/"]
LABEL org.opencontainers.image.authors="castamere"
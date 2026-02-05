# Especificar la plataforma es opcional pero ayuda en builds locales
FROM --platform=$BUILDPLATFORM nginx:alpine

# Copiar archivos
COPY . /usr/share/nginx/html

EXPOSE 85
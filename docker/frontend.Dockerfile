FROM node:18-alpine as builder

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml /app/
COPY ./apps/frontend /app/apps/frontend

RUN npm i -g pnpm
RUN pnpm i --filter=frontend

WORKDIR /app/apps/frontend/

RUN pnpm build

FROM nginx:1.25-alpine

WORKDIR /app

COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
COPY --from=builder /app/apps/frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

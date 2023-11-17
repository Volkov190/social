FROM node:18-alpine as builder

WORKDIR /app

COPY ../package.json ../pnpm-lock.yaml ../pnpm-workspace.yaml ./
COPY ../apps/backend/package.json ../apps/backend/tsconfig.json ../apps/backend/tsconfig.build.json ./apps/backend/
RUN npm i -g pnpm
COPY ../apps/backend ./apps/backend

RUN pnpm i --filter=backend


WORKDIR /app/apps/backend

RUN pnpm build

FROM node:18-alpine
WORKDIR /app
RUN npm i -g pnpm
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/backend/package.json /app/apps/backend/prisma ./apps/backend/
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

RUN pnpm i --filter=backend --prod

WORKDIR /app/apps/backend

CMD pnpm run start:prod

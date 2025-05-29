FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

FROM base AS deps

COPY package.json .npmrc ./

RUN npm install

FROM base AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM node:18-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/.next /app/.next  

COPY --from=deps /app/package*.json ./

RUN npm install --only=production 

EXPOSE 80 

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
USER nextjs

CMD ["npm", "start"] 

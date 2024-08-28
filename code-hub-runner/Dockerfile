FROM anuraglodhi/codehub-compilers:1.1.0 as base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 5678

CMD ["pnpm", "run", "dev"]

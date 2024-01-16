from node:20.11.0-alpine as base

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY src ./src
COPY tsconfig.json ./tsconfig.json

RUN npm run build

from node:20.11.0-alpine
COPY --from=base ./node_modules ./node_modules
COPY --from=base /dist /dist

ENV NODE_PATH=/dist/src

EXPOSE 3000
CMD ["dist/src/app.js"]
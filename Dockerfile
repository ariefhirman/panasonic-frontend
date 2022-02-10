FROM node:14

WORKDIR /panasonic-frontend
COPY package.json .
RUN npm run install
COPY . .
CMD npm run dev
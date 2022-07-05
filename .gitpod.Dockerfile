FROM gitpod/workspace-full-vnc:latest

RUN npx playwright install-deps
RUN npm i ts-node -g
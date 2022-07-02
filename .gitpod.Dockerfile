FROM gitpod/workspace-full-vnc:latest

RUN npx playwright install-deps \
    && npx playwright install
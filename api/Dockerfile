FROM denoland/deno

WORKDIR /app

EXPOSE 8080

ADD . /app

RUN deno install --entrypoint main.ts

CMD ["deno", "run", "dev"]

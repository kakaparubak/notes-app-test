import buildServer from "./server";

const server = buildServer();

async function main() {
  try {
    await server.listen({ port: 3002 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();

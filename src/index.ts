import { start } from "./app";

(async () => {
  try {
    await start();
  } catch (error) {
    console.error(error);
    console.log(error instanceof Error);

    process.exit(1);
  }
})();

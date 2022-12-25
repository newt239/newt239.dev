import axios from "axios";

export default defineEventHandler(async (e) => {
  try {
    const res = await $fetch(
      "https://hono-app.newt-house.workers.dev/spotify/my-top-tracks",
      {
        headers: {
          "Accept-Encoding": "*",
        },
      }
    );
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      error: e,
    };
  }
});

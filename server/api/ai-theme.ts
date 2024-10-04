export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  console.log(data.prompt);
  return {
    hello: data.prompt,
  };
});

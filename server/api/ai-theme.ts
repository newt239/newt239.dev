export type ResponseData = {
  variables: {
    variable_name: string;
    rgb: string;
  }[];
};

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  console.log(data.prompt);
  const res: ResponseData = { variables: [] };
  return res;
});

import axios from "axios";
export async function handler(event, context) {
  try {
    const query = event.queryStringParameters.query;
    const request = `http://www.omdbapi.com/?t=${query}&apikey=2501fa4f`;
    const headers = { Accept: "application/json" };
    const { data } = await axios.get(request, { headers });
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    console.log(err);
    return { statusCode: 500 };
  }
}

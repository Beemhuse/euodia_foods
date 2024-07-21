import { client } from "../sanity/client";

export async function getUserIdByEmail(email) {
  const query = `*[_type == "user" && email == $email][0]._id`;
  const params = { email };
  const userId = await client.fetch(query, params);
  return userId;
}

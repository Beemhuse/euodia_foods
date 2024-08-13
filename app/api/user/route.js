// pages/api/getUserByEmail.js
import { findOrCreateCustomerByEmail } from "@/utils/sanity/findOrCreateCustomer";

export async function POST(req) {
  const { email, customerDetails } = await req.json();

  try {
    // Find or create the customer by email
    const customer = await findOrCreateCustomerByEmail(email, customerDetails);

    if (customer) {
      return new Response(JSON.stringify(customer), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

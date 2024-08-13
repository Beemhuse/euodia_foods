// import { client } from "./client";

// export async function updateUserAfterOrder(userId, amount, order, isSuccess = true) {
//   try {
//     await client
//       .patch(userId)
//       .setIfMissing({ orders: [], orderCount: 0, totalSpent: 0 }) // Ensure fields are present
//       .append('orders', [{ _type: 'reference', _ref: order._id }])
//       .inc({ orderCount: 1, totalSpent: isSuccess ? amount : 0 })
//       .commit();
//   } catch (error) {
//     console.error('Error updating user:', error);
//   }
// }


// import { client } from "./client";
// import { v4 as uuidv4 } from 'uuid'; // Importing UUID to generate unique keys

// export async function updateUserAfterOrder(userId, amount, order, isSuccess = true, customerDetails = {}) {
//   try {
//     await client
//       .patch(userId)
//       .setIfMissing({ orders: [], orderCount: 0, totalSpent: 0, customer:customerDetails }) // Ensure fields are present
//       .append('orders', [{ _type: 'reference', _ref: order._id, _key: uuidv4() }]) // Adding a unique _key for each order reference
//       .set({customer: customerDetails}) // Update customer details if provided

//       .inc({ orderCount: 1, totalSpent: isSuccess ? amount : 0 })
//       .commit();
//   } catch (error) {
//     console.error('Error updating user:', error);
//   }
// }

import { client } from "./client";
import { v4 as uuidv4 } from 'uuid';
import { findOrCreateCustomerByEmail } from "./findOrCreateCustomer";

export async function updateUserAfterOrder(userId, amount, order, isSuccess = true, email, customerDetails = {}) {
  try {
    // Step 1: Find or create customer by email
    const customer = await findOrCreateCustomerByEmail(email, customerDetails);

    // Step 2: Update the user document
    await client
      .patch(userId)
      .setIfMissing({ orders: [], orderCount: 0, totalSpent: 0 }) // Ensure fields are present
      .append('orders', [{ _type: 'reference', _ref: order._id, _key: uuidv4() }]) // Add a unique _key for each order reference
      .set({ customer: { _type: 'reference', _ref: customer._id } }) // Set the customer reference
      .inc({ orderCount: 1, totalSpent: isSuccess ? amount : 0 })
      .commit();
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

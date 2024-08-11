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


import { client } from "./client";
import { v4 as uuidv4 } from 'uuid'; // Importing UUID to generate unique keys

export async function updateUserAfterOrder(userId, amount, order, isSuccess = true) {
  try {
    await client
      .patch(userId)
      .setIfMissing({ orders: [], orderCount: 0, totalSpent: 0 }) // Ensure fields are present
      .append('orders', [{ _type: 'reference', _ref: order._id, _key: uuidv4() }]) // Adding a unique _key for each order reference
      .inc({ orderCount: 1, totalSpent: isSuccess ? amount : 0 })
      .commit();
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

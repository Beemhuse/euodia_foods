// // // // pages/api/createOrder.js
// // // import { createOrder, createTransaction } from "../../lib/client";
// // // import { initializePaystack } from "../../lib/paystack";

// // import { initializePaystack } from "@/utils/lib/paystack";
// // import { createOrder, createTransaction } from "@/utils/sanity/client";

// // export async function POST(req) {

// //   const { cartItems, amount, email, note, phone, deliveryAddress, id } = await req.json();

// //   try {
// //     const paymentResponse = await initializePaystack(email, amount);
// //     const transactionRef = paymentResponse?.data.reference;
// //     const order = await createOrder(
// //       cartItems,
// //       amount,
// //       email,
// //       deliveryAddress,
// //       transactionRef,
// //       note,
// //       phone
// //     );

// //     if (order?._id) {
// //       const transaction = await createTransaction(
// //         order,
// //         amount,
// //         email,
// //         deliveryAddress,
// //         transactionRef,
// //         id,
// //         'pending', // Set default status to 'pending' or adjust as needed
// //       );

// //       return res.status(200).json({ success: true, order, transaction, paymentResponse });
// //     } else {
// //       return res.status(500).json({ error: 'Error creating order' });
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ error: error.message });
// //   }
// // }

// import { initializePaystack } from "@/utils/lib/paystack";
// import { createOrder, createTransaction } from "@/utils/sanity/client";

// export async function POST(req) {
//   const {
//     cartItems,
//     amount,
//     email,
//     note,
//     phone,
//     deliveryAddress,
//     id // This is the user ID, which may be null for anonymous users
//   } = await req.json();

//   try {
//     const paymentResponse = await initializePaystack(email, amount);
//     const transactionRef = paymentResponse?.data.reference;

//     // Create the order, with or without a user reference
//     const orderData = {
//       products: cartItems,
//       total: amount,
//       phone,
//       deliveryAddress,
//       transactionRef,
//       note,
//       user: id ? { _type: "reference", _ref: id } : null,
//       status: 'pending'
//     };

//     const order = await createOrder(orderData);

//     if (order?._id) {
//       const transaction = await createTransaction(
//         order._id,
//         amount,
//         email,
//         deliveryAddress,
//         transactionRef,
//         id,
//         'pending'
//       );

//       return new Response(JSON.stringify({ success: true, order, transaction, paymentResponse }), { status: 200 });
//     } else {
//       return new Response(JSON.stringify({ error: 'Error creating order' }), { status: 500 });
//     }
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }



import { initializePaystack } from "@/utils/lib/paystack";
import { createOrder, createTransaction } from "@/utils/sanity/client";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {

  const { cartItems, amount, fullName, email,  phoneNumber, streetAddress,orderNotes, apartment, townCity, deliveryAddress, id } = await req.json();
  const anonymousUserId = id || uuidv4(); // Generate a new anonymous ID if not provided
  try {
    const paymentResponse = await initializePaystack(email, amount);
    const transactionRef = paymentResponse?.data.reference;
    const order = await createOrder({
      cartItems,
      amount,
      email,
      name: fullName,
      streetAddress,
      apartment,
      townCity,
      phone: phoneNumber,
      deliveryAddress,
      transactionRef,
      note: orderNotes,
      user: { _type: "reference", _ref: anonymousUserId }, // Assign the user ID or anonymous ID

  });
    if (order?._id) {
      const transaction = await createTransaction(
        order,
        amount,
        email,
        deliveryAddress,
        transactionRef,
        id,
        'pending', // Set default status to 'pending' or adjust as needed
      );

      return new Response(JSON.stringify({ success: true, order, transaction, paymentResponse }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Error creating order' }), { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

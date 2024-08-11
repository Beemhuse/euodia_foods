// import { ensureUserExists } from "@/utils/lib/checkUser";
// import { initializePaystack } from "@/utils/lib/paystack";
// import { createOrder, createTransaction } from "@/utils/sanity/client";
// import { updateUserAfterOrder } from "@/utils/sanity/updateUserAfterOrder";
// import { v4 as uuidv4 } from 'uuid';

// export async function POST(req) {
//   const { cartItems, amount, fullName, email, serviceFee, phoneNumber, streetAddress, orderNotes, apartment, townCity, deliveryAddress, id } = await req.json();
  
//   console.log("service fee ===>> ", serviceFee);
  
//   // Check if user exists, otherwise generate a new anonymous ID
//   const userId = id || uuidv4();
  
//   try {
//     // Ensure the user exists in the database
//     const ensuredUser = await ensureUserExists(userId);
//     const paymentResponse = await initializePaystack(email, amount);
//     const transactionRef = paymentResponse?.data.reference;

//     // Create the order with the ensured user ID
//     const order = await createOrder({
//       total: amount,
//       products: cartItems,
//       serviceFee: { _type: "reference", _ref: serviceFee },
//       email,
//       name: fullName,
//       streetAddress,
//       apartment,
//       townCity,
//       phone: phoneNumber,
//       deliveryAddress,
//       transactionRef,
//       notes: orderNotes,
//       user: { _type: "reference", _ref: ensuredUser._id },
//     });

//     if (order?._id) {
//       const transaction = await createTransaction(
//         order,
//         amount,
//         transactionRef,
//         ensuredUser._id,
//         'pending', // Set default status to 'pending' or adjust as needed
//       );

//       // Update the user information after the order is created
//       await updateUserAfterOrder(ensuredUser._id, amount, order, true);

//       return new Response(JSON.stringify({ success: true, order, transaction, paymentResponse }), { status: 200 });
//     } else {
//       // If order creation fails, store the failed order
//       await updateUserAfterOrder(ensuredUser._id, amount, { _id: uuidv4() }, false);

//       return new Response(JSON.stringify({ error: 'Error creating order' }), { status: 500 });
//     }
//   } catch (error) {
//     console.error(error);
    
//     // Store the failed order attempt
//     await updateUserAfterOrder(userId, amount, { _id: uuidv4() }, false);

//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }


import { ensureUserExists } from "@/utils/lib/checkUser";
import { initializePaystack } from "@/utils/lib/paystack";
import { createOrder, createTransaction } from "@/utils/sanity/client";
import { updateUserAfterOrder } from "@/utils/sanity/updateUserAfterOrder";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  const { cartItems, amount, fullName, email, serviceFee, phoneNumber, streetAddress, orderNotes, apartment, townCity, deliveryAddress, id } = await req.json();

  console.log("service fee ===>> ", serviceFee);

  const userId = id || uuidv4(); // Generate a new anonymous ID if not provided
  const userInfo = { name: fullName, email, phone: phoneNumber };

  try {
    const paymentResponse = await initializePaystack(email, amount);
    const transactionRef = paymentResponse?.data.reference;

    // Ensure the user exists or create a new one
    const ensuredUser = await ensureUserExists(userId, userInfo);

    const order = await createOrder({
      total: amount,
      products: cartItems,
      serviceFee: { _type: "reference", _ref: serviceFee },
      email,
      name: fullName,
      streetAddress,
      apartment,
      townCity,
      phone: phoneNumber,
      deliveryAddress,
      transactionRef,
      notes: orderNotes,
      user: { _type: "reference", _ref: ensuredUser._id }, // Use ensured user's ID
    });

    if (order?._id) {
      const transaction = await createTransaction(
        order,
        amount,
        transactionRef,
        ensuredUser._id,
        'pending', // Set default status to 'pending' or adjust as needed
      );

      // Update the user information after the order is created
      await updateUserAfterOrder(ensuredUser._id, amount, order, true);

      return new Response(JSON.stringify({ success: true, order, transaction, paymentResponse }), { status: 200 });
    } else {
      // If order creation fails, store the failed order
      await updateUserAfterOrder(ensuredUser._id, amount, { _id: uuidv4() }, false);

      return new Response(JSON.stringify({ error: 'Error creating order' }), { status: 500 });
    }
  } catch (error) {
    console.error(error);

    // Store the failed order attempt
    await updateUserAfterOrder(userId, amount, { _id: uuidv4() }, false);

    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

import { getSession } from "@/utils/lib/auth/getSession";
import { initializePaystack } from "@/utils/lib/paystack";
import { createAnonymousUser, createOrder, createTransaction } from "@/utils/sanity/client";
import { updateTransaction, updateUserAfterOrder } from "@/utils/sanity/updateUserAfterOrder";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  const { cartItems, amount, fullName, email, serviceFee, phoneNumber, streetAddress, orderNotes, apartment, townCity, deliveryAddress, userId } = await req.json();

  let currentUserId;
  try {
    // Check if the user is signed in
    let session = await getSession(req);
    console.log("session ==>", session)
   currentUserId = userId;

    if (!session || !session.user) {
      // User is not signed in, create an anonymous user
      const anonymousUser = await createAnonymousUser(email);

      console.log("anonnymous ==>;", anonymousUser);
      currentUserId = anonymousUser._id; // Use the anonymous user's ID
    }
console.log("curcurrentUserId);", currentUserId);

    // Proceed with the order processing
    const paymentResponse = await initializePaystack(email, amount);
    const transactionRef = paymentResponse?.data.reference;
    // startFunc;

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
      // deliveryAddress,
      transactionRef,
      notes: orderNotes,
      customer: { _type: "reference", _ref: currentUserId }, // Use the current user ID (either signed-in or anonymous)
    });
console.log("order ==> ", currentUserId)
    // startFunc;

    if (order?._id) {
      const transaction = await createTransaction(
        order,
        amount,
        transactionRef,
        currentUserId,
        'pending', // Set default status to 'pending' or adjust as needed
      );
console.log("transaction ==>>", transaction)
      // Update the user's order history, order count, and total spent
      await updateUserAfterOrder(currentUserId, amount, order, true);

       // Update the transaction status if needed
       await updateTransaction(currentUserId, transaction); // Example: Update transaction status to 'pending'

      return new Response(JSON.stringify({ success: true, order, transaction, paymentResponse }), { status: 200 });
    } else {
      await updateUserAfterOrder(currentUserId, amount, { _id: uuidv4() }, false, email);
      return new Response(JSON.stringify({ error: 'Error creating order' }), { status: 500 });
    }
  } catch (error) {
    await updateUserAfterOrder(currentUserId, amount, { _id: uuidv4() }, false, email);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

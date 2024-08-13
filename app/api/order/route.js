import { getSession } from "@/utils/lib/auth/getSession";
import { initializePaystack } from "@/utils/lib/paystack";
import { createAnonymousUser, createOrder, createTransaction } from "@/utils/sanity/client";
import { updateUserAfterOrder } from "@/utils/sanity/updateUserAfterOrder";

export async function POST(req) {
  const { cartItems, amount, fullName, email, serviceFee, phoneNumber, streetAddress, orderNotes, apartment, townCity, deliveryAddress, userId } = await req.json();

  try {
    // Check if the user is signed in
    let session = await getSession(req);
    let currentUserId = userId;

    if (!session || !session.user) {
      // User is not signed in, create an anonymous user
      const anonymousUser = await createAnonymousUser(email);
      currentUserId = anonymousUser._id; // Use the anonymous user's ID
    }

    // Proceed with the order processing
    const paymentResponse = await initializePaystack(email, amount);
    const transactionRef = paymentResponse?.data.reference;

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
      user: { _type: "reference", _ref: currentUserId }, // Use the current user ID (either signed-in or anonymous)
    });

    if (order?._id) {
      const transaction = await createTransaction(
        order,
        amount,
        transactionRef,
        currentUserId,
        'pending', // Set default status to 'pending' or adjust as needed
      );

      // Update the user's order history, order count, and total spent
      await updateUserAfterOrder(currentUserId, amount, order, true, email);

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

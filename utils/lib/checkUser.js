// import { client } from "../sanity/client";

// // Function to create a new user document if needed
// export async function ensureUserExists(userId) {
//     try {
//       // Check if user exists
//       const userExists = await client.getDocument(userId);
  
//       if (!userExists) {
//         // Create a new user document if it doesn't exist
//         const newUser = await client.create({
//           _id: userId, // Use the anonymousUserId or a generated ID
//           _type: "user",
//           // Add any default fields required for a user document
//         });
  
//         console.log('Created new user:', newUser);
//         return newUser;
//       }
  
//       return userExists;
//     } catch (error) {
//       console.error('Error ensuring user exists:', error);
//       throw new Error('Failed to ensure user existence');
//     }
//   }
  
import { client } from "../sanity/client";

// Function to create a new user document if neededimport { client } from "../sanity/client";

// Function to ensure a user document exists, or return the existing one
export async function ensureUserExists(customerId) {
  console.log(customerId)
  try {
    // Check if a user document with the given customer reference exists
    const existingUser = await client.fetch(
      `*[_type == "user" && customer._ref == $customerId][0]`,
      { customerId }
    );

    if (existingUser) {
      // Return the existing user document if found
      return existingUser;
    }

    // If no such user document exists, create a new one
    const newUser = await client.createIfNotExists({
      _id: customerId, // Use the customerId as the user ID or generate a new one if needed
      _type: "user",
      customer: { _type: 'reference', _ref: customerId },
      // Add any default fields required for a user document
    });

    console.log('Created new user:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error ensuring user exists:', error);
    throw new Error('Failed to ensure user existence');
  }
}

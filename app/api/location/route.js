import { client } from '@/utils/sanity/client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { locationName, fee } = await req.json();

    // Create a location document
    const locationDoc = await client.create({
      _type: 'location',
      name: locationName,
    });

    // Create a service fee document
    const serviceFeeDoc = await client.create({
      _type: 'serviceFee',
      location: {
        _type: 'reference',
        _ref: locationDoc._id,
      },
      fee: fee,
    });

    return NextResponse.json({
      success: true,
      location: locationDoc,
      serviceFee: serviceFeeDoc,
    });
  } catch (error) {
    console.error('Error creating service fee or location:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}


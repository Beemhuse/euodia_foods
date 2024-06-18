import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '8bms2xqg',
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: false,
});

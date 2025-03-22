import data from '@/lib/db.json';

export async function GET() {
  const customers = data.customers;
  return Response.json(customers);
}

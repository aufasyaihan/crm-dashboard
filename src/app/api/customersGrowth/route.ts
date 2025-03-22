import data from '@/lib/db.json';

export async function GET() {
  const customerGrowth = data.customersGrowth;
  return Response.json(customerGrowth);
}

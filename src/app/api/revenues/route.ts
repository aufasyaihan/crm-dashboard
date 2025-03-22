import data from '@/lib/db.json';

export async function GET() {
  const revenues = data.revenues;
  return Response.json(revenues);
}

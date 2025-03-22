import data from '@/lib/db.json';

export async function GET() {
  const reports = data.reports;
  return Response.json(reports);
}

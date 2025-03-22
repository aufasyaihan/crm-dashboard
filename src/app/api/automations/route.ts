import data from '@/lib/db.json';

export async function GET() {
  const automations = data.automations;
  return Response.json(automations);
}

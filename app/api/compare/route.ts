import { waters } from '../../../data/waters';

export async function POST(req: Request) {
  const { ids } = await req.json();
  const metrics = ['pH','hardness','calcium','magnesium','sodium','nitrate'];

  const scored = waters
    .filter(w => ids.includes(w.id))
    .map(w => ({
      ...w,
      score: metrics.reduce((a,m)=>a + w[m],0)
    }));

  scored.sort((a,b)=>b.score-a.score);
  return Response.json({ samples: scored, best: scored[0] });
}

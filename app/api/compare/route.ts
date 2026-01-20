import { waters } from "../../../data/waters";

export async function POST(request: Request) {
  const { ids } = await request.json();
  const selected = waters.filter(w => ids.includes(w.id));
  if (selected.length === 0) {
    return Response.json({ error: "No water selected" }, { status: 400 });
  }

  const metrics = ["pH","hardness","calcium","magnesium","sodium","nitrate"];
  const values = selected.map(w => metrics.map(m => w[m]));
  const means = metrics.map((_, i) => values.map(v => v[i]).reduce((a,b) => a+b)/values.length);
  const stds = metrics.map((_, i) => Math.sqrt(values.map(v => (v[i]-means[i])**2).reduce((a,b)=>a+b)/values.length));

  const results = selected.map(w => {
    const norm = metrics.map((m, i) => stds[i] === 0 ? 0 : (w[m]-means[i])/stds[i]);
    const score = norm.reduce((a,b) => a+b, 0);
    return {...w, normalized: Object.fromEntries(metrics.map((m,i) => [m, norm[i]])), score};
  });

  results.sort((a,b) => b.score - a.score);
  return Response.json({ samples: results, best: results[0] });
}
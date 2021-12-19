import { resolver } from "blitz";
import db from "db";
import { z } from "zod";

const UpdateGoal = z.object({
  id: z.number(),
  title: z.string(),
  description: z.ostring(),
});

export default resolver.pipe(resolver.zod(UpdateGoal), resolver.authorize(), async ({ id, ...data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const goal = await db.goal.update({ where: { id }, data });

  return goal;
});

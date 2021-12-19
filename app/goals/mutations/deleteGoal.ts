import { resolver } from "blitz";
import db from "db";
import { z } from "zod";

const DeleteGoal = z.object({
  id: z.number(),
});

export default resolver.pipe(resolver.zod(DeleteGoal), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const goal = await db.goal.deleteMany({ where: { id } });

  return goal;
});

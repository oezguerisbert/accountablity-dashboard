import { resolver, NotFoundError } from "blitz";
import db from "db";
import { z } from "zod";

const GetGoal = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
});

export default resolver.pipe(resolver.zod(GetGoal), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const goal = await db.goal.findFirst({ where: { id } });

  if (!goal) throw new NotFoundError();

  return goal;
});

import { resolver } from "blitz";
import db from "db";
import { z } from "zod";

const CreateGoal = z.object({
  name: z.string(),
});

export default resolver.pipe(resolver.zod(CreateGoal), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const goal = await db.goal.create({ data: input });

  return goal;
});

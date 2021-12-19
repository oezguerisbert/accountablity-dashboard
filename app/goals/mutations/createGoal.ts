import { resolver } from "blitz";
import db from "db";
import { z } from "zod";

const CreateGoal = z.object({
  userId: z.number(),
  title: z.string(),
  description: z.ostring(),
});

export default resolver.pipe(resolver.zod(CreateGoal), resolver.authorize(), async ({ userId, ...input }) => {
  const goal = await db.goal.create({ data: { ...input, user: { connect: { id: userId } } } });

  return goal;
});

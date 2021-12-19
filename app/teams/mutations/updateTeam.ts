import { resolver } from "blitz";
import db from "db";
import { z } from "zod";

const UpdateTeam = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(resolver.zod(UpdateTeam), resolver.authorize(), async ({ id, ...data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const team = await db.team.update({ where: { id }, data });

  return team;
});

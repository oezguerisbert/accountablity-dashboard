import { resolver } from "blitz";
import db from "db";
import { z } from "zod";

const DeleteTeam = z.object({
  id: z.number(),
});

export default resolver.pipe(resolver.zod(DeleteTeam), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const team = await db.team.deleteMany({ where: { id } });

  return team;
});

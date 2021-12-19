import { resolver } from "blitz";
import db from "db";
import { z } from "zod";

const CreateTeam = z.object({
  name: z.string(),
});

export default resolver.pipe(resolver.zod(CreateTeam), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const team = await db.team.create({ data: input });

  return team;
});

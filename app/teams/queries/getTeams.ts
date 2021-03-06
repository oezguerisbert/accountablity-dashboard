import { paginate, resolver } from "blitz";
import db, { Prisma } from "db";

interface GetTeamsInput extends Pick<Prisma.TeamFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(resolver.authorize(), async ({ where, orderBy, skip = 0, take = 100 }: GetTeamsInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: teams,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.team.count({ where }),
    query: (paginateArgs) => db.team.findMany({ ...paginateArgs, where, orderBy }),
  });

  return {
    teams,
    nextPage,
    hasMore,
    count,
  };
});

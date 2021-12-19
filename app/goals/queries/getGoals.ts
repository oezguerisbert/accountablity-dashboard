import { paginate, resolver } from "blitz";
import db, { Prisma } from "db";

interface GetGoalsInput extends Pick<Prisma.GoalFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(resolver.authorize(), async ({ where, orderBy, skip = 0, take = 100 }: GetGoalsInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: goals,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.goal.count({ where }),
    query: (paginateArgs) => db.goal.findMany({ ...paginateArgs, where, orderBy }),
  });

  return {
    goals,
    nextPage,
    hasMore,
    count,
  };
});

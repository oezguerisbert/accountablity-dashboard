import { Suspense } from "react";
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, useParam } from "blitz";
import Layout from "app/core/layouts/Layout";
import getGoals from "app/goals/queries/getGoals";

const ITEMS_PER_PAGE = 100;

export const GoalsList = () => {
  const router = useRouter();
  const userId = useParam("userId", "number");
  const page = Number(router.query.page) || 0;
  const [{ goals, hasMore }] = usePaginatedQuery(getGoals, {
    orderBy: { id: "asc" },
    where: { userId: userId as number },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <Link href={Routes.ShowGoalPage({ userId: userId as number, goalId: goal.id })}>
              <a>{goal.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const GoalsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Goals</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewGoalPage()}>
            <a>Create Goal</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <GoalsList />
        </Suspense>
      </div>
    </>
  );
};

GoalsPage.authenticate = true;
GoalsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default GoalsPage;

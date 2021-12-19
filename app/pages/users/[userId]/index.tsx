import { Suspense } from "react";
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, useParam } from "blitz";
import Layout from "app/core/layouts/Layout";
import getGoals from "app/goals/queries/getGoals";
import { List, Anchor, Button, Box } from "@mantine/core";

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
    <>
      <List>
        {goals.map((goal) => (
          <List.Item
            key={goal.id}
            sx={(theme) => ({
              cursor: "pointer",
              listStyle: "none",
              width: "100%",
              height: "100%",
              padding: theme.spacing.xl,
            })}
            onClick={() => {
              router.push(Routes.ShowGoalPage({ userId: userId as number, goalId: goal.id }));
            }}
          >
            <Link href={Routes.ShowGoalPage({ userId: userId as number, goalId: goal.id })} passHref>
              <Button size="xl">{goal.title}</Button>
            </Link>
          </List.Item>
        ))}
      </List>

      <Button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </Button>
      <Button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </Button>
    </>
  );
};

const UserPage: BlitzPage = () => {
  const userId = useParam("userId", "number");

  return (
    <>
      <Head>
        <title>Goals</title>
      </Head>

      <Link href={Routes.NewGoalPage({ userId: userId as number })} passHref>
        <Anchor>
          <Button>Create Goal</Button>
        </Anchor>
      </Link>

      <Suspense fallback={<div>Loading...</div>}>
        <GoalsList />
      </Suspense>
    </>
  );
};

UserPage.authenticate = true;
UserPage.getLayout = (page) => <Layout>{page}</Layout>;

export default UserPage;

import { Suspense } from "react";
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import getGoal from "app/goals/queries/getGoal";
import deleteGoal from "app/goals/mutations/deleteGoal";
import { Title, Button, Anchor } from "@mantine/core";

export const Goal = () => {
  const router = useRouter();
  const goalId = useParam("goalId", "number");
  const userId = useParam("userId", "number");
  const [deleteGoalMutation] = useMutation(deleteGoal);
  const [goal] = useQuery(getGoal, { id: goalId });

  return (
    <>
      <Head>
        <title>{goal.title}</title>
      </Head>

      <Title order={1}>Goal {goal.title}</Title>
      <Link href={Routes.EditGoalPage({ userId: userId as number, goalId: goal.id })}>
        <Anchor>
          <Button>Edit</Button>
        </Anchor>
      </Link>

      <Button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteGoalMutation({ id: goal.id });
            router.push(Routes.GoalsPage({ userId: userId as number }));
          }
        }}
        style={{ marginLeft: "0.5rem" }}
      >
        Delete
      </Button>
    </>
  );
};

const ShowGoalPage: BlitzPage = () => {
  const userId = useParam("userId", "number");

  return (
    <>
      <>
        <Link href={Routes.GoalsPage({ userId: userId as number })}>
          <Anchor>
            <Button>Goals</Button>
          </Anchor>
        </Link>
      </>

      <Suspense fallback={<div>Loading...</div>}>
        <Goal />
      </Suspense>
    </>
  );
};

ShowGoalPage.authenticate = true;
ShowGoalPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowGoalPage;

import { Suspense } from "react";
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import getGoal from "app/goals/queries/getGoal";
import updateGoal from "app/goals/mutations/updateGoal";
import { GoalForm, FORM_ERROR } from "app/goals/components/GoalForm";
import { Title } from "@mantine/core";

export const EditGoal = () => {
  const router = useRouter();
  const goalId = useParam("goalId", "number");
  const userId = useParam("userId", "number");
  const [goal, { setQueryData }] = useQuery(
    getGoal,
    { id: goalId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateGoalMutation] = useMutation(updateGoal);

  return (
    <>
      <Head>
        <title>Edit Goal {goal.id}</title>
      </Head>

      <>
        <Title>Edit Goal {goal.id}</Title>

        <GoalForm
          submitText="Update Goal"
          initialValues={goal}
          onSubmit={async (values) => {
            try {
              const updated = await updateGoalMutation({
                id: goal.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(Routes.ShowGoalPage({ userId: userId as number, goalId: updated.id }));
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </>
    </>
  );
};

const EditGoalPage: BlitzPage = () => {
  const userId = useParam("userId", "number");

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditGoal />
      </Suspense>

      <p>
        <Link href={Routes.GoalsPage({ userId: userId as number })}>
          <a>Goals</a>
        </Link>
      </p>
    </div>
  );
};

EditGoalPage.authenticate = true;
EditGoalPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditGoalPage;

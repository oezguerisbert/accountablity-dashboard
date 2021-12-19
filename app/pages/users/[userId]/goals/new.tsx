import { Link, useRouter, useMutation, BlitzPage, Routes, useParam } from "blitz";
import Layout from "app/core/layouts/Layout";
import createGoal from "app/goals/mutations/createGoal";
import { GoalForm, FORM_ERROR } from "app/goals/components/GoalForm";
import { Anchor, Title } from "@mantine/core";

const NewGoalPage: BlitzPage = () => {
  const router = useRouter();
  const userId = useParam("userId", "number");
  const [createGoalMutation] = useMutation(createGoal);

  return (
    <>
      <Title order={1}>Create New Goal</Title>

      <GoalForm
        submitText="Create Goal"
        onSubmit={async (values) => {
          try {
            const goal = await createGoalMutation(Object.assign(values, { userId: userId as number }));
            router.push(Routes.ShowGoalPage({ userId: userId as number, goalId: goal.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <>
        <Link href={Routes.GoalsPage({ userId: userId as number })} passHref>
          <Anchor>Goals</Anchor>
        </Link>
      </>
    </>
  );
};

NewGoalPage.authenticate = true;
NewGoalPage.getLayout = (page) => <Layout title={"Create New Goal"}>{page}</Layout>;

export default NewGoalPage;

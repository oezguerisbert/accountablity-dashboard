import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import createGoal from "app/goals/mutations/createGoal";
import { GoalForm, FORM_ERROR } from "app/goals/components/GoalForm";

const NewGoalPage: BlitzPage = () => {
  const router = useRouter();
  const [createGoalMutation] = useMutation(createGoal);

  return (
    <div>
      <h1>Create New Goal</h1>

      <GoalForm
        submitText="Create Goal"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateGoal}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const goal = await createGoalMutation(values);
            router.push(Routes.ShowGoalPage({ goalId: goal.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.GoalsPage()}>
          <a>Goals</a>
        </Link>
      </p>
    </div>
  );
};

NewGoalPage.authenticate = true;
NewGoalPage.getLayout = (page) => <Layout title={"Create New Goal"}>{page}</Layout>;

export default NewGoalPage;

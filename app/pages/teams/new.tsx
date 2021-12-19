import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import createTeam from "app/teams/mutations/createTeam";
import { TeamForm, FORM_ERROR } from "app/teams/components/TeamForm";

const NewTeamPage: BlitzPage = () => {
  const router = useRouter();
  const [createTeamMutation] = useMutation(createTeam);

  return (
    <div>
      <h1>Create New Team</h1>

      <TeamForm
        submitText="Create Team"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTeam}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const team = await createTeamMutation(values);
            router.push(Routes.ShowTeamPage({ teamId: team.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.TeamsPage()}>
          <a>Teams</a>
        </Link>
      </p>
    </div>
  );
};

NewTeamPage.authenticate = true;
NewTeamPage.getLayout = (page) => <Layout title={"Create New Team"}>{page}</Layout>;

export default NewTeamPage;

import { Suspense } from "react";
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import getTeam from "app/teams/queries/getTeam";
import updateTeam from "app/teams/mutations/updateTeam";
import { TeamForm, FORM_ERROR } from "app/teams/components/TeamForm";

export const EditTeam = () => {
  const router = useRouter();
  const teamId = useParam("teamId", "number");
  const [team, { setQueryData }] = useQuery(
    getTeam,
    { id: teamId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateTeamMutation] = useMutation(updateTeam);

  return (
    <>
      <Head>
        <title>Edit Team {team.id}</title>
      </Head>

      <div>
        <h1>Edit Team {team.id}</h1>
        <pre>{JSON.stringify(team, null, 2)}</pre>

        <TeamForm
          submitText="Update Team"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTeam}
          initialValues={team}
          onSubmit={async (values) => {
            try {
              const updated = await updateTeamMutation({
                id: team.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(Routes.ShowTeamPage({ teamId: updated.id }));
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditTeamPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTeam />
      </Suspense>

      <p>
        <Link href={Routes.TeamsPage()}>
          <a>Teams</a>
        </Link>
      </p>
    </div>
  );
};

EditTeamPage.authenticate = true;
EditTeamPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditTeamPage;

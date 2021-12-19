import { Suspense } from "react";
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import getTeam from "app/teams/queries/getTeam";
import updateTeam from "app/teams/mutations/updateTeam";
import { TeamForm, FORM_ERROR } from "app/teams/components/TeamForm";
import { Anchor, Title, Button } from "@mantine/core";

export const EditTeam = () => {
  const router = useRouter();
  const teamId = useParam("teamId", "number");
  const [team, { setQueryData }] = useQuery(
    getTeam,
    { id: teamId },
    {
      staleTime: Infinity,
    }
  );
  const [updateTeamMutation] = useMutation(updateTeam);

  return (
    <>
      <Head>
        <title>Edit Team {team.id}</title>
      </Head>

      <>
        <Title>Edit Team {team.id}</Title>

        <TeamForm
          submitText="Update Team"
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
      </>
    </>
  );
};

const EditTeamPage: BlitzPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTeam />
      </Suspense>

      <Link href={Routes.TeamsPage()}>
        <Anchor>
          <Button>Teams</Button>
        </Anchor>
      </Link>
    </>
  );
};

EditTeamPage.authenticate = true;
EditTeamPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditTeamPage;

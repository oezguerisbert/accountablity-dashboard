import { Suspense } from "react";
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import getTeam from "app/teams/queries/getTeam";
import deleteTeam from "app/teams/mutations/deleteTeam";

export const Team = () => {
  const router = useRouter();
  const teamId = useParam("teamId", "number");
  const [deleteTeamMutation] = useMutation(deleteTeam);
  const [team] = useQuery(getTeam, { id: teamId });

  return (
    <>
      <Head>
        <title>Team {team.id}</title>
      </Head>

      <div>
        <h1>Team {team.id}</h1>
        <pre>{JSON.stringify(team, null, 2)}</pre>

        <Link href={Routes.EditTeamPage({ teamId: team.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTeamMutation({ id: team.id });
              router.push(Routes.TeamsPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowTeamPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TeamsPage()}>
          <a>Teams</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Team />
      </Suspense>
    </div>
  );
};

ShowTeamPage.authenticate = true;
ShowTeamPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowTeamPage;

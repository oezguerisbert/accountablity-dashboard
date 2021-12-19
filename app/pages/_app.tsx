import { AppShell, Avatar, Box, Header, MantineProvider, Menu, Divider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { MapIcon, UserIcon, LogoutIcon, SparklesIcon } from "@heroicons/react/solid";
import LoginForm from "app/auth/components/LoginForm";
import getGoals from "app/goals/queries/getGoals";
import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQuery,
  useQueryErrorResetBoundary,
  useRouter,
  Routes,
} from "blitz";
import { useMemo, Suspense, useState } from "react";
import { useCurrentUser } from "../core/hooks/useCurrentUser";
import { useMutation, Link } from "blitz";
import logout from "app/auth/mutations/logout";

const UserInfo = () => {
  const router = useRouter();
  const avatar = <Avatar radius="xl" size="md" color="teal" sx={(theme) => ({ cursor: "pointer" })} />;
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);
  const [baseMenuItems] = useState([
    <Menu.Label
      key={2}
      sx={(theme) => ({
        alignContent: "center",
        display: "flex",
        gap: theme.spacing.xs,
        color: `${theme.colors.teal![6]} !important`,
      })}
    >
      <UserIcon width={15} />
      User
    </Menu.Label>,
    <Menu.Item key={3} icon={<UserIcon width={15} />} color="blue">
      My Profile
    </Menu.Item>,
    <Menu.Item
      key={4}
      icon={<SparklesIcon width={15} />}
      color="yellow"
      onClick={() => {
        router.push(Routes.GoalsPage({ userId: currentUser!.id }));
      }}
    >
      My Goals
    </Menu.Item>,
    <Menu.Item
      key={5}
      icon={<LogoutIcon width={15} />}
      color="red"
      onClick={() => {
        logoutMutation();
      }}
    >
      Logout
    </Menu.Item>,
  ]);
  return currentUser === null ? (
    <Link href={Routes.LoginPage()}>{avatar}</Link>
  ) : (
    <Menu control={avatar} withArrow>
      {baseMenuItems}
    </Menu>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <ModalsProvider>
        <AppShell
          padding={0}
          header={
            <Header height={70} sx={{ position: "fixed" }}>
              <Box
                sx={(theme) => ({
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  height: "100%",
                  paddingLeft: theme.spacing.lg,
                  paddingRight: theme.spacing.lg,
                })}
              >
                <Box sx={(theme) => ({ display: "flex", flexDirection: "row", marginLeft: "auto" })} />
                <Box sx={(theme) => ({ display: "flex", flexDirection: "row", marginLeft: "auto" })}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <UserInfo />
                  </Suspense>
                </Box>
              </Box>
            </Header>
          }
        >
          <ErrorBoundary FallbackComponent={RootErrorFallback} onReset={useQueryErrorResetBoundary().reset}>
            {getLayout(<Component {...pageProps} />)}
          </ErrorBoundary>
        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  );
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />;
  } else if (error instanceof AuthorizationError) {
    return <ErrorComponent statusCode={error.statusCode} title="Sorry, you are not authorized to access this" />;
  } else {
    return <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />;
  }
}

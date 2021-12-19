import { Head, BlitzLayout } from "blitz";
import { Box, Container } from "@mantine/core";

const Layout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "Accountability Dashboard"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          paddingTop: 70,
          paddingBottom: theme.spacing.xl,
        })}
      >
        <Container size="lg">{children}</Container>
      </Box>
    </>
  );
};

export default Layout;

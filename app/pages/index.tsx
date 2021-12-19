import { Suspense } from "react";
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz";
import Layout from "app/core/layouts/Layout";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import logout from "app/auth/mutations/logout";
import logo from "public/logo.png";

const Home: BlitzPage = () => {
  return <></>;
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;

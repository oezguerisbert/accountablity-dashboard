import Layout from "app/core/layouts/Layout";
import { BlitzPage } from "blitz";

const Home: BlitzPage = () => {
  return <></>;
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;

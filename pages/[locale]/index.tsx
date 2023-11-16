import { NextPage } from "next";
import HomePage from "../../components/pages/home";
import {
  AvailableLanguageTag,
  setLanguageTag,
} from "../../src/paraglide/runtime";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  setLanguageTag(router.query.locale as AvailableLanguageTag);

  return <HomePage />;
};

export default Home;

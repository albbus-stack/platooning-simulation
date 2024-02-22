import { NextPage } from "next";
import HomePage from "../../components/pages/home";
import {
  AvailableLanguageTag,
  availableLanguageTags,
  setLanguageTag,
} from "../../src/paraglide/runtime";
import { useRouter } from "next/router";
import PageNotFound from "../../components/pages/404";

const Home: NextPage = () => {
  const router = useRouter();

  if (
    availableLanguageTags.includes(router.query.locale as AvailableLanguageTag)
  ) {
    setLanguageTag(router.query.locale as AvailableLanguageTag);
  } else if (router.query.locale) {
    return <PageNotFound />;
  }

  return <HomePage />;
};

export default Home;

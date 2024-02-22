import { NextPage } from "next";
import AboutPage from "../../components/pages/about";
import {
  AvailableLanguageTag,
  availableLanguageTags,
  setLanguageTag,
} from "../../src/paraglide/runtime";
import { useRouter } from "next/router";
import PageNotFound from "../../components/pages/404";

const About: NextPage = () => {
  const router = useRouter();

  if (
    availableLanguageTags.includes(router.query.locale as AvailableLanguageTag)
  ) {
    setLanguageTag(router.query.locale as AvailableLanguageTag);
  } else if (router.query.locale) {
    return <PageNotFound />;
  }

  return <AboutPage />;
};

export default About;

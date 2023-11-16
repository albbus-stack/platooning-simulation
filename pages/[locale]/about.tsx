import { NextPage } from "next";
import AboutPage from "../../components/pages/about";
import {
  AvailableLanguageTag,
  setLanguageTag,
} from "../../src/paraglide/runtime";
import { useRouter } from "next/router";

const About: NextPage = () => {
  const router = useRouter();
  setLanguageTag(router.query.locale as AvailableLanguageTag);

  return <AboutPage />;
};

export default About;

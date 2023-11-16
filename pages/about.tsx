import { NextPage } from "next";
import { useEffect } from "react";
import { setLanguageTag } from "../src/paraglide/runtime";
import AboutPage from "../components/pages/about";

const About: NextPage = () => {
  useEffect(() => {
    setLanguageTag("en");
  }, []);

  return <AboutPage />;
};

export default About;

import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import HomeIcon from "../../components/icons/HomeIcon";
import { useEffect } from "react";
import { languageTag, setLanguageTag } from "../../src/paraglide/runtime";
import AboutPage from "../../components/pages/about";

const About: NextPage = () => {
  useEffect(() => {
    setLanguageTag("it");
  }, []);

  return <AboutPage />;
};

export default About;

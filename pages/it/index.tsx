import { NextPage } from "next";
import { useEffect } from "react";
import HomePage from "../../components/pages/home";
import { setLanguageTag } from "../../src/paraglide/runtime";

const Home: NextPage = () => {
  useEffect(() => {
    setLanguageTag("it");
  }, []);

  return <HomePage />;
};

export default Home;

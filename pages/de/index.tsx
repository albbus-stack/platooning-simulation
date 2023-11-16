import { NextPage } from "next";
import HomePage from "../../components/pages/home";
import { setLanguageTag } from "../../src/paraglide/runtime";

const Home: NextPage = () => {
  setLanguageTag("de");

  return <HomePage />;
};

export default Home;

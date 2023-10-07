import HeaderGuess from "../../components/headerGuess";
import Content from "./content";
import FooterGuess from "../../components/footerGuess";
function HomePage() {
  return (
    <>
      <div className="fill-height">
        <HeaderGuess />
        <Content />
        <FooterGuess />
      </div>
    </>
  );
}

export default HomePage;

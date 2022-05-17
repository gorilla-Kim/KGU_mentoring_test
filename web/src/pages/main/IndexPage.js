// import logo from '../../logo.svg';
// import '../../App.css';
import { Link } from "react-router-dom";
import Footer from "../../views/common/Footer";
import Header from "../../views/common/Header";
import MainView from "../../views/main/MainView";

const IndexPage = (props) => {
  return (
    <div>
      <Header/>
      <main className="container">
        <MainView/>
      </main>
      <Footer/>
    </div>
  );
}

export default IndexPage;

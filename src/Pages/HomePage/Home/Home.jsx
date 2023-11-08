// import Navbar from "../Navbar/Navbar";

import Footer from "../../Footer/Footer";
import Banner from "../Banner/Banner";
import NewsLetter from "../NewsLetter/NewsLetter";
import RecentBlogs from "../RecentBlogs/RecentBlogs";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <RecentBlogs></RecentBlogs>
      <NewsLetter></NewsLetter>
      <Footer></Footer>
    </div>
  );
};

export default Home;

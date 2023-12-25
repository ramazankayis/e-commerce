import React from "react";
import Blogs from "../components/Blogs/Blogs";
import Brands from "../components/Brands/Brands";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import Campaigns from "../components/Campaigns/Campaigns";
import Categories from "../components/Categories/Categories"; 
import Policy from "../components/Layout/Policy/Policy";
import Products from "../components/Products/Products";
import Sliders from "../components/Slider/Sliders";

const HomePage = () => {
  return (
    <React.Fragment>
    
      <Sliders />
      <h1>hello</h1>
      <Categories />
      <Products />
      <Campaigns />
      <Products />
      <Blogs />
      <Brands />
      <CampaignSingle />
     
    </React.Fragment>
  );
};

export default HomePage;

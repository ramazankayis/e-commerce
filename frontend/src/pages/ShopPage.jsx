import React from "react"; 
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";
import Policy from "../components/Layout/Policy/Policy";
 

const ShopPage = () => {
  return (
    <React.Fragment>
  
      <Categories />
      <Products />
      <CampaignSingle />
      <Products />
  
    </React.Fragment>
  );
};

export default ShopPage;

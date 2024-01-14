import Gallery from "./Gallery/Gallery";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import "./ProductDetails.css";
import Info from "./Info/Info";
import Tabs from "./Tabs/Tabs";
const ProductDetails = ({singleProduct}) => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <Breadcrumb />

          <div className="single-content">
            <main className="site-main">
              <Gallery singleProduct={singleProduct}/>
              <Info singleProduct={singleProduct} />
            </main>
          </div>

          <Tabs singleProduct={singleProduct}/>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

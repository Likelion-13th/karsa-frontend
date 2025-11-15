import React, { useState,useEffect } from 'react';
import Banner from './Banner';
import ProductCard from './ProductCard';
import "../../styles/ProductPage.css";
import PayModal from "../../components/PayModal";
import axios from "axios";
import { useCookies } from "react-cookie";

const Perfume = () => {
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [cookies] = useCookies(["accessToken"]);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    if(typeof cookies.accessToken !== "string"){
        alert("로그인이 필요합니다");
      return;
    }
    setModalOpen(true);
  };

  const handleCardClose = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  useEffect (()=> {
      axios
        .get("/categories/3/items", { //11월 13일 멋사 과제는 이거 숫자만 다르게 하면 됨...!
              headers: {
              accept: "*/*",
                    
                },
                })
                .then((response) => {
                    setProducts(response.data.result);
                })
                .catch((err) => {
                console.log("CATEGORY API 요청 실패", err);
                });
            }, []);

  return (
    <div>
      <Banner title="Perfume" imagePath={"/banner_diffuser3.png"} />
      <div className="product-container">
        <div className="product-grid">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleCardClick(product)}
            />
          ))}
        </div>
        
        <div className="paging">
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Prev
            </button>
          )}
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={currentPage === pageNumber ? 'active' : ''}
              >
                {pageNumber}
              </button>
            )
          )}
          
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <PayModal product={selectedProduct} onClose={() => handleCardClose()} />
      )}
    </div>
  );
};

export default Perfume;

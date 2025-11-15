import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import ProductCard from './ProductCard';
import "../../styles/ProductPage.css";
import PayModal from "../../components/PayModal";
import axios from "axios";
import { useCookies } from "react-cookie";

const Perfume = () => {
  const [products, setProducts] = useState([]);      // 항상 배열 보장
  const [loading, setLoading] = useState(true);      // (선택) 로딩 표시
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [cookies] = useCookies(["accessToken"]);
  const itemsPerPage = 5;

  // ✅ 안전한 길이 계산
  const totalPages = Math.ceil(((products && Array.isArray(products) ? products.length : 0) / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // ✅ products가 undefined여도 안전
  const currentProducts = (Array.isArray(products) ? products : []).slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    if (typeof cookies.accessToken !== "string") {
      alert("로그인이 필요합니다");
      return;
    }
    setModalOpen(true);
  };

  const handleCardClose = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/categories/3/items", {
          headers: { accept: "*/*" },
        });
        const list = response?.data?.result;
        // ✅ 응답이 배열인지 확인하고 아니면 빈 배열
        setProducts(Array.isArray(list) ? list : []);
      } catch (err) {
        console.log("CATEGORY API 요청 실패", err);
        setError("상품 목록을 불러오지 못했습니다.");
        setProducts([]); // 실패 시에도 배열 유지
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <Banner title="Perfume" imagePath={"/banner_diffuser3.png"} />

      <div className="product-container">
        {/* (선택) 로딩/에러 UI */}
        {loading && <p>로딩 중…</p>}
        {!loading && error && <p>{error}</p>}

        <div className="product-grid">
          {(currentProducts ?? []).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleCardClick(product)}
            />
          ))}
          {!loading && (!products || products.length === 0) && (
            <p>표시할 상품이 없습니다.</p>
          )}
        </div>

        {/* 페이지네이션도 안전하게 */}
        {totalPages > 0 && (
          <div className="paging">
            {currentPage > 1 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={currentPage === pageNumber ? 'active' : ''}
              >
                {pageNumber}
              </button>
            ))}

            {currentPage < totalPages && (
              <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <PayModal product={selectedProduct} onClose={handleCardClose} />
      )}
    </div>
  );
};

export default Perfume;

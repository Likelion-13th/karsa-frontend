import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import ProductCard from "./ProductCard";
import "../../styles/ProductPage.css";
import PayModal from "../../components/PayModal";
import axios from "axios";
import { useCookies } from "react-cookie";

const New = () => {
    const [products, setProducts] = useState([]);




    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [cookies] = useCookies(["accessToken"]);

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        if(typeof cookies.accessToken !== "string"){
                alert("로그인이 필요합니다");
            return;
        }
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setModalOpen(false);
    };

    useEffect (()=> {
        axios
            .get("/categories/1/items", { //11월 13일 멋사 과제는 이거 숫자만 다르게 하면 됨...!
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
            <Banner title = "New" imagePath={"/banner_diffuser4.png"} />
            <div className="product-container">
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard 
                        key={product.id} 
                        product={product}
                        onClick={() => handleCardClick(product)} />
                    ))}
                </div>

     
            </div>
              {isModalOpen && (
        <PayModal product={selectedProduct} onClose={handleCloseModal} />
    )}
        </div>
    );
};

export default New;
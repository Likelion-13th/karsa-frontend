import React, {useState, useEffect} from "react";
import "../styles/PayModal.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const PayModal = ({product, onClose}) => {
    const [cookies] = useCookies(["accessToken"]);
    // 주문할 상품 개수(기본값 1개)
    const [quantity, setQuantity] = useState(1);
    // 사용자가 입력한 마일리지 금액
    const [mileageToUse, setMileageToUse] = useState("");
    // 최대 사용 가능 마일리지
    //const maxMileage = 100000;
    const [maxMileage, setMaxMileage] = useState(0);

    useEffect (()=> {
            axios
                .get("/users/mileage", { 
                    headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${cookies.accessToken}`,   
                },
                })
                .then((response) => {
                    setMaxMileage(response.data.result.maxMileage); //기억해두기
                })
                .catch((err) => {
                console.log(" API 요청 실패", err);
                });
            }, [cookies.accessToken]);
    // 상품 가격
    const [, setProductPrice] = useState(product.price);
    // 총 결제 금액
    const [totalPrice, setTotalPirce] = useState(product.price);

    // 수량 증가 및 감소 함수
    const handleQuantityChange = (type) => {
        setQuantity((prev) => (type === "plus" ? prev + 1 : Math.max(1, prev -1)));
    };

    useEffect(() => {
        const newProductPrice = product.price * quantity;
        setProductPrice(newProductPrice);
        setTotalPirce(Math.max(newProductPrice-mileageToUse, 0));
    }, [quantity, mileageToUse, product.price]);

    //input에 입력할 때 실행
    const handleMileageChange = (e) => {
        const value = e.target.value;
        const numericValue = value === "" ? 0 : Math.min(Number(value), maxMileage);
        setMileageToUse(numericValue);
    };

    const handlePayment = async () => {{
        try{
            const response = await axios.post("/orders",
                {
                    itemId: product.id,
                    quantity: quantity,
                    mileageToUse: mileageToUse,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        
                        Authorization: `Bearer ${cookies.accessToken}`,
                    },
                }
            );

            if(response.data.isSuccess){
                alert("주문이 성공적으로 생성되었습니다.");
                onClose();
            } else{
                alert(`주문 실패: ${response.data.message}`);
            }
        } catch (error){
            console.error("결제 오류:", error);
            alert("결제 처리 중 오류가 발생했습니다.");
        }
    }};

    return (
        <div className="modal">
            <div className="overlay" onClick={onClose}></div>

            <div className="container">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <div className="title">주문 / 결제</div>

                <div className="section">
                    <div className="section-title">주문 상품</div>
                    <div className="order-info">
                        <img
                        src={product.imagePath}
                        alt={product.name}
                        className="order-image"
                    />
                    <div>
                        <div className="order-name">{product.name}</div>
                        <div className="order-brand">{product.brand}</div>
                        <div className="order-price">
                            {product.price.toLocaleString()}원
                        </div>

                        <div className="quantity-control">
                            <button
                             className="quantity-button"
                             onClick={() => handleQuantityChange("minus")}
                             >
                                -
                             </button>
                             <div className="quantity">{quantity}</div>
                             <button
                              className="quantity-button"
                              onClick={() => handleQuantityChange("plus")}
                              >
                                +
                             </button>
                        </div>
                    </div>
                    </div>
                </div>
                {/* 배송지 정보 */}
                <div className="section">
                    <div className="section-title">배송지</div>
                    <div className="user-info">아리</div>
                    <div className="user-info">010-0000-0000</div>
                    <div className="user-info">
                        경기도 고양시 덕양구 항공대학로 76 국제은익관 1생활관 F000
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">마일리지 사용</div>
                    <div className="mileage-info">
                        현재 사용 가능한 마일리지: {maxMileage.toLocaleString()} 원
                    </div>
                    <input
                        className="mileageToUse-input"
                        placeholder="사용하실 마일리지를 입력하세요"
                        value={mileageToUse}
                        onChange={handleMileageChange}
                    />
                </div>

                <div className="section">
                    <div className="section-title">총 결제금액</div>
                    <div className="total">
                        <div>
                            <div className="total-item">총 상품금액</div>
                            <div className="total-item">마일리지 할인</div>
                            <div className="total-item">배송비</div>
                        </div>
                        <div>
                            <div className="total-value">
                                {totalPrice.toLocaleString()}원
                            </div>
                            <div className="total-value discount">
                                -{mileageToUse.toLocaleString()}원
                            </div>
                            <div className="total-value">무료배송</div>
                        </div>
                    </div>
                </div>

                <button className="pay-button" onClick={handlePayment}>결제하기</button>
            </div>
        </div>
    );
};

export default PayModal;
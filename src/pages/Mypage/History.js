import React from "react";

const Histrory = ({historyData, onCancel}) => {

    return(
        <div className="history-container-wrap">
            <div className="history-title">나의 쇼핑 내역</div>
            <div className="history-container">
                <table className="history-table" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>주문 일자</th>
                            <th>상품 정보</th>
                            <th>수량</th>
                            <th>구매 금액</th>
                            <th>상태</th>
                            <th>주문 취소</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2025-01-01</td>
                            <td>
                                크리드 어벤투스
                            </td>
                            <td>1</td>
                            <td>135,000원</td>
                            <td>배송중</td>
                            <td>
                                <div className="history-cancel">
                                    <div 
                                        className="history-cancel-button"
                                        onClick={onCancel}
                                        >취소</div>
                                </div>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        
    );
};
export default Histrory;
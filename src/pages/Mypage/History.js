import React from "react";

const formatDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString() : "";
const formatWon = (n) =>
  typeof n === "number" ? n.toLocaleString() + "원" : n;

const History = ({ historyData = [], onCancel }) => {
  const hasNoData = !Array.isArray(historyData) || historyData.length === 0;
  const handleCancel = (orderId) => onCancel?.(orderId);

  return (
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
            {hasNoData ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  주문내역이 없습니다.
                </td>
              </tr>
            ) : (
              historyData.map((o) => (
                <tr key={o.orderId}>
                  <td>{formatDateTime(o.createdAt)}</td>
                  <td>{o.itemName}</td>
                  <td>{o.quantity}</td>
                  <td>{formatWon(o.finalPrice)}</td>
                  <td>{o.status}</td>
                  <td>
                    <div className="history-cancel">
                      <div
                        className="history-cancel-button"
                        onClick={() => handleCancel(o.orderId)}
                        role="button"
                        tabIndex={0}
                      >
                        취소
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;

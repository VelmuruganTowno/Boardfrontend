import React from "react";


export default function PaymentView(props) {
  const {paymetData} = props


  return (
    <div className="amlistView">
      <ul>
        {paymetData.forex ? <li>Foreign exchange Available</li> : null}
        {paymetData.cash ? <li>Cash Available</li> : null}
        {paymetData.upi ? <li>UPI Available</li> : null}
        {paymetData.pos ? <li>POS Available</li> : null}
      </ul>
    </div>
  );
}

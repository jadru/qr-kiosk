import axios from 'axios';
import React, { useEffect } from 'react';

export const TossPaySuccess = () => {
  const headerConfig = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  let orderId = new URL(window.location.href).searchParams.get('orderId');
  let amount = new URL(window.location.href).searchParams.get('amount');
  let paymentKey = new URL(window.location.href).searchParams.get('paymentKey');

  useEffect(() => {
    axios
      .post(
        // `http://localhost:3000/toss-pay/success?orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`,
        'https://api.tosspayments.com/v1/payments/confirm',
        null,
        {
          headers: {
            ...headerConfig,
            Authorization: 'Basic ' + 'test_sk_jZ61JOxRQVEPKG1y7Wy3W0X9bAqw',
          },
          data: {
            orderId: orderId,
            paymentKey: paymentKey,
            amount: amount,
          },
        },
      )
      .then((res) => {
        if (res.status == 200 && res.data.method === '카드') {
          window.alert({
            title: '결제 성공',
          });
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>결제성공페이지</h1>
    </div>
  );
};

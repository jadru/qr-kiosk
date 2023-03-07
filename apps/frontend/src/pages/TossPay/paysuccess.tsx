import axios from 'axios';
import React, { useEffect } from 'react';

const { VITE_APP_TOSS_SECRET_KEY } = import.meta.env;

const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
export const TossPaySuccess = () => {
  const secretkey = VITE_APP_TOSS_SECRET_KEY;

  let orderId = new URL(window.location.href).searchParams.get('orderId');
  let amount = new URL(window.location.href).searchParams.get('amount');
  let paymentKey = new URL(window.location.href).searchParams.get('paymentKey');

  useEffect(() => {
    console.log('Basic ' + window.btoa(secretkey));
    axios
      .post(
        'https://api.tosspayments.com/v1/payments/confirm',
        {
          paymentKey: paymentKey,
          amount: amount,
          orderId: orderId,
        },
        {
          headers: {
            ...headerConfig,
            Authorization: `Basic ${window.btoa(secretkey)}`,
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

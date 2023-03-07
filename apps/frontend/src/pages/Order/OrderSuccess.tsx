import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { VITE_APP_TOSS_SECRET_KEY } = import.meta.env;

const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
export const OrderSuccess = () => {
  const [loading, setLoading] = useState(true);
  let orderId = new URL(window.location.href).searchParams.get('orderId');
  let amount = new URL(window.location.href).searchParams.get('amount');
  let paymentKey = new URL(window.location.href).searchParams.get('paymentKey');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Basic ' + window.btoa(VITE_APP_TOSS_SECRET_KEY));
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
            Authorization: `Basic ${window.btoa(VITE_APP_TOSS_SECRET_KEY)}`,
          },
        },
      )
      .then((res) => {
        if (res.status == 200 && res.data.status === 'DONE') {
          setLoading(false);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
        navigate('/order/confirm');
      });
  }, []);
  return loading ? (
    <div>결제중</div>
  ) : (
    <div>
      <h1>결제 성공!</h1>
    </div>
  );
};

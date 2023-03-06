import React, { useEffect } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const { VITE_APP_TOSSPAYMENTS_CLIENT_KEY } = import.meta.env;

export const TossPay = () => {
  //const tosskey = VITE_APP_TOSSPAYMENTS_CLIENT_KEY;
  const tosskey = 'test_ck_OyL0qZ4G1VOQwL209Ln8oWb2MQYg';
  async function tosspayment() {
    const tossPayments = await loadTossPayments(tosskey);

    tossPayments.requestPayment('카드', {
      amount: 1000,
      orderId: '123456789',
      orderName: '토스페이먼츠 결제 테스트',
      successUrl: 'https://localhost:3000/toss-pay',
      failUrl: 'https://localhost:3000/fail',
    });
  }
  return (
    <div>
      <h1>토스페이</h1>
      <button onClick={tosspayment}>결제하기</button>
    </div>
  );
};

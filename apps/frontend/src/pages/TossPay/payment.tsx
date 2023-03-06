import React, { useEffect } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import axios from 'axios';

const { VITE_APP_TOSS_CLIENT_KEY } = import.meta.env;

export const TossPay = () => {
  const tosskey = VITE_APP_TOSS_CLIENT_KEY;
  //const tosskey = 'test_ck_OyL0qZ4G1VOQwL209Ln8oWb2MQYg';
  async function tosspayment() {
    console.log(tosskey);
    const tossPayments = await loadTossPayments(tosskey);

    tossPayments
      .requestPayment('카드', {
        amount: 1000,
        orderId: '123456789',
        orderName: '토스페이먼츠 결제 테스트',
        successUrl: 'http://localhost:3000/toss-pay/success',
        failUrl: 'http://localhost:3000',
      })
      .then(function (data) {
        alert('결제가 완료되었습니다.');
        console.log(data);
      })
      .catch(function (error) {
        if (error.code === 'USER_CANCEL') {
          alert('결제를 취소하셨습니다.');
        } else {
          alert('결제에 실패하였습니다.');
        }
      });
  }
  return (
    <div>
      <h1>토스페이</h1>
      <button onClick={tosspayment}>결제하기</button>
    </div>
  );
};

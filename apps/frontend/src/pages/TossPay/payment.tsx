import React, { useEffect } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { VITE_APP_TOSS_CLIENT_KEY } = import.meta.env;

export const TossPay = () => {
  const naviate = useNavigate();
  const tosskey = VITE_APP_TOSS_CLIENT_KEY;
  async function tosspayment() {
    const tossPayments = await loadTossPayments(tosskey);
    console.log(tosskey);
    tossPayments
      .requestPayment('카드', {
        amount: 1000,
        orderId: 'Rjbb0lCkcw-JmUk1',
        orderName: '토스페이먼츠 결제 테스트',
        successUrl: 'http://localhost:3000/success',
        failUrl: 'http://localhost:3000',
      })
      .then((res) => {
        alert('결제가 완료되었습니다.');
        console.log(res);
        naviate('/success');
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

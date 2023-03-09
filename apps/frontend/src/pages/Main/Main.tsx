import { NormalLayout } from '@src/components';
import Lottie from 'react-lottie';
import QRCodeAnimation from './61155-scan-qr-code.json';
import { Link } from 'react-router-dom';

export const Main = () => {
  return (
    <NormalLayout>
      <div className="hero min-h-2/3 w-full">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: QRCodeAnimation,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            isClickToPauseDisabled
          />
          <div>
            <h1 className="text-5xl font-bold">QR 키오스크</h1>
            <p className="py-6">
              이 시스템을 사용하면 테이블에 있는 QR 코드를 스캔하기만 하면
              스마트폰을 통해 빠르고 쉽게 주문할 수 있습니다. 당사의 시스템을
              사용하면 서버가 주문을 받기를 기다리는 번거로움을 피할 수 있으며,
              주문이 정확하고 적시에 이루어지도록 보장할 수 있습니다. 귀하의
              식사 경험을 향상시키기 위해 이 혁신적인 솔루션을 제공하게 되어
              기쁩니다.
            </p>
            <Link to={'/login'}>
              <button className="btn btn-primary">시작하기</button>
            </Link>
          </div>
        </div>
      </div>
    </NormalLayout>
  );
};

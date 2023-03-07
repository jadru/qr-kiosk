import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import { NormalLayout } from '../NormalLayout';
import ErrorLottie from './98488-bot-error-404.json';

export const ErrorScreen = () => {
  return (
    <NormalLayout>
      <div className="w-full h-full justify-center self-center text-center space-y-4">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: ErrorLottie,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          isClickToPauseDisabled
          width="80%"
          height="80%"
        />
        <p className="text-2xl font-normal text-center">
          페이지를 찾을 수 없습니다.
        </p>

        <button className="btn">
          <Link to="/">메인으로 가기</Link>
        </button>
      </div>
    </NormalLayout>
  );
};

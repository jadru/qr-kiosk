import Lottie from 'react-lottie';
import { NormalLayout } from '../NormalLayout';
import ErrorLottie from './98488-bot-error-404.json';

export const ErrorScreen = () => {
  return (
    <NormalLayout>
      <div className="w-full h-full flex justify-center">
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
        />
      </div>
    </NormalLayout>
  );
};

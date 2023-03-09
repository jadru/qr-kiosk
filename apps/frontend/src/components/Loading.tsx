import Lottie from 'react-lottie';
import ErrorLottie from './8707-loading.json';

export const Loading = () => (
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
);

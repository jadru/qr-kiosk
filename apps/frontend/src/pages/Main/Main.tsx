import { NormalLayout } from '@src/components';
import { Link } from 'react-router-dom';

export const Main = () => {
  return (
    <NormalLayout>
      <div className="hero min-h-2/3">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="/images/stock/photo-1635805737707-575885ab0820.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">QR Kiosk!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link to={'/login'}>
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </NormalLayout>
  );
};

import { NormalLayout, ErrorMessage } from '@src/components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from './LoginSchema';

type LoginInputType = {
  username: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<LoginInputType>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<LoginInputType> = (data) => console.log(data);
  // console.log(watch('example'));
  return (
    <NormalLayout>
      <div className="hero">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">로그인</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">아이디</span>
                </label>
                <input
                  type="text"
                  placeholder="아이디 입력"
                  className="input input-bordered"
                  {...register('username')}
                />
                <ErrorMessage>{errors.username?.message}</ErrorMessage>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">비밀번호</span>
                </label>
                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  className="input input-bordered"
                  {...register('password')}
                />
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    아이디 / 비밀번호 찾기
                  </a>
                </label>
              </div>
              <div className="form-control mt-3">
                <button type="submit" className="btn btn-primary">
                  로그인
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </NormalLayout>
  );
};

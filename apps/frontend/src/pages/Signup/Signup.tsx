import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignupSchema } from './SignupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { NormalLayout, ErrorMessage } from '@src/components';

type SignupInputType = {
  username: string;
  password: string;
  passwordCheck: string;
  name: string;
  birthday: string;
  email: string;
};

export const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<SignupInputType>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(SignupSchema),
  });
  const onSubmit: SubmitHandler<SignupInputType> = (data) => console.log(data);
  return (
    <NormalLayout>
      <div className="flex self-center items-center flex-col space-y-3">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">회원가입</h1>
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">비밀번호 확인</span>
              </label>
              <input
                type="password"
                placeholder="비밀번호 확인"
                className="input input-bordered"
                {...register('passwordCheck')}
              />
              <ErrorMessage>{errors.passwordCheck?.message}</ErrorMessage>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">이름</span>
              </label>
              <input
                type="text"
                placeholder="이름 입력"
                className="input input-bordered"
                {...register('name')}
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
              {/* </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">생년월일</span>
              </label>
              <input
                type="text"
                placeholder="생년월일 입력"
                className="input input-bordered"
                {...register('birthday')}
              />
              <ErrorMessage>{errors.birthday?.message}</ErrorMessage>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">이메일</span>
              </label>
              <input
                type="text"
                placeholder="이메일 입력"
                className="input input-bordered"
                {...register('email')}
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage> */}
            </div>
            <div className="form-control">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
    </NormalLayout>
  );
};

import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignupSchema } from './SignupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { NormalLayout, ErrorMessage } from '@src/components';
import { signupAPI } from '@src/apis/memberApi';
import { useNavigate } from 'react-router-dom';

type SignupInputType = {
  username: string;
  password: string;
  passwordCheck: string;
  name: string;
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
  useEffect(() => {
    console.log(isSubmitting);
  }, [isSubmitting]);
  const navigate = useNavigate();
  const onError = (errors: any, e: any) => console.log(errors, e);
  const onSubmit: SubmitHandler<SignupInputType> = (data) => {
    console.log('check');
    signupAPI(data, navigate);
  };
  return (
    <NormalLayout>
      <div className="flex self-center items-center flex-col space-y-3">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">회원가입</h1>
        </div>
        <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
            </div>
            <button
              onClick={handleSubmit(onSubmit, onError)}
              className="btn btn-primary w-full"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </NormalLayout>
  );
};

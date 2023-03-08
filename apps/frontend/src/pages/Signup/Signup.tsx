import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SignupSchema } from './SignupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { NormalLayout, ErrorMessage } from '@src/components';
import { signupAPI } from '@src/apis/memberApi';
import { useNavigate } from 'react-router-dom';
import { createOwnerApiType } from '@src/type';

export const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<createOwnerApiType>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(SignupSchema),
  });
  useEffect(() => {
    console.log(isSubmitting);
  }, [isSubmitting]);
  const navigate = useNavigate();
  const onError = (errors: any, e: any) => console.log(errors, e);
  const onSubmit: SubmitHandler<createOwnerApiType> = async (data) => {
    delete data['passwordCheck'];
    await signupAPI(data);
    await navigate('/login');
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
                <span className="label-text">이메일</span>
              </label>
              <input
                type="email"
                placeholder="이메일 입력"
                className="input input-bordered"
                {...register('email')}
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
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
            <p>가게 정보 입력</p>
            <div className="form-control">
              <label className="label">
                <span className="label-text">가게 이름</span>
              </label>
              <input
                type="text"
                placeholder="가게 이름 입력"
                className="input input-bordered"
                {...register('store_name')}
              />
              <ErrorMessage>{errors.store_name?.message}</ErrorMessage>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">가게 전화번호</span>
              </label>
              <input
                type="tel"
                placeholder="가게 전화번호 입력"
                className="input input-bordered"
                {...register('store_phone')}
              />
              <ErrorMessage>{errors.store_phone?.message}</ErrorMessage>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">가게 주소</span>
              </label>
              <input
                type="text"
                placeholder="가게 주소 입력"
                className="input input-bordered"
                {...register('store_address')}
              />
              <ErrorMessage>{errors.store_address?.message}</ErrorMessage>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">가게 운영 시간 설명</span>
              </label>
              <input
                type="text"
                placeholder="가게 운영 시간 입력"
                className="input input-bordered"
                {...register('store_operating_time')}
              />
              <ErrorMessage>
                {errors.store_operating_time?.message}
              </ErrorMessage>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">메뉴판 테마 선택</span>
              </label>
              <label>
                <select
                  className="select select-bordered w-fit max-w-xs"
                  {...register('theme')}
                >
                  <option value="simple" selected>
                    심플
                  </option>
                  <option value="cute">큐트</option>
                  <option value="vintage">빈티지</option>
                  <option value="modern">모던</option>
                </select>
              </label>
              <ErrorMessage>{errors.theme?.message}</ErrorMessage>
            </div>
            <button
              onClick={handleSubmit(onSubmit, onError)}
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </NormalLayout>
  );
};

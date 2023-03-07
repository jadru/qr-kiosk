import * as yup from 'yup';

export const SignupSchema = yup
  .object({
    username: yup.string().required('아이디를 입력해주세요'),
    password: yup
      .string()
      .required('비밀번호를 입력해주세요')
      .min(8, '8-16자 영문 대소문자, 숫자, 특수문자를 1개씩 포함해주세요')
      .max(16, '8-16자 영문 대소문자, 숫자, 특수문자를 1개씩 포함해주세요')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})/,
        '8-16자 영문 대소문자, 숫자, 특수문자를 1개씩 포함해주세요',
      ),
    passwordCheck: yup
      .string()
      .required('비밀번호를 확인은 필수입니다')
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
    name: yup.string().required('이름을 입력해주세요'),
  })
  .required();

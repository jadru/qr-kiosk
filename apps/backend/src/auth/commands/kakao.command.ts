export type UserRequestCommand = {
  accessToken: string;
};

export type KakaoUserInfo = {
  id: number; // 사용자 고유번호
  has_signed_up?: boolean; // 자동 연결 설정을 비활성화한 경우만 존재
  connected_at?: Date; // 서비스에 연결 완료된 시각, UTC
  synched_at?: Date; // 카카오싱크 간편가입을 통해 로그인한 시각, UTC
  properties?: JSON; // 사용자 프로퍼티(Property) 사용자 프로퍼티 참고
  kakao_account?: KakaoAccount; //카카오계정 정보
};

export type KakaoAccount = {
  profile_needs_agreement?: boolean; //	프로필 정보 동의 여부
  profile_nickname_needs_agreement?: boolean; //	닉네임 정보 동의 여부
  profile_image_needs_agreement?: boolean; //	프로필 이미지 정보 동의 여부
  profile?: KakaoProfile; //	프로필 정보

  name_needs_agreement?: boolean; //	이름 정보 동의 여부
  name?: string; //	이름 정보

  email_needs_agreement?: boolean; //	이메일 정보 동의 여부
  is_email_valid?: boolean; //	이메일 정보의 유효성 여부
  is_email_verified?: boolean; //	이메일 정보의 인증 여부
  email?: string; //	이메일 정보

  age_range_needs_agreement?: boolean; //	연령대 정보 동의 여부
  age_range?: string; //	연령대 정보
  birthyear_needs_agreement?: boolean; //	생년 정보 동의 여부
  birthyear?: string; //	생일 정보
  birthday_needs_agreement?: boolean; //	생일 정보 동의 여부
  birthday?: string; //	생일 정보
  birthday_type?: string; //	생일 타입

  gender_needs_agreement?: boolean; //	성별 정보 동의 여부
  gender?: string; //	성별 정보

  phone_number_needs_agreement?: boolean; //	전화번호 정보 동의 여부
  phone_number?: string; //	전화번호 정보

  ci_needs_agreement?: boolean; //	본인인증 정보 동의 여부
  ci?: string; //	본인인증 정보
  ci_authenticated_at?: string; //	본인인증 완료 시각, UTC
};

export type KakaoProfile = {
  nickname?: string; //	닉네임
  thumbnail_image_url?: string; //	프로필 이미지 URL
  profile_image_url?: string; //	프로필 이미지 URL
  is_default_image?: boolean; //	기본 이미지 여부
};

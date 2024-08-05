import { ApiResWithValidation, FileRes, MultiItem, SingleItem, UserData, UserForm, UserLoginForm } from "@/types";

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export async function signup(formData: FormData): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>> {
  const userObj = {
    type: formData.get('type') || 'user',
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    image: '',
  }

  // 이미지 먼저 업로드
  const attach = formData.get('attach') as File;

  if (attach.size > 0) {
    // 프로필 이미지를 추가한 경우
    const fileRes = await fetch(`${SERVER}/files`, {
      method: 'POST',
      headers: {
        'client-id': '00-next-level'
      },
      body: formData,
    });

    if(!fileRes.ok){
      throw new Error('파일 업로드 실패');
    }
    const fileData: MultiItem<FileRes> = await fileRes.json();
    // 서버로부터 응답받은 이미지 이름을 회원 정보에 포함
    userObj.image = fileData.item[0].path;
  } 

  const res = await fetch(`${SERVER}/users`, {
    method: 'POST',
    headers: {
      'client-id': '00-next-level',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  });

  return res.json();
}

export async function login(userObj: UserLoginForm): Promise<ApiResWithValidation<SingleItem<UserData>, UserLoginForm>> {
  const res = await fetch(`${SERVER}/users/login`, {
    method: 'POST',
    headers: {
      'client-id': '00-next-level',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(userObj),
  });
  return res.json();
}
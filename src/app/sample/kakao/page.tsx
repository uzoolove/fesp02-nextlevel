'use client';

import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = '//dapi.kakao.com/v2/maps/sdk.js?appkey=9a81ea74911e0f50690c28cbaaa5391d&autoload=false';

export default function Page() {
  return (
    <div>
      <Script src={KAKAO_SDK_URL} strategy='beforeInteractive' />
      <Map center={{lat: 37.497930, lng: 127.027596 }}
        style={{ width: '700px', height: '500px' }}></Map>
    </div>
  );
};
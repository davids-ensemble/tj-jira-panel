import { HttpResponse } from 'msw';

import type { ResponseFunctionParameters } from '.';

export const getLoginResponse = ({ body }: ResponseFunctionParameters) => {
  const username = body.querySelector('userName')?.textContent;
  return HttpResponse.xml(`
    <result forAction="login">
      <user id="fake-user-id" version="20">
        <userName>${username}</userName>
      </user>
      <sessionUuid>fake-session-id</sessionUuid>
    </result>
  `);
};

export const getCurrentLoginResponse = ({
  headers,
}: ResponseFunctionParameters) => {
  const sessionUuid = headers.get('Tj_session');
  return HttpResponse.xml(`
    <<result forAction="getCurrentLogin">>
      <sessionUuid>${sessionUuid}</sessionUuid>
    </result>
  `);
};

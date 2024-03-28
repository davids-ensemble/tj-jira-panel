import { HttpResponse } from 'msw';

import type { ResponseFunctionParameters } from '.';

export const createLoginResponse = ({ body }: ResponseFunctionParameters) => {
  const userName = body.getElementsByTagName('userName')[0].textContent;
  const password = body.getElementsByTagName('password')[0].textContent;

  if (!userName || !password) {
    return `<serviceError>Invalid login attempt for user ${userName || 'null'}</serviceError>`;
  }

  return `
    <result forAction="login">
      <user id="fake-user-id" version="20">
        <userName>${userName}</userName>
      </user>
      <sessionUuid>fake-session-id</sessionUuid>
    </result>
  `;
};

export const getLoginResponse = (params: ResponseFunctionParameters) => {
  return HttpResponse.xml(createLoginResponse(params));
};

export const getCurrentLoginResponse = ({ headers }: ResponseFunctionParameters) => {
  const sessionUuid = headers.get('Tj_session');
  return HttpResponse.xml(`
    <<result forAction="getCurrentLogin">>
      <sessionUuid>${sessionUuid}</sessionUuid>
    </result>
  `);
};

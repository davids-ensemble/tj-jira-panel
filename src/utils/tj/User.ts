import { Server } from './Server';

export interface LoginParams {
  username: string;
  password: string;
}

interface AuthObject {
  userId: string;
  sessionUuid: string;
  username: string;
}

export class User {
  private static authObject: AuthObject = JSON.parse(
    localStorage.getItem('tj_user') ?? '{}',
  );

  public static get username(): string {
    return User.authObject.username;
  }
  public static get userId(): string {
    return User.authObject.userId;
  }
  public static get sessionUuid(): string {
    return User.authObject.sessionUuid;
  }

  public static async login({ username, password }: LoginParams) {
    const escapedPassword = password
      .replace('&', '&amp;')
      .replace('<', '&lt;')
      .replace('>', '&gt;')
      .replace('"', '&quot;')
      .replace("'", '&apos;');
    const body = `<login><userName>${username}</userName><password>${escapedPassword}</password></login>`;
    const response = await fetch(Server.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
      },
      body,
    });
    const data = await response.text();
    const dom = new DOMParser().parseFromString(data, 'text/xml');
    // TODO: add error handling for serviceError, loginfailed
    const result = {
      userId: dom.querySelector('user')?.attributes.getNamedItem('id')?.value,
      sessionUuid: dom.querySelector('sessionUuid')?.textContent,
      username,
    };
    User.authObject = result;
    localStorage.setItem('tj_user', JSON.stringify(result));
    return result;
  }

  public static async isSessionValid() {
    const { sessionUuid, username } = this.authObject;
    const body = `<getCurrentLogin/>`;
    const response = await fetch(Server.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        'Tj_session': sessionUuid,
        'Tj_user': username,
      },
      body,
    });
    const data = await response.text();
    const dom = new DOMParser().parseFromString(data, 'text/xml');
    return dom.querySelector('sessionUuid')?.textContent === sessionUuid;
  }
}

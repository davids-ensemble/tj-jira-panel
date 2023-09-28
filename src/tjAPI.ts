const url = 'https://tj.ensemblesoftware.ro/data';

export const getServerConfig = async () => {
  const body = `<getServerConfiguration/>`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
    },
    body,
  });
  const data = await response.text();
  const dom = new DOMParser().parseFromString(data, 'text/xml');
  const result = {
    version: dom.querySelector('serverVersion')?.textContent ?? 'unknown',
    url: dom.querySelector('serverUrl')?.textContent,
    supportsGeneratedSummaries:
      dom.querySelector('supportsGeneratedSummaries')?.textContent === 'true',
  };
  return result;
};

export const login = async (username: string, password: string) => {
  const escapedPassword = password
    .replace('&', '&amp;')
    .replace('<', '&lt;')
    .replace('>', '&gt;')
    .replace('"', '&quot;')
    .replace("'", '&apos;');
  const body = `<login><userName>${username}</userName><password>${escapedPassword}</password></login>`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
    },
    body,
  });
  const data = await response.text();
  const dom = new DOMParser().parseFromString(data, 'text/xml');
  const result = {
    userId: dom.querySelector('user')?.attributes.getNamedItem('id')?.value,
    sessionUuid: dom.querySelector('sessionUuid')?.textContent,
    username,
  };
  return result;
};

export const getTimesheet = async (userId: string) => {
  const date = new Date().toISOString().split('T')[0];
  const body = `<getTimesheet><forUser>${userId}</forUser><containingDay>${date}</containingDay></getTimesheet>`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
    },
    body,
  });
  const data = await response.text();
  const dom = new DOMParser().parseFromString(data, 'text/xml');
};

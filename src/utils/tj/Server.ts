import { DOMAIN_COUNTRIES, LOCAL_STORAGE_KEYS, checkForError } from './utils';

interface ServerConfig {
  version: string;
  url: string;
  supportsGeneratedSummaries: boolean;
}

export class Server {
  private static _url: string = localStorage.getItem(LOCAL_STORAGE_KEYS.URL) ?? 'https://tj.ensemblesoftware.ro/data';
  private static _serverConfig: ServerConfig | null = null;

  public static get url(): string {
    return Server._url;
  }
  public static set url(url: string) {
    Server._url = url;
    localStorage.setItem(LOCAL_STORAGE_KEYS.URL, url);
  }

  public static get serverConfig(): ServerConfig | null {
    return Server._serverConfig;
  }
  public static async fetchServerConfig() {
    const body = `<getServerConfiguration/>`;
    const response = await fetch(Server._url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
      },
      body,
    });
    const data = await response.text();
    const dom = new DOMParser().parseFromString(data, 'text/xml');
    const url = dom.querySelector('serverUrl')?.textContent;
    const result = {
      version: dom.querySelector('serverVersion')?.textContent ?? 'unknown',
      url,
      country: DOMAIN_COUNTRIES[url.split('.').pop()],
      supportsGeneratedSummaries: dom.querySelector('supportsGeneratedSummaries')?.textContent === 'true',
    };
    Server._serverConfig = result;
    return result;
  }

  public static async fetch(body: string) {
    const response = await fetch(Server.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
      },
      body,
    });
    const data = await response.text();
    const dom = new DOMParser().parseFromString(data, 'text/xml');
    checkForError(dom);
    return dom;
  }
}

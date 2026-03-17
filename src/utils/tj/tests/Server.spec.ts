import { Server } from '../Server';
import { LOCAL_STORAGE_KEYS } from '../utils';

describe('Server', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should correctly get and set url', () => {
    const url = 'https://test.url';
    Server.url = url;
    expect(Server.url).toEqual(url);
    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.URL)).toEqual(url);
  });

  it('should fetch server config', async () => {
    Server.url = 'https://tj.ensemblesoftware.ro/data';
    const config = await Server.fetchServerConfig();

    expect(config).toEqual({
      version: '1.0.0',
      url: 'https://tj.ensemblesoftware.ro/data',
      supportsGeneratedSummaries: true,
    });
    expect(Server.serverConfig).toEqual(config);
  });

  it('should fetch data from the server url', async () => {
    Server.url = 'https://test.url';
    const fetchMock = jest.fn().mockResolvedValue({
      text: jest.fn().mockResolvedValue('<response></response>'),
    });
    global.fetch = fetchMock;

    await Server.fetch('<requestData></requestData>');

    expect(fetchMock).toHaveBeenCalledWith(Server.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
      },
      body: expect.any(String),
    });
  });

  it('should return the origin of the server url as baseUrl', () => {
    Server.url = 'https://tj.ensemblesoftware.ro/data';
    expect(Server.baseUrl).toEqual('https://tj.ensemblesoftware.ro');
  });

  it('should handle trailing slash in server url for baseUrl', () => {
    Server.url = 'https://tj.ensemblesoftware.ro/data/';
    expect(Server.baseUrl).toEqual('https://tj.ensemblesoftware.ro');
  });
});

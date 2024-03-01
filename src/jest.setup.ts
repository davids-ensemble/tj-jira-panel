import { server } from './__mocks__/msw.node';

const _parseFromString = DOMParser.prototype.parseFromString;

beforeAll(() => {
  server.listen();
  // avoids showing the following error: "XML parsing not implemented yet, continuing as html"
  DOMParser.prototype.parseFromString = (
    str: string,
    _type: DOMParserSupportedType,
  ) => {
    return _parseFromString(str, 'text/html');
  };
});

afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});

afterAll(() => {
  server.close();
  DOMParser.prototype.parseFromString = _parseFromString;
});

const url = 'https://tj.ensemblesoftware.ro/data';

/**
 *
 * @param url
 */
export const getServerConfig = async () => {
  // XML request
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

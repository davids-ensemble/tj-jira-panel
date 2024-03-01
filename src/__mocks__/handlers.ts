import { http } from 'msw';

import { Server } from '@utils/tj';

import responses from './responses';

const availableResponses = Object.keys(responses) as Array<
  keyof typeof responses
>;

export const handlers = [
  http.post(Server.url, async ({ request }) => {
    const { headers } = request;
    const body = request.body as unknown as string;
    const parsedBody = new DOMParser().parseFromString(body, 'text/xml');
    const requestType = availableResponses.find(
      type => parsedBody.querySelector(type) !== null,
    );

    if (requestType) {
      return responses[requestType]({ body: parsedBody, headers });
    } else {
      console.error('No handler implemented for this request.');
    }
  }),
];

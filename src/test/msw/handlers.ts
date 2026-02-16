import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/data/jobs.json', () => {
    return HttpResponse.json([]);
  }),
  http.post('https://formspree.io/f/xnjbagpr', () => {
    return HttpResponse.json({ ok: true }, { status: 200 });
  }),
  http.post('https://script.google.com/*', () => {
    return HttpResponse.json({ ok: true }, { status: 200 });
  }),
];

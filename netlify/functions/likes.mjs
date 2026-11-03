import { getStore } from '@netlify/blobs';

const INITIAL_LIKES = 214;
const MAX_CLICKS = 5;
const store = getStore('portfolio-likes');
const visitorIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const respond = (statusCode, data) => ({
  statusCode,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  },
  body: JSON.stringify(data),
});

const getTotalLikes = async () => {
  const saved = await store.get('total', { type: 'json' });
  if (Number.isSafeInteger(saved?.likes) && saved.likes >= INITIAL_LIKES) {
    return saved.likes;
  }

  await store.setJSON('total', { likes: INITIAL_LIKES });
  return INITIAL_LIKES;
};

const getVisitorClicks = async (visitorId) => {
  const saved = await store.get(`visitor:${visitorId}`, { type: 'json' });
  return Number.isSafeInteger(saved?.clicks)
    ? Math.min(MAX_CLICKS, Math.max(0, saved.clicks))
    : 0;
};

export const handler = async (event) => {
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return respond(405, { error: 'Method not allowed.' });
  }

  let visitorId;
  try {
    const input = event.httpMethod === 'GET'
      ? event.queryStringParameters?.visitorId
      : JSON.parse(event.body || '{}').visitorId;
    visitorId = typeof input === 'string' ? input : '';
  } catch {
    return respond(400, { error: 'Invalid request body.' });
  }

  if (!visitorIdPattern.test(visitorId)) {
    return respond(400, { error: 'A valid visitor ID is required.' });
  }

  try {
    const likes = await getTotalLikes();
    const userClicks = await getVisitorClicks(visitorId);

    if (event.httpMethod === 'GET') {
      return respond(200, { likes, userClicks });
    }

    if (userClicks >= MAX_CLICKS) {
      return respond(409, { error: 'Like limit reached.', likes, userClicks });
    }

    const nextLikes = likes + 1;
    const nextUserClicks = userClicks + 1;
    await store.setJSON('total', { likes: nextLikes });
    await store.setJSON(`visitor:${visitorId}`, { clicks: nextUserClicks });

    return respond(200, { likes: nextLikes, userClicks: nextUserClicks });
  } catch (error) {
    console.error('Unable to access portfolio likes store:', error);
    return respond(500, { error: 'Likes are temporarily unavailable.' });
  }
};

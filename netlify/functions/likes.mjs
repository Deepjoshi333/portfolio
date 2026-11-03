import { getStore } from '@netlify/blobs';

const INITIAL_LIKES = 214;
const store = getStore('portfolio-likes');

const respond = (statusCode, data) => ({
  statusCode,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  },
  body: JSON.stringify(data),
});

const incrementTotalLikes = async () => {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const saved = await store.getWithMetadata('total', {
      type: 'json',
      consistency: 'strong',
    });

    if (!saved) {
      const initialized = await store.setJSON(
        'total',
        { likes: INITIAL_LIKES },
        { onlyIfNew: true },
      );
      if (initialized.modified) continue;
      continue;
    }

    const currentLikes = Number.isSafeInteger(saved.data?.likes)
      && saved.data.likes >= INITIAL_LIKES
      ? saved.data.likes
      : INITIAL_LIKES;
    const updated = await store.setJSON(
      'total',
      { likes: currentLikes + 1 },
      { onlyIfMatch: saved.etag },
    );
    if (updated.modified) return currentLikes + 1;
  }

  throw new Error('Could not increment likes after repeated concurrent updates.');
};

export const handler = async (event) => {
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return respond(405, { error: 'Method not allowed.' });
  }

  try {
    if (event.httpMethod === 'GET') {
      const saved = await store.get('total', { type: 'json', consistency: 'strong' });
      const likes = Number.isSafeInteger(saved?.likes) && saved.likes >= INITIAL_LIKES
        ? saved.likes
        : INITIAL_LIKES;
      return respond(200, { likes });
    }

    const likes = await incrementTotalLikes();
    return respond(200, { likes });
  } catch (error) {
    console.error('Unable to access portfolio likes store:', error);
    return respond(500, { error: 'Likes are temporarily unavailable.' });
  }
};

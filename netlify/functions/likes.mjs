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

const getTotalLikes = async () => {
  const saved = await store.get('total', { type: 'json' });
  if (Number.isSafeInteger(saved?.likes) && saved.likes >= INITIAL_LIKES) {
    return saved.likes;
  }

  await store.setJSON('total', { likes: INITIAL_LIKES });
  return INITIAL_LIKES;
};

export const handler = async (event) => {
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return respond(405, { error: 'Method not allowed.' });
  }

  try {
    const likes = await getTotalLikes();
    if (event.httpMethod === 'GET') {
      return respond(200, { likes });
    }

    const nextLikes = likes + 1;
    await store.setJSON('total', { likes: nextLikes });

    return respond(200, { likes: nextLikes });
  } catch (error) {
    console.error('Unable to access portfolio likes store:', error);
    return respond(500, { error: 'Likes are temporarily unavailable.' });
  }
};

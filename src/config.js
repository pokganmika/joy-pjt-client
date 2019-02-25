export default function() {
  switch (process.env.REACT_APP_NODE_ENV) {
    case 'development':
      return { SERVER_URL: 'http://localhost:5000' };
    case 'production':
      return { SERVER_URL: 'https://joy-learn.com' };
    default:
      return { SERVER_URL: 'https://joy-learn.com' };
  }
}

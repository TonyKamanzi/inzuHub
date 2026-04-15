import http from 'http';

// Test the favorite endpoint structure
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/favorite',
  method: 'GET',
  headers: {
    'Cookie': 'connect.sid=test' // This won't work but let's see the response
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();

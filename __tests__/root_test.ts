import axios, {AxiosResponse} from 'axios';

test('test cors', async (done) => {
  let response : AxiosResponse = await axios.get('http://localhost:8080');
  expect(response.headers['access-control-allow-origin']).not.toBe('*');
  done();
});

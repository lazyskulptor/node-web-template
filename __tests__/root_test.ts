import axios, {AxiosResponse} from 'axios';

test('test cors', async (done) => {
  let response : AxiosResponse = await axios.get('http://127.0.0.1:8080/');
  
  expect(response.headers['access-control-allow-origin']).not.toBe('*');
  done();
});

import app from "../../src/apps/main_app";
import supertest from "supertest";
import initDao from "../../src/repository/setting_db_dao";
import * as svc from "../../src/service/admin_svc";
import {initAdmin} from "../utils/factory";

const request = supertest(app);
const admin = initAdmin();

describe('test endpoints in main_ctrl', () => {
  beforeAll(async () => {
    const password = admin.password;
    await svc.createAdmin(admin);
    admin.password = password;
  });
  
  test('endpoint /', async (done) => {
    request.get('/')
      .expect(body => {
        console.log(body.text);
      })
      .expect(200)
      .end(err => {
        if(err) throw err;
        done();
      });
  });
  
  test('endpoint failure at /login', async (done) => {
    request.post('/login')
      .send('username=test&password=1234')
      .expect(302)
      .expect(body => {
        if(body.headers.location.indexOf('login') < 0) throw new Error('Invalid account succeed to login');
      })
      .end(err => {
        if(err) throw err;
        done();
      });
  });
  
  test('endpoint success at /login', async (done) => {
  
    request.post('/login')
      .send(`username=${admin.username}&password=${admin.password}`)
      .expect(302)
      .expect(body => {
        if (body.headers.location.length !== 1 ) throw new Error('Valid account fail to login');
      })
      .end(err => {
        if (err) throw err;
        done();
      });
  });
  
  afterAll(() => {
    initDao().truncateTb('admin');
  });
});

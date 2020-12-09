import bcrypt from "bcrypt";
import {PwdEncrypt} from "./pwd_encrypt";

export default class BcryptPwdEncrypt implements PwdEncrypt {
  encrypt = async (passwd: string): Promise<string> => {
    return new Promise<string>(resolve => {
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(passwd, salt))
        .then(hash => resolve(hash));
    });
  };
  isMatch = async (passed: string, saved: string): Promise<boolean> => {
    return bcrypt.compare(passed, saved);
  }
}

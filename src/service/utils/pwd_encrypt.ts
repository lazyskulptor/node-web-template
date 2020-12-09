import BcryptPwdEncrypt from "./pwd_bcrypt";

export interface PwdEncrypt {
  isMatch: (passed: string, saved: string) => Promise<boolean>,
  encrypt: (passwd: string) => Promise<string>
}

class PlainPwdEncrypt implements PwdEncrypt{
  encrypt = async (passwd: string): Promise<string> => {
    return passwd;
  };

  isMatch = async (passed: string, saved: string): Promise<boolean> => {
    return passed === saved;
  };
}

export enum PwdType {
  PLAIN, BCRYPT
}

export default function Pwd(encType: PwdType): PwdEncrypt {
  if (encType === PwdType.PLAIN) {
    return new PlainPwdEncrypt();
  } else if (encType === PwdType.BCRYPT) {
    return new BcryptPwdEncrypt();
  }
}
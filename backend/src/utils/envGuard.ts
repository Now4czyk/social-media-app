import { cleanEnv, num, str } from 'envalid';
import dotenv from 'dotenv';

export interface IProcessEnv {
  PORT: number
  MONGO_URI: string
  JWT_KEY: string
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv { }
  }
}

export type CustomEnv = Pick<NodeJS.ProcessEnv, 'PORT' | 'MONGO_URI' | 'JWT_KEY'>

//specific for express
dotenv.config();

export const envGuard = cleanEnv<CustomEnv>(process.env, {
  JWT_KEY: str(),
  PORT: num(),
  MONGO_URI: str(),
});

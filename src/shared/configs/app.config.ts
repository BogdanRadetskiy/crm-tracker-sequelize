import 'dotenv/config';
import { defaultPort } from '@common/constants';

class AppConfig {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    for (const k of keys) this.getValue(k, true);
    return this;
  }

  public getHost() {
    return this.getValue('HOST') || '0.0.0.0';
  }

  public getPort() {
    return this.getValue('PORT') || defaultPort;
  }

  public getAppSecret() {
    return this.getValue('APP_SECRET', true);
  }

  public getJwtExpired() {
    return this.getValue('JWT_EXPIRED', true);
  }
}

const appConfig = new AppConfig(process.env).ensureValues(['PORT', 'HOST', 'APP_SECRET', 'JWT_EXPIRED']);

export { appConfig };

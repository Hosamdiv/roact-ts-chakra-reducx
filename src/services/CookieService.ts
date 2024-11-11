import Cookies from "universal-cookie";

const cookies = new Cookies();
interface CookieAttributes {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "lax" | "strict" | "none";
}

class CookieService {
  get(name: string): string | undefined {
    return cookies.get(name);
  }

  set(name: string, value: string, options?: CookieAttributes): void {
    cookies.set(name, value, options);
  }

  remove(name: string): void {
    cookies.remove(name);
  }
}

export default new CookieService();

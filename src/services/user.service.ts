import { Injectable } from "../decorators/injectable.decorator";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
export class UserService {
  constructor() {}
  async getUser(): Promise<string> {
    await sleep(3000);
    return "admin@admin.com";
  }
}

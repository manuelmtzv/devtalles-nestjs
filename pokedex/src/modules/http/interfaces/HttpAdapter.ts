export abstract class HttpAdapter {
  abstract get(...args: any[]): Promise<unknown>;

  abstract post(...args: any[]): Promise<unknown>;

  abstract put(...args: any[]): Promise<unknown>;

  abstract delete(...args: any[]): Promise<unknown>;
}

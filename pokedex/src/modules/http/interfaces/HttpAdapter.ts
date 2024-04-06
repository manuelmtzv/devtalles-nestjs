export abstract class HttpAdapter {
  abstract get<T>(...args: any[]): Promise<T>;

  abstract post<T>(...args: any[]): Promise<T>;

  abstract put<T>(...args: any[]): Promise<T>;

  abstract delete<T>(...args: any[]): Promise<T>;
}

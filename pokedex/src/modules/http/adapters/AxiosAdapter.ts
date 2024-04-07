import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { HttpAdapter } from '@modules/http/interfaces/HttpAdapter';

export class AxiosAdapter implements HttpAdapter {
  private readonly client: AxiosInstance;

  public get getClient(): AxiosInstance {
    return this.client;
  }

  constructor() {
    this.client = axios.create();
  }

  async get<T>(url: string): Promise<AxiosResponse<T>> {
    const response = await this.client.get<T>(url);
    return response;
  }

  async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    const response = await this.client.post<T>(url, data);
    return response;
  }

  async put<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    const response = await this.client.put<T>(url, data);
    return response;
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    const response = await this.client.delete<T>(url);
    return response;
  }
}

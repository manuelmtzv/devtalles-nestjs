import axios from "axios";
import { HttpAdapter } from "../interfaces/HttpAdapter.interface";

const jsonPlaceholderApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export class JsonPlaceholderAdapter implements HttpAdapter {
  private readonly api = jsonPlaceholderApi;

  async get<T = any>(url: string): Promise<T> {
    const { data } = await this.api.get<T>(url);
    return data;
  }
}

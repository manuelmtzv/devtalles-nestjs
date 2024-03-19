import { PostsResponse } from "../interfaces/PostsResponse.interface";
import { JsonPlaceholderAdapter } from "../api/jsonPlaceholder.adapter";
import { HttpAdapter } from "../interfaces/HttpAdapter.interface";

export class Person {
  constructor(
    public readonly id: number,
    public readonly name: string,
    private readonly jsonPlaceholderService: HttpAdapter
  ) {}

  get imageUrl(): string {
    return `https://picsum.photos/id/${this.id}/200/200`;
  }

  scream(): void {
    console.log(`I'm ${this.name.toUpperCase()}!!!`);
  }

  speak(): void {
    console.log(`I'm ${this.name}`);
  }

  async getPosts(): Promise<PostsResponse> {
    const data = await this.jsonPlaceholderService.get<PostsResponse>(
      `posts?userId=${this.id}`
    );

    console.log(data);

    return data;
  }
}

const jsonPlaceholderService = new JsonPlaceholderAdapter();

export const person = new Person(1, "Manuel", jsonPlaceholderService);

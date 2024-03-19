export class Person {
  constructor(public readonly id: number, public readonly name: string) {}

  get imageUrl(): string {
    return `https://picsum.photos/id/${this.id}/200/200`;
  }

  scream(): void {
    console.log(`I'm ${this.name.toUpperCase()}!!!`);
  }

  speak(): void {
    console.log(`I'm ${this.name}`);
  }

  async getMoney(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(10);
      }, 1000);
    });
  }
}

export const person = new Person(1, "Manuel");

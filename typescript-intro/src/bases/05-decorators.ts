class NewPerson {
  constructor(public readonly id: number, public readonly name: string) {}

  scream(): void {
    console.log("No quiero!!!");
  }

  speak(): void {
    console.log("No quiero hablar!");
  }
}

const MyDecorator = () => {
  return (target: Function) => {
    return NewPerson;
  };
};

@MyDecorator()
export class Person {
  constructor(public readonly id: number, public readonly name: string) {}

  scream(): void {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  speak(): void {
    console.log(`I'm ${this.name}`);
  }
}

export const person = new Person(1, "Manuel");

person.scream();
person.speak();

const Deprecated = (deprecationReason: string) => {
  return (
    _: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    return {
      get() {
        const wrapperFn = (...args: any[]) => {
          console.warn(
            `Warning: ${memberName} is deprecated. ${deprecationReason}`
          );
          propertyDescriptor.value.apply(this, args);
        };
        return wrapperFn;
      },
    };
  };
};

export class Person {
  constructor(public readonly id: number, public readonly name: string) {}

  scream(): void {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  @Deprecated("We have a new method to scream")
  speak(): void {
    console.log(`I'm ${this.name}`);
  }
}

export const person = new Person(1, "Manuel");

person.scream();
person.speak();

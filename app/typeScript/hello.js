// Excute the code -> npx tsc hello.tsx
// Run the code -> node hello.js 
//Eg.1 
// function greet(name: string): string {
//   return `Hello, ${name}!`;
// }
// const message: string = greet("World");
// console.log(message);
// const abc= greet("Chandan");
// console.log(abc);
//Eg.2
// const user = {
// name: "Kushwaha",
// age: 30,
// isAdmin: true
// };
// console.log(user.name);  
//Eg.3
// const names: string[] = [];
// names.push("Sintu Maurya");
// console.log(names);
//Eg.4
// const names1: readonly string[] = ["Dylan"];
// names1.push("Jack"); //
// console.log(names1);
//Eg.5
// let ourTuple: [number, boolean, string];
// ourTuple = [5, false, 'Coding God was here'];
// ourTuple.push('Something new and wrong');
// console.log(ourTuple);
// const ourReadonlyTuple: readonly [number, boolean, string] = [5, true, 'The Real Coding God'];
// ourReadonlyTuple.push('Coding God took a day off');
//Eg.6 : TS - Object Types
// const car: { type: string, model: string, year: number } = {
//   type: "Toyota",
//   model: "Corolla",
//   year: 2009
// };
// console.log(car);
// const Biodata: {name : string, surname: string, age: number, college : string} ={
//     name: "Chandan",
//     surname: "Maurya",
//     age: 25,
//     college: "LPU"
// }
// console.log(Biodata);
//Eg.7 : Enums - numeric enum 
// enum CardinalDirections {
//   North = 1,
//   East,
//   South,
//   West
// }
// console.log(CardinalDirections.North); //1
// console.log(CardinalDirections.West); //4
//Eg.8 Type Interface
// interface Rectangle {
//   height: number,
//   width: number
// }
// const rectangle: Rectangle = {
//   height: 20,
//   width: 10
// };
// console.log(rectangle);
//Eg.9 : Union Type
// function printStatusCode(code: string | number) {
//   console.log(`My status code is ${code}.`)
// }
// printStatusCode(404);
// printStatusCode('404');
//Eg.10 : TS - Functions - Return Type
// function getTime(): number {
//   return new Date().getTime();
// }
// getTime();
// - Void Return Type
// function printHello(): void {
//   console.log('Hello!');
// }
// printHello();
//Eg.11 : TS - Casting
// let x: unknown = 'hello';
// console.log((x as string).length);
//Eg.12 : TypeScript - Classes -- Member Types | Member Visibility(Public, Private, Protected)
//a. Member Types | Member Visibility Modifiers
// class Person {
//   private name: string;
//   public constructor(name: string) {
//     this.name = name;
//   }
//   public getName(): string {
//     return this.name;
//   }
// }
// const person = new Person("Chandan Kushwaha");
// console.log(person.getName()); 
//b. this Keyword
// class Person {
//   // name is a private member variable
//   public constructor(private name: string) {}
//   public getName(): string {
//     return this.name;
//   }
// }
// const person = new Person("Chandan Kushwaha");
// console.log(person.getName());
//c. Readonly keyword
// class Person {
//   private readonly name: string;
//   public constructor(name: string) {
// // name cannot be changed after this initial definition, which has to be either at its declaration or in the constructor.
//     this.name = name;
//   }
//   public getName(): string {
//     return this.name;
//   }
// }
// const person = new Person("Chandan Kushwaha");
// console.log(person.getName());
//d. Implement Keyword | Inheritance Extends | Override
// interface Shape {
//   getArea: () => number;
// }
// class Rectangle implements Shape {
//   public constructor(protected readonly width: number, protected readonly height: number) {}
//   public getArea(): number {
//     return this.width * this.height;
//   }
//   public toString(): string {
//     return `Rectangle[width=${this.width}, height=${this.height}]`;
//   }
// }
// class Square extends Rectangle {
//   public constructor(width: number) {
//     super(width, width);
//   }
//   public override toString(): string {
//     return `Square[width=${this.width}]`;
//   }
// }
// const s = new Square(10);
// console.log(s.getArea());

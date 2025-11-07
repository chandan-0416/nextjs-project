//Eg.1 TypeScript - Generics

//a. Generics with Functions
// function createPair<S, T>(v1: S, v2: T): [S, T] {
//   return [v1, v2];
// }
// console.log(createPair<string, number>('hello', 42)); 

//b. Generics with Classes
// class NamedValue<T> {
//   private _value: T | undefined;

//   constructor(private name: string) {}

//   public setValue(value: T) {
//     this._value = value;
//   }

//   public getValue(): T | undefined {
//     return this._value;
//   }

//   public toString(): string {
//     return `${this.name}: ${this._value}`;
//   }
// }

// const value = new NamedValue<number>('myNumber');
// value.setValue(20);
// console.log(value.toString());

//c. Default Value
// class NamedValue<T = string> {
//   private _value: T | undefined;
//   constructor(private name: string) {}

//   public setValue(value: T) { //setter fxn
//     this._value = value;
//   }
//   public getValue(): T | undefined { //getter fxn
//     return this._value;
//   }
//   public toString(): string {  // for the concat
//     return `${this.name}: ${this._value}`;
//   }
// }
// const value = new NamedValue('myNumber');
// value.setValue('myValue');
// console.log(value.toString());

//Ex.2 TypeScript - Utility Types | 
//a. Partial
// interface Point {
//   x: number;
//   y: number;
// }
// const pointPart: Partial<Point> = {}; // `Partial` allows x and y to be optional
// pointPart.x = 10;
// pointPart.y =20;
// console.log(pointPart.x);
// console.log((pointPart));

//b.Required
interface Car {
  make: string;
  model: string;
  mileage: number;
}
const myCar: Required<Car> = {
  make: 'Ford',
  model: 'Focus',
  mileage: 12000 // `Required` forces mileage to be defined
};
console.log(myCar);

//c. Return Type
// type PointGenerator = () => { x: number; y: number; };
// const point: ReturnType<PointGenerator> = {
//   x: 10,
//   y: 20
// };
// console.log(point);

//d. Parameters
// type PointPrinter = (p: { x: number; y: number; }) => void;
// const point: Parameters<PointPrinter>[0] = {
//   x: 10,
//   y: 20
// };
// console.log(point);

//e. Readonly | Cannot assign to 'name' (as person.name = "Isreal") because it is a read-only property.
// interface Person {
//   name: string;
//   age: number;
// }
// const person:  Readonly<Person> = {
//   name: "Dylan",
//   age: 35,
// };
// person.name = 'Israel';
// console.log(person.name);
// console.log(person);

//Ex.3 Ts - Null, Undefined, optional chaining, null coalescing, null Ascretion (! operator), Array Bound Handlings

//Ex.4 TS with React

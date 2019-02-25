export function getGreeting(): string {
  return 'Hello World';
}

function sayHello() {
  // tslint:disable-next-line:no-console
  console.log(getGreeting());
}

sayHello();

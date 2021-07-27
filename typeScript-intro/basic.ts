// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

let age: number;

age = 12

let userName: string | string[];

userName = 'adam'

let isInstructor: boolean = true;

// More complex types

let hobbies: string[];

// Type aliasing
type Person = {
    name: String;
    age: number;
};

hobbies = ['Sports', 'cooking']

// reuse the type aliasing
let person: Person;

person = {
    name: 'adam',
    age: 27
}

// person = {
//     isEmployee: true
// }


let people: Person[]

//type inference
let course = 'react'; // typescript already determines the type when the variable is declared and assigned a value


//type union
let course_ID: string | number = 'react';

course_ID = 123;
course_ID = 'cs';


//Functions & Types with return type
// @ts-ignore
function add(a: number, b: number): number | string {

    return a + b
}

function print(value: any) {

    console.log(value)
}


// Generics

function insertAtBeginning<T>(array: T[], value: T) {

    const newArray = [value, ...array];

    return newArray;
}

const demoArray = [1, 2, 3];

// after the arguments are passed to the generic function, then it will know type the argument T should be
const updatedArray = insertAtBeginning(demoArray, 1) // [-1,1,2,3]
const stringArray = insertAtBeginning(['a', 'a'], 'c')

// will not work with the updatedArray since that is already determined as a number[]  type not a string[]
//updatedArray[0].split('')


// Classes


class Student {

    firstName: string;
    lastName: string;
    age: number;
    private courses: string[]

    constructor(first: string, last: string, age: number, courses: string[]) {

        this.firstName = first
        this.lastName = last;
        this.age = age;
        this.courses = courses
    }


    enrol(courseName: string) {
        this.courses.push(courseName)
    }

    listCourses() {
        return this.courses.slice()
    }


}

class StudentB {

// shorthand constructor class fields definitions
    constructor(
        private first: string,
        private last: string,
        private age: number,
        private courses: string[]
    ) {
    }


    enrol(courseName: string) {
        this.courses.push(courseName)
    }

    listCourses() {
        return this.courses.slice()
    }


}


const student = new Student('ADAM', 'EL', 27, ['Angular']);


student.enrol('react');

// student.courses

student.listCourses()


// interfaces

interface Human {
    firstName: string;
    age: number;
    greet: () => void;
}

let adam: Human;

adam = {
    firstName: 'adam',
    age: 27,
    greet() {
        console.log('Hello')
    }
};


class Instructor implements Human {

    firstName: string;
    age: number;

    greet() {
        console.log('hey there')
    }

    constructor(firstName: string, age: number) {

        this.firstName = firstName;
        this.age = age
    }
}

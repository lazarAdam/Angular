"use strict";
// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// Primitives
var age;
age = 12;
var userName;
userName = 'adam';
var isInstructor = true;
// More complex types
var hobbies;
hobbies = ['Sports', 'cooking'];
// reuse the type aliasing
var person;
person = {
    name: 'adam',
    age: 27
};
// person = {
//     isEmployee: true
// }
var people;
//type inference
var course = 'react'; // typescript alreaday detrmins the type when the variable is declared and assigned a value
//type union
var course_ID = 'react';
course_ID = 123;
course_ID = 'cs';
//Functions & Types with return type
// @ts-ignore
function add(a, b) {
    return a + b;
}
function print(value) {
    console.log(value);
}
// Generics
function insertAtBeginning(array, value) {
    var newArray = __spreadArray([value], array);
    return newArray;
}
var demoArray = [1, 2, 3];
// after the arguments are passed to the generic function, then it will know type the argument T should be
var updatedArray = insertAtBeginning(demoArray, 1); // [-1,1,2,3]
var stringArray = insertAtBeginning(['a', 'a'], 'c');
// will not work with the updatedArray since that is already determined as a number[]  type not a string[]
//updatedArray[0].split('')
// Classes
var Student = /** @class */ (function () {
    function Student(first, last, age, courses) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.courses = courses;
    }
    Student.prototype.enrol = function (courseName) {
        this.courses.push(courseName);
    };
    Student.prototype.listCourses = function () {
        return this.courses.slice();
    };
    return Student;
}());
var student = new Student('ADAM', 'EL', 27, ['Angular']);
student.enrol('react');
// student.courses
student.listCourses();
var adam;
adam = {
    firstName: 'adam',
    age: 27,
    greet: function () {
        console.log('Hello');
    }
};
var Instructor = /** @class */ (function () {
    function Instructor(firstName, age) {
        this.firstName = firstName;
        this.age = age;
    }
    Instructor.prototype.greet = function () {
        console.log('hey there');
    };
    return Instructor;
}());
console.log(student.courses);

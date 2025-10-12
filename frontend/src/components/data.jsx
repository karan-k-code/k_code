const TutorialData=[{
    id:1,
    title:'JavaScript ES6 Features',
    dec:'Learn about the latest ES6 features including arrow functions, template literals, and more.',
    img:'image/pexels-fauxels-3183165.jpg'
},{
    id:2,
    title:'CSS Grid Layout',
    dec:'Master the CSS Grid layout system to create complex responsive designs with ease.',
    img:'image/pexels-fauxels-3184423.jpg'
},{
    id:3,
    title:'React Hooks Guide',
    dec:'Understand how to use React Hooks to simplify your functional components.',
    img:'image/pexels-flodahm-699459.jpg'
},]

const ProjectData=[{
    id:1,
    title:'Task Manager App',
    dec:'A full-stack task management application built with React and Node.js.',
    img:'image/pexels-nguyendesigner-236397.jpg'
},{
    id:2,
    title:'Weather Dashboard',
    dec:'Real-time weather information using the OpenWeather API.',
    img:'image/pexels-shkrabaanthony-5816283.jpg'
}]


const Tutorial={
  author:{
    id:'k1',
    name:'Karan Kumar',
    img:'./image/karan_a.jpg',
    dec:'web developer',
    details:`JavaScript Architect with 10+ years of experience. Specializes in
                core JavaScript, performance optimization, and teaching
                fundamentals.`
  },
  language:'JavaScript',
  title:'Understanding JavaScript: Core Concepts Every Developer Should Know',
  dec:`JavaScript is the backbone of modern web development. Whether you're just starting or looking to solidify your foundation, understanding these core concepts is essential for every developer.'`,
  createDate:'August 10, 2024',
  img:'image/pexels-technobulka-10816120.jpg',
  note:'JavaScript - The language that powers the modern web',
  content:[
    {
        id:1,
        title:'1. Variables and Data Types',
        text:`JavaScript has three ways to declare variables: <code>var</code>, <code>let</code>, and <code>const</code>.`,
        code:`// Variable declarations
var oldVariable = "I'm function scoped";
let mutableVariable = "I can be reassigned";
const constantVariable = "I cannot be reassigned";

// Data Types
const primitiveTypes = {
    string: "Hello World",
    number: 42,
    boolean: true,
    null: null,
    undefined: undefined,
    symbol: Symbol('unique'),
    bigint: 9007199254740991n
};

// Complex Types
const complexTypes = {
    object: { key: "value" },
    array: [1, 2, 3],
    function: function() { return "I'm a function"; }
};`,

        pointdata:{
            title: 'Key Points',
            content:[
                `<code>let</code> and <code>const</code> are block-scoped (ES6+)`,
                `<code>const</code> doesn't make objects immutable, just prevents reassignment`,
                `JavaScript has dynamic typing (variables can change type)`],
            heightcolor:'important'
        }
    },
    {
        id:2,
        title:'2. Hoisting and Temporal Dead Zone',
        text:`JavaScript moves variable and function declarations to the top of their scope during compilation.`,
        code:`// Function declaration is hoisted
sayHello(); // Works
function sayHello() {
    console.log("Hello!");
}

// Variable declaration is hoisted but not initialization
console.log(myVar); // undefined (not ReferenceError)
var myVar = 5;

// let/const are hoisted but in Temporal Dead Zone (TDZ)
console.log(myLet); // ReferenceError
let myLet = 10;`,

        pointdata:{
            title: 'Key Points',
            content:[
                `<code>let</code> and <code>const</code> are block-scoped (ES6+)`,
                `<code>const</code> doesn't make objects immutable, just prevents reassignment`,
                `JavaScript has dynamic typing (variables can change type)`],
            heightcolor:'tip'
        }

    }
  ]

}

 export  { TutorialData, ProjectData, Tutorial}

//  heightcolor : important, warning, tip
## Five question answer down below

#### 1. What is the difference between var, let, and const?

- var → Variables declared with var are hoisted to the top of their scope and initialized with undefined.
- let → Hoisted but not initialized (in the "temporal dead zone" until declared). Cannot redeclare in the same scope, but you can reassign. Preferred for variables that change values.
- const → Same as let (hoisted but not initialized). Cannot be redeclared or reassigned. Preferred for values that should not be reassigned.

#### 2. What is the difference between map(), forEach(), and filter()?

- map Purpose → Transforms each element of an array and returns a new array of the same length. A new array with modified values. Mutates original array? No. When you want to transform data.
- forEach Purpose → Executes a function for each element, but does not return anything useful. Return Value: undefined. Mutates original array? Not directly (but you can mutate inside).When you just want to loop through elements
- filter Purpose → Filters elements based on a condition and returns a new array. A new array (can be smaller or empty).Mutates original array? No. When you want to remove or keep certain elements.

#### 3. What are arrow functions in ES6?

Arrow functions are a shorter way to write functions in JavaScript, introduced in ES6 (ECMAScript 2015).

#### 4. How does destructuring assignment work in ES6?

Destructuring assignment in ES6 is a handy way to extract values from arrays or objects and assign them to variables in a clean, concise way.

#### 5. Explain template literals in ES6. How are they different from string concatenation?

Template literals also called template strings are a new way to work with strings in ES6.
They use backticks (`) instead of single (') or double (") quotes.

- Concatenation → "... " + var + "..."
- Template Literals → `... ${var} ...`
- Template String or backtick → ``

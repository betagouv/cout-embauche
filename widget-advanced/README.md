

# Developing

This Web module is to be used along with the `cout-embauche` main module. It is designed as a second, more complex interface that will capture more information and append it to the main module's requests (which will then update the main module's computation results section).

This repository is experimental for now, and uses React + Redux + Redux-forms + cool associated packages

```bash
npm run start # --> read the output and open that address
```

> Tip : use Redux's developer tools by hitting Ctrl-H.
You'll be able to read the state of the application and see what actions are triggered when you use the app

ES2015 and some experimental language features like decorators and class property initializers are enabled with babeljs.

The `let` keyword is used everywhere, `const` is reserved for declaration of string constants (what is usually uppercased), since variable reassignment is barely used. 

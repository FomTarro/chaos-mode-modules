# CHAOS MODE
play it at [https://chaos-mode.herokuapp.com/](https://chaos-mode.herokuapp.com/)!
 
## The Premise
**CHAOS MODE** is a party game for many players, where they square off to complete microgames as rapidly as possible while outlasting each other. 
 
Completing microgames quickly will *'attack'* other players by applying *'trash'* to their timers: this means that those players will have less time to complete their next microgame! Keep completing microgames and moving forward to prevent too much *'trash'* from building up!
 
Being unable to complete a microgame before time runs out will give you a *'strike'*, and four *'strikes'* will eliminate you from the match! Be the last one standing to win!
 
In single-player, the game will simply be an endurance round, going until the player receives four *'strikes'*.
 
## About this Repo
This repo serves as the open-source repository for all the microgames which players can be served during gameplay. This repo does *not* contain the source code for the overarching game infrastructure itself.
 
## Contributing 
Additional microgames can be contributed to **CHAOS MODE** relatively easily! If you have a cool idea for a microgame, feel free to make a pull request to this repo!
 
### Tools
The examples are all written in vanilla JavaScript, HTML and CSS. However, feel free to use whatever toolchains and languages you like, so long as your microgame also compiles down into vanilla JavaScript, HTML and CSS. As such, no compilation or build process is needed for this repo.
 
The testing components of this repo utilize `node` and `npm` in order to execute unit tests and provide a simulated client for integration testing. However, they are not strictly needed for contribution. If you do use these tools, make sure to execute `npm install` in the command line before trying to run tests.
 
### The API
 
Each microgame is composed of two halves: the server-side code, and the client side code. We'll need both halves to make the microgame work. In addition, these halves must adhere to a simple API interface in order to plug in nicely with the game infrastructure.
 
An example of all the necessary components can be found in [`/games/exclude-example`](https://github.com/FomTarro/chaos-mode-modules/tree/master/games/exclude-example). It's worth mentioning that the `exclude-*` prefix on the microgame's folder is what prevents it from being loaded into the actual game itself.
 
This example microgame has the simple objective of requiring the player to mash a button a certain number of times, before the timer expires.
 
#### Server-Side
 
The server-side code must be located in a file named `*.game.js`. The file should contain the definition for a class called `Game` and must export that class with `module.exports.Game = Game`. It also must have the following function signatures:
 
* `constructor(logger)`: A constructor is needed, because each time the microgame is served to a player, it is a new instance. This allows you to set up some randomized data each time the microgame is played. In this example, we randomly set the number of times that the player must hit the button. In addition, a `logger` is passed into every microgame's constructor, which you can then use if you'd like. The logger can have the following method calls: `log`, `warn` and `error`.
 
* `get prompt()`: An accessor to inform the player of the microgame's objective. This should typically be a single-word command. This prompt does *not* need to be unique among the all microgames.
 
* `get setup()`: An accessor that can return whatever data in whatever structure you want, which will get fed to the client-side code at the time the player is served the microgame. In this example, we simply send the number of times that the player must push the button.
 
* `get path()`: An accessor that points to the `*.html` file of the front-end for the microgame. Must be a relative path.
 
* `get credits()`: An accessor to return the name or names of contributors for the module, to be listed on the game's credits page. Technically, this accessor is optional, but it is encouraged that you receive credit for your contribution!
 
* `function check(inputs)`: A function that consumes user input, which can be in whatever structure you want, as sent from the client-side code, and checks if the objective has been met. This function must return a boolean: `true` if the objective has been met, `false` otherwise. 
 
#### Client-Side
 
The client-side code can be located wherever and named whatever you like, as long as the front-end `*.html` file has a relative path to it in a `<script>` tag. In this example, our client-side code is found in the simply-named `script.js` file. There are only two major functions that your client-side code must have:
 
* `function config(setup)`: A function that consumes the content returned by the server-side code's `get setup()` accessor. As such, it is important to make sure that the data structure expectations between the client-side and server-side code match. Use this function to initialize the state of the microgame based on the provided setup data.
 
* `parent.network.checkInputs(inputs)`: A line that must be included in whatever functions execute upon user input in the client-side code. This line tells the server to call the server-side code's `check(inputs)` function. As such, it is important to make sure that the data structure expectations between the client-side and server-side code match.
 
 
### Testing
Testing your microgame module is generally a good idea! For almost all purposes, the following to testing approaches should prove sufficient. 
 
#### Unit Testing
 
This repo utilizes `jest` as the unit test runner of choice. [Documentation about `jest` can be found here](https://jestjs.io/docs/en/getting-started). By default, the framework is configured to run tests found in files named `*.spec.js`, and will collect test coverage results for `*.game.js` files. In addition, we also utilize a git-hook plugin called `husky` to make sure that all of our unit tests still pass before allowing code to be pushed. This is done to ensure that no breaking changes accidentally get published.
 
Lastly, you can run all unit tests by executing `npm run test` in the command line, or from `package.json` in your IDE. This is what `husky` does before each git push!
 
#### Integration Testing
 
In order to test that the client-side code and the server-side code integrate with each other correctly, this repo includes a small web server that simulates the integration of your microgame into the overall infrastructure. You can start the server by executing `npm run start` in the command line, or from `package.json` in your IDE. Once it's up and running, you can access it via browser at [`http://localhost:8080/`](http://localhost:8080/). 
 
### Publication
 
Once you're happy with your microgame, please file a pull request for this repo!
 
### Other Notes
 
Because each microgame module is served to players inside an `<iframe>`, this leaves the styling and design of your game entirely up to you. However, here are a few pointers:
 
* Keep it simple. Remember that players will only have a couple of seconds to complete the microgame, and even less if they have *'trash'* attacking them.
 
* Keep it lightweight. Remember that your microgame is just one of many, and that anything too complex can bloat the file size of the final compiled client, which gets served to players.
 
* Avoid `<img>` tags. While these do work just fine, they quickly add a tremendous amount of file size bloat. It is recommended that you rely on CSS or Canvas as much as possible for graphics. That said, the example  microgame *does* have an image as a proof-of-concept.
 


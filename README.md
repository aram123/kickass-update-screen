# kickass-update-screen
Tech demo for update system screen

### Cloning
``` sh
$ git clone https://github.com/aram123/kickass-update-screen.git
```

### Installation

kickass-update-screen requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies.

```sh
$ cd kickass-update-screen
$ npm install
```

### Setup
Start server
```sh
$ npm start
```
####Open in browser
By default kickass-update-screen uses port 3000, your app is ready on [http://127.0.0.1:3000](http://127.0.0.1:3000)

### Configs
Configs can be customized inside the config/settings.js file including:
```js
config.messages.initialMessage = "update";
config.messages.waitMessage = "updating...";
config.messages.finishMessage = "done!";

config.execute = "scripts/script.sh";
config.web.port = 3000;
```

### Upgrading to latest version
kickass-update-screen can be easily updated using the git utility inside the project.
```bash
$ git pull origin master
```

### Development

Want to contribute? Great!

kickass-update-screen uses Gulp for agile developing.
The task scripts it's used to build the main javascript file.

```sh
$ gulp scripts
```

### Tech

kickass-update-screen uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Gulp] - the streaming build system
* [jQuery] - duh
* [dat.gui] - a lightweight graphical user interface for changing variables in JavaScript. 
* [noisejs] - This is a simple library for 2d & 3d perlin noise and simplex noise in javascript. Noise is pretty.

License
----

MIT


**Free Software, Hell Yeah!**
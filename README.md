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

### Troubleshooting
#### node: not found
Some Ubuntu setups can be kind of shady having two nodejs packages, if you're encountered an error like the following
it can be solved by installing the nodejs-legacy package
```sh
sh: 1: node: not found

npm ERR! Linux 4.4.0-21-generic
npm ERR! argv "/usr/bin/nodejs" "/usr/bin/npm" "start"
npm ERR! node v4.2.6
npm ERR! npm  v3.5.2
npm ERR! file sh
npm ERR! code ELIFECYCLE
npm ERR! errno ENOENT
npm ERR! syscall spawn
npm ERR! kickass-update-screen@0.0.0 start: `node ./bin/www`
npm ERR! spawn ENOENT

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
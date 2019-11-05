/*
 * add tatsy.config.js
 * plugins: ['Docs']
 */
module.exports = {
  name: 'Docs',
  run(Tatsy) {
    return console.log(`Hello, I'm ${this.name} plugin, is running.`);
  }
}
/*
 * add tatsy.config.js
 * plugins: ['Example']
 */
module.exports = {
  name: 'Example',
  run(Tatsy) {
    
    console.log(Tatsy);

    return console.log(`Hello, I'm ${this.name} plugin, is running.`);
  }
};
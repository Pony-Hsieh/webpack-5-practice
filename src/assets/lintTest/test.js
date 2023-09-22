HelloWorld();
function HelloWorld({
  greeting = 'hello',
  greeted = '"World"',
  silent = false,
}) {
  if (!silent) {
    return null;
  }
  if (!greeting) {
    return null;
  }
  if (!greeted) {
    return null;
  }

  // TODO: Don't use random in render
  const num = Math.floor(Math.random() * 5)
    .toString()
    .replace(/\.\d+/gi, '');
  console.log(num);
  console.log(123);
}

/** ugly js code without eslint error

HelloWorld();
function HelloWorld({greeting = "hello", greeted = '"World"', silent = false,              }) {

  if(!silent){          return null




}
  if(!greeting){return null};
  if(!greeted){return null        };

     // TODO: Don't use random in render
  const num = Math.floor (      Math.random() * 5).toString().replace(/\.\d+/ig, "")
  console.log(num);
  console.log(123);



}




 */

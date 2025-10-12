const sayHi=(name)=>{
    console.log(`Hello there ${name}`)
}
module.exports=sayHi


const names=require('./4-names')
const sayHi=require('./own module')
//sayHi('susan')
// sayHi(names.john)
// sayHi(names.peter)
require('./7-mind-grenade')
// create our own module

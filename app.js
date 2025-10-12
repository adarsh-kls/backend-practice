// const os=require('os')
// const user=os.userInfo()
// console.log(user)
// console.log(`the system uptime is ${os.uptime()} seconds`)

// const path=require('path')
// console.log(path.sep)
// const filePath=path.join('/content','subfolder','test.txt')
// console.log(filePath)


const { readFileSync,writeFileSync }=require('fs')
const path = require('path')
console.log('start')
// Read files from the './content' directory relative to this script
const first = readFileSync(path.join(__dirname, 'content', 'first.txt'), 'utf8')
const second = readFileSync(path.join(__dirname, 'content', 'second.txt'), 'utf8')
console.log(first, second)

writeFileSync(
    './content/result-sync.txt',
    `Here is the result : ${first}, ${second}`,{flag:'a'}
)
console.log('done with this task')
console.log('starting the next one')
// const num1=5
// diff b/w sync and async is that sync is blocking and async is non blocking
// sync is easier to write and read but async is more efficient
// sync is used for small tasks and async is used for large tasks
// sync is used for tasks that are not time consuming and async is used for tasks that are time consuming
// sync is used for tasks that are not I/O bound and async is used for tasks that are I/O bound
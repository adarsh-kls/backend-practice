// const http=require('http');

// const server=http.createServer((req,res)=>{
// if(req.url==='/'){
//     res.end("Home page")
// }
// if(req.url==='/about'){
//     for(let i=0;i<1000;i++){
//         for(let j=0;j<1000;j++){
//             console.log(`${i} ${j}`)
//         }
//     }
//     res.end('About Page')
    
// }
// res.end('Error Page')
// })
// server.listen(5000,()=>{
//     console.log('server is listening on port 5000...')
// })

const {readFile}=require('fs')

const getText=(path)=>{
    return new Promise((resolve,reject)=>{
        readFile(path,'utf8',(err,data)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}
getText('./content/first.txt')
.then((result)=>console.log(result))
.catch((err)=>console.log(err))
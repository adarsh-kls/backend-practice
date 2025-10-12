const http=require('http');

const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.end('welcome to our home page')
        return
    }
    if(req.url==='/about'){
        res.end('here is our short history')
        return
    }
    // If no route matched, send a 404 HTML response
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html')
    res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back home</a>
    `)
})
// handle listen errors (e.g. port already in use)
server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
        console.error('Port 5000 is already in use.');
        process.exit(1);
    }
    throw err;
})

server.listen(5000, () => console.log('Server listening on port 5000'))
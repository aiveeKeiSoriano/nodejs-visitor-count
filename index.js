const http = require('http')
const fs = require('fs')

let count = 0;

const server = http.createServer((req, res) => {
    let path = ''
    if (req.url === '/styles.css') {
        res.writeHead(200, { "Content-Type": "text/css" });
        fs.readFile('./views/styles.css', (err, data) => {
            if (err) {
                console.log('error', err)
                res.write('Server Error')
                res.end()
            }
            res.write(data)
            res.end()
        })
    }
    else {
        if (req.url !== '/favicon.ico') count++
        switch (req.url) {
            case '/contacts':
                path = './views/contacts.html'
                break;
            case '/products':
                path = './views/products.html'
                break;
            case '/':
                path = './views/index.html'
                break;
            case '/home':
                path = './views/index.html'
                break;
            default:
                path = './views/index.html'
                break;
        }
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log('error', err)
                res.write('Server Error')
                res.end()
            }
            res.write(data)
            res.write('<script>const count = document.querySelector(".count");count.innerText = "Website visited: '+ count + ' times";</script>')
            res.end()
        })
    }
})

server.listen(8000, 'localhost', () => {
    console.log('Server is listening on 8000')
})
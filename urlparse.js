const http = require("http");

http.createServer((req, res) => {

  const address = 'https://www.example.com:8080/path/page?name=bhargavi&age=20';
  const parsedUrl = new URL(address);

  res.writeHead(200, { "Content-Type": "text/html" });

  res.write(`
    <h2>URL Details</h2>
    Full URL: ${parsedUrl.href} <br>
    Protocol: ${parsedUrl.protocol} <br>
    Host: ${parsedUrl.host} <br>
    Hostname: ${parsedUrl.hostname} <br>
    Port: ${parsedUrl.port} <br>
    Pathname: ${parsedUrl.pathname} <br>
    Search: ${parsedUrl.search} <br>
    Query name: ${parsedUrl.searchParams.get('name')} <br>
    Query age: ${parsedUrl.searchParams.get('age')}
  `);

  res.end();

}).listen(3000);

console.log("Server running at http://localhost:3000");
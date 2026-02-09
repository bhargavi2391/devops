const http = require("http");
const fs = require("fs");

const PORT = 3000; // changed from 8080 to avoid conflict

const server = http.createServer((req, res) => {
  fs.readFile("menubar.html", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

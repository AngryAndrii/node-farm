const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

////////////////////////////////
// FILES

// const textIn = fs.readFileSync("./txt/input.txt", 'utf-8');

// console.log(textIn);

// const textOut = `this is what we know about avocado: ${textIn}\nCreated on ${Date.now()}`

// fs.writeFileSync("./txt/output.txt", textOut, "utf-8");

// console.log('file written');

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//         console.log(data3);
//         fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, "utf-8", err => {
//             console.log('your file has been eritten')
//         })
// })})})

/////////////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("it is overview page");
  } else if (pathName === "/products") {
    res.end("it is product page");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("<h1>page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000");
});

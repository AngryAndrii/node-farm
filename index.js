const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");
const replaseTamplate = require("./modules/replaseTamplate");

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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardHTML = dataObject
      .map((el) => replaseTamplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCTS_CARDS%}", cardHTML);
    res.end(output);
  } else if (pathname === "/product") {
    const product = dataObject[query.id];
    res.writeHead(200, { "Content-type": "text/html" });
    const output = replaseTamplate(tempProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
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

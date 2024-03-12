const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === "/convert") {
    const { number, from, to } = query;

    if (!number || !from || !to) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(
        "Debe proporcionar un número, sistema de origen y sistema de destino."
      );
      return;
    }
    const parsedNumber = parseInt(number, from);

    if (isNaN(parsedNumber)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Número no válido en el sistema de origen.");
      return;
    }

    const convertedNumber = parsedNumber.toString(to);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(
      `El número ${number} en base ${from} es ${convertedNumber} en base ${to}.`
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Ruta no encontrada.");
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
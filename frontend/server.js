const http = require("http");

const port = process.env.PORT || 3000;
const apiUrl = process.env.API_URL || "http://localhost:4000";

const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Restaurant System</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f8f3ea;
      color: #2c2118;
      margin: 0;
      padding: 40px;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
    }
    h1 {
      margin-bottom: 8px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    .card {
      background: white;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    }
    .card img {
      width: 100%;
      height: 220px;
      object-fit: cover;
    }
    .card .content {
      padding: 16px;
    }
    .price {
      font-weight: bold;
      margin-top: 10px;
    }
    .btn {
      display: inline-block;
      margin-top: 14px;
      background: #2c2118;
      color: white;
      padding: 10px 16px;
      border-radius: 12px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Amaro Café</h1>
    <p>Cardápio digital</p>
    <div id="menu" class="grid"></div>
  </div>

  <script>
    fetch("${apiUrl}/api/v1/menu")
      .then(r => r.json())
      .then(items => {
        const menu = document.getElementById("menu");
        menu.innerHTML = items.map(item => \`
          <div class="card">
            <img src="\${item.imageUrl}" alt="\${item.name}">
            <div class="content">
              <h3>\${item.name}</h3>
              <p>\${item.description}</p>
              <div class="price">R$ \${item.price.toFixed(2)}</div>
              <a class="btn" href="#">Pedir</a>
            </div>
          </div>
        \`).join("");
      })
      .catch(() => {
        document.getElementById("menu").innerHTML = "<p>Erro ao carregar cardápio.</p>";
      });
  </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(port, () => {
  console.log("Frontend rodando na porta " + port);
});

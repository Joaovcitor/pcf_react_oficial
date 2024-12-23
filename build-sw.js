const workboxBuild = require("workbox-build");
const path = require("path");

// Defina os diretórios de entrada e saída
const buildDirectory = path.join(__dirname, "build"); // Pasta onde os arquivos de build do React são gerados
const swDestination = path.join(buildDirectory, "service-worker.js");

// Geração do Service Worker
workboxBuild
  .generateSW({
    swDest: swDestination, // Onde o service-worker.js será salvo
    globDirectory: buildDirectory, // Diretório de arquivos que você quer incluir no cache
    globPatterns: ["**/*.{html,js,css,png,jpg}"], // Padrões de arquivos para serem incluídos no cache (adicione mais conforme necessário)
    skipWaiting: true, // Ativa a atualização automática do SW sem precisar recarregar a página
    clientsClaim: true, // Faz o SW controlar imediatamente a página, sem precisar recarregar
  })
  .then(({ count, size }) => {
    console.log(
      `Service Worker gerado com sucesso! ${count} arquivos cacheados, totalizando ${size} bytes.`
    );
  })
  .catch((error) => {
    console.error("Erro ao gerar o Service Worker:", error);
  });

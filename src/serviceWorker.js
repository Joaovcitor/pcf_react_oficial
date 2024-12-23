// src/serviceWorker.js

export const register = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = `http://localhost:300/service-worker.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log("Service Worker registrado com sucesso:", registration);
        })
        .catch((error) => {
          console.log("Erro ao registrar o Service Worker:", error);
        });
    });
  }
};

export const unregister = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.log("Erro ao desregistrar o Service Worker:", error);
      });
  }
};

// Função para o Service Worker interceptar e armazenar arquivos em cache
export const cacheAssets = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("install", (event) => {
      event.waitUntil(
        caches.open("my-cache").then((cache) => {
          // Adicionando arquivos essenciais ao cache
          return cache.addAll(["/", "/index.html", "/styles.css", "/app.js"]);
        })
      );
    });

    navigator.serviceWorker.addEventListener("fetch", (event) => {
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // Retornar a resposta do cache se disponível
            return cachedResponse;
          }
          // Se não estiver no cache, faz a requisição para a rede
          return fetch(event.request);
        })
      );
    });
  }
};

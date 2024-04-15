// service-worker.js

// Tapahtuu, kun Service Worker asennetaan
self.addEventListener('install', event => {
    console.log('Service Worker asennetaan');
});

// Tapahtuu, kun Service Worker aktivoidaan
self.addEventListener('activate', event => {
    console.log('Service Worker aktivoitu');
});

// Tapahtuu, kun selain yrittää hakea resurssia (esim. sivua, kuvaa, tiedostoa)
self.addEventListener('fetch', event => {
    console.log('Resurssin haku: ', event.request.url);
    event.respondWith(
        // Palautetaan haku vastaamalla itse tai käyttämällä välimuistista, jos mahdollista
        fetch(event.request).catch(error => {
            console.error('Resurssin haun virhe: ', error);
            // Jos hakua ei voi noutaa verkosta ja siitä on tallennettu kopio välimuistissa, palautetaan se
            return caches.match(event.request);
        })
    );
});

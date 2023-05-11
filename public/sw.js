const staticName = 'app-static'
const dynamicName = 'app-dynamic'
self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(staticName)
          .then(cache => cache.addAll([
              'index.html',
              './src/App.js',
          ]))
  )
})

self.addEventListener('activate', async (event) => {
  const cacheNames = await caches.keys()
    await Promise.all(
        cacheNames.filter(name => name !== staticName && name !== dynamicName)
            .map(name => caches.delete(name))
    )
})

self.addEventListener('fetch',async event => {
/*    const url = new URL(event.request.url)

    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(event.request))
    }
    else {
        event.respondWith(networkFirst(event.request))
    }*/
    try {
        const response = await fetch(event.request)
        event.respondWith(response)
    }
    catch (error) {
        event.respondWith(await caches.match('index.html'))
    }
})

async function cacheFirst(request) {
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
}

async function networkFirst(request) {
    const cache = await caches.open(dynamicName)
    try {
        const response = await fetch(request)
        await cache.put(request, response.clone())
        return response
    }
    catch (error){
        const cached = await cache.match(request)
        return cached ?? await caches.match('index.html')
    }
}
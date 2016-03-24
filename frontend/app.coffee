$.get '/config/', (config) ->
    mapboxAccessToken = config.token
    window.map = L.map('map').setView(config.center, config.zoom)
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=#{mapboxAccessToken}", {
        id: 'mapbox.light'
    }).addTo map

    map.on 'click', (e) ->
        lat = e.latlng.lat.toFixed(3)
        lng = e.latlng.lng.toFixed(3)
        marker = L.marker([
            lat
            lng
        ]).bindPopup(lat + ' ' + lng).addTo map

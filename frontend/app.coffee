$.get '/api/config/', (config) -> $.get '/api/data_sets/', (data_sets) ->
    token = config.token
    mapUrl = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=#{token}"
    grayscale = L.tileLayer mapUrl, id: 'mapbox.light'
    streets = L.tileLayer mapUrl, id: 'mapbox.streets'

    layers = [grayscale]

    overlays = {}
    setsByIds = {}
    for set in data_sets.sets
        set.overlay = new L.LayerGroup()
        overlays[set.name] = set.overlay
        setsByIds[set.id] = set
        layers.push set.overlay

    map = L.map 'map',
        center: config.center
        zoom: config.zoom
        layers: layers
    map.scrollWheelZoom.disable()

    baseLayers =
        Grayscale: grayscale
        Streets: streets

    L.control.layers(baseLayers, overlays).addTo(map)

    renderData = (sets, cities) ->
        $.get '/api/data_entries/', (entries) ->
            byCities = {}
            for entry in entries.data
                byCities[entry.city_id] ?= {}
                byCities[entry.city_id][entry.set_id] ?= []
                byCities[entry.city_id][entry.set_id].push entry.value

            for setId, set of sets
                for cityId, city of cities
                    value = byCities[cityId]?[setId]?[0] or 0
                    color = getColor(setId)

                    city.markers ?= {}
                    if value > 0
                        city.markers[set.id] = L
                            .circle [city.lat, city.lon], value * 100,
                                color: color
                                fillColor: color
                                fillOpacity: 0.5
                            .bindPopup "#{city.name}<br>#{set.name}: #{value}"
                            .addTo set.overlay

    $.get '/api/cities/', (cities) ->
        citiesByIds = {}
        citiesByIds[city.id] = city for city in cities.list

        renderData(setsByIds, citiesByIds)

getColor = (id) ->
    colors =
        1: 'red'
        2: 'blue'
    colors[id]

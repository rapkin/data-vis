$.get '/api/config/', (config) -> $.get '/api/data_sets/', (data_sets) ->
    token = config.token
    mapUrl = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=#{token}"
    grayscale = L.tileLayer mapUrl, id: 'mapbox.light'
    streets = L.tileLayer mapUrl, id: 'mapbox.streets'
    satellite = L.tileLayer mapUrl, id: 'mapbox.satellite'

    layers = [grayscale]

    overlays = {}
    setsByIds = {}
    for set in data_sets.list
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
        Satellite: satellite

    L.control.layers(baseLayers, overlays).addTo(map)

    renderData = (sets, cities) ->
        $.get '/api/data_entries/', (entries) ->
            byCities = {}
            for entry in entries.data
                byCities[entry.city_id] ?= {}
                byCities[entry.city_id][entry.set_id] ?= []
                byCities[entry.city_id][entry.set_id].push entry.value

            columns = Object.keys(sets).length
            for setId, set of sets
                for cityId, city of cities
                    value = byCities[cityId]?[setId]?[0] or 0
                    color = getColor(setId)

                    city.markers ?= {}
                    if value > 0
                        y = parseFloat(city.lat)
                        x = parseFloat(city.lon) + (parseInt(setId) - columns/2 - 1) * .3

                        polygon = [
                            [y, x]
                            [y+value/200, x]
                            [y+value/200, x+.3]
                            [y, x+.3]
                        ]

                        city.markers[set.id] = L
                            .polygon polygon,
                                weight: 1
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
        3: 'green'
    colors[id]

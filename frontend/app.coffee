$.get '/api/config', (config) ->
    mapboxAccessToken = config.token
    window.map = L.map('map').setView(config.center, config.zoom)
    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=#{mapboxAccessToken}", {
        id: 'mapbox.light'
    }).addTo map

    renderData = (sets, cities) ->
        $.get '/api/data_entries', (entries) ->
            byCities = {}
            for entry in entries.data
                byCities[entry.city_id] ?= {}
                byCities[entry.city_id][entry.set_id] ?= []
                byCities[entry.city_id][entry.set_id].push entry.value

            for cityId, city of cities
                dataLine = (for setId, data of byCities[city.id]
                    "#{sets[setId].name}: [" + data.join(', ') + ']'
                ).join('<br>')
                city.marker = L
                    .marker [city.lat, city.lon]
                    .bindPopup """
                        #{city.name} [#{city.lat}, #{city.lon}]<br>
                        #{dataLine}
                    """
                    .addTo map

    $.get '/api/data_sets', (data_sets) ->
        setsByIds = {}
        setsByIds[set.id] = set for set in data_sets.sets

        $.get '/api/cities', (cities) ->
            citiesByIds = {}
            citiesByIds[city.id] = city for city in cities.list

            renderData(setsByIds, citiesByIds)

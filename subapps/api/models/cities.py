from subapps.api.models.generic import GenericModel

class CitiesModel(GenericModel):
    table = "cities"
    fields = ["name", "lat", "lon"]

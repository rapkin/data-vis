from subapps.api.models.generic import GenericModel

class LocationsModel(GenericModel):
    table = "locations"
    fields = ["name", "lat", "lon", "user_id"]

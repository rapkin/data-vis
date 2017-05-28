from subapps.api.models import locations as model
from subapps.api.controller.generic import GenericControler

class LocationsAPI(GenericControler):
    model = model.LocationsModel()

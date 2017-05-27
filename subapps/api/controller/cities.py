from subapps.api.models import cities as model
from subapps.api.controller.generic import GenericControler

class CitiesAPI(GenericControler):
   model = model.CitiesModel()

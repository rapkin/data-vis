from subapps.api.models import data_sets as model
from subapps.api.controller.generic import GenericControler

class DataSetsAPI(GenericControler):
   model = model.DataSetsModel()

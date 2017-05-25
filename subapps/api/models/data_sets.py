from subapps.api.models.generic import GenericModel

class DataSetsModel(GenericModel):
    table = "data_sets"
    fields = ["name", "user_id"]

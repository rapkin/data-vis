
def load_cfg(path):
    from flask import json, current_app

    f = open(path, 'r')
    data = json.load(f)

    current_app.config["MAPBOX"] = data["Mapbox"]
    current_app.config["DATABASE"] = data["Database"]
    for cfg_name in data["Flask"]:
        current_app.config[cfg_name] = data["Flask"][cfg_name]

    

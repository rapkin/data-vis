def load_cfg(path):
    from flask import json, current_app
    from datetime import datetime, timedelta

    f = open(path, 'r')
    data = json.load(f)

    current_app.config["MAP"] = data["Map"]
    current_app.config["DATABASE"] = data["Database"]
    for cfg_name in data["Flask"]:
        if cfg_name == "token_life":
            t = datetime.strptime(data["Flask"][cfg_name],"%H:%M:%S")
            delta = timedelta(hours=t.hour, minutes=t.minute, seconds=t.second)
            current_app.config[cfg_name] = delta
        else:
            current_app.config[cfg_name] = data["Flask"][cfg_name]

from configs.default_cfg import Config


class DevelopmentConfig(Config):
    DEBUG = True
    DATABASE = {
        "database": "data-vis",
        "user": "postgres",
        "host": "127.0.0.1",
        "password": 'root',
        "port": "5432"
    }    
    PORT = 3333



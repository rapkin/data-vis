from configs.default_cfg import Config


class DevelopmentConfig(Config):
    DEBUG = True
    DATABASE = "data-vis"
    USER = "postgres"
    HOST = "127.0.0.1"
    PASSWORD = 'root'
    PORT = "5432"



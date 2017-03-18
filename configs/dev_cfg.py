from configs.default_cfg import Config


class DevelopmentConfig(Config):
    DEBUG = True
    DATABASE = "data-vis"
    USER = "postgres"
    HOST = "127.0.0.1"
    PASSWORD = 'root'
    DB_PORT = "5432"
    APP_PORT = 3333



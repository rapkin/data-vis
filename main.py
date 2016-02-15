#!/usr/bin/env python

from flask import Flask, request, send_from_directory
import os
import cherrypy
from paste.translogger import TransLogger

PATH = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__, static_url_path=PATH)
app.debug = True

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/bower_components/<path:path>')
def send_bower_components(path):
    return send_from_directory('bower_components', path)

@app.route('/')
def root():
    return send_from_directory('static', 'index.html')

def run_server():
    app_logged = TransLogger(app)
    cherrypy.tree.graft(app_logged, '/')

    cherrypy.config.update({
        'engine.autoreload_on': True,
        'log.screen': True,
        'server.socket_port': 3333,
        'server.socket_host': '0.0.0.0'
    })

    cherrypy.engine.start()
    cherrypy.engine.block()

if __name__ == "__main__":
    run_server()

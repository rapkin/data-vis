import os
import cherrypy

cherrypy.config.update({'server.socket_port': 3333})
PATH = os.path.abspath(os.path.dirname(__file__))

class DataVis(object):
    @cherrypy.expose
    def json(self):
        return '{"name": "root"}'

if __name__ == '__main__':
    conf = {
         '/': {
             'tools.staticdir.on': True,
             'tools.staticdir.dir': PATH + '/static',
             'tools.staticdir.index': 'index.html'
        }
    }

    cherrypy.quickstart(DataVis(), '/', conf)

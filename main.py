import os
import cherrypy

PATH = os.path.abspath(os.path.dirname(__file__))

class HelloWorld(object):
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

    cherrypy.quickstart(HelloWorld(), '/', conf)

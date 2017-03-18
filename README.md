## Installation

### Ubuntu 14.04

* `sudo apt-get install python-dev`
* `sudo apt-get install postgresql postgresql-contrib`
* `sudo apt-get install libpq-dev`

### Both

* Install Node.js
* `npm install -g bower gulp coffee-script pug stylus`
* `npm install` - node dependencies
* `bower install` - frontend dependencies
* `pip install -r requirements.txt` - to install all dependencies

## Database

* Install PostgreSQL
* Enter shell: 'psql -U postgres'
* `createdb data-vis`
* `createuser data-vis -w 'data-vis'`


## Build

* `gulp` - build once
* `gulp dev` - build and watch (dev mode)

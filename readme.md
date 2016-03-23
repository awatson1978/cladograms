cladograms
=======================

A cladograms graphing utility.


======================
#### Installation

````bash
mongoimport --db meteor -c taxonomy --port 3001 --jsonArray --file public/data/taxonomy.json
````


======================
#### Galaxy Deployment

````bash
DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy cladograms.meteorapp.com --settings settings.json
````

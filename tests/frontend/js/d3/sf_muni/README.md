Real-time positions of SF buses and trains

Testing

  The webpage is located in views/index.html. This needs to be served by a web
  server. The reason for this is that the GeoJSON map file (streets.json) needs
  to be read from disk and there was no nice frontend way of doing this. One
  easy way to run a webserver (with Python 2.7) is

  python -m SimpleHTTPServer

  The website should be available after this at localhost/views. It takes some
  time to load all the bus data, but after that each predictable vehicle is
  represented by a red circle on the map. If the map is too small, you can zoom
  in with the mouse wheel. To show only specific routes, click on
  "Show custom routes" at the bottom and select which routes to be displayed.

  Another thing worth mentioning about a webserver is that in a real production
  environment I would use a middleware to server public files. Since I didn't
  want to go into backend as well, the paths for public files are not in the
  nicest format (e.g. "../public/...").

Building

  Source files are in src. To build the project I used webpack. Assuming all the
  npm packages are installed ("npm install" in root dir), to build the project
  run

  npm run build

  You need to have webpack installed for this

  npm install webpack

  This will produce one bundled and minified javascript file (index.min.js).
  To build in a debug friendly mode, run the same command without NODE_ENV set
  to production. This will produce index.js (index.html needs to be updated
  to use this script as well) which should give friendlier messages with React
  developer tools.

Implementation

  I used React + Flux. Since Flux doesn't work that well with stateful
  components, I used a functional component as a wrapper (MainViewWrapper).
  I went with stateful components to know when the component is mounted so I
  can fetch data that is tied to that component only once (e.g. map and routes
  data). There are 3 components on the page

  MainView
    * consists of MapView + RouterControlView
    * when this is mounted the data for the routes and buses is fetched from
      Next Bus feed (this is needed in both MapView and RouterControlView)

  MapView
    * this is the map rectangle
    * when this is mounted, map data is fetched from streets.json
    * when this is rendered, all the vehicles from the store will be drawn as
      red circles

  RouterControlView
    * this has 2 radio options
    * if the custom one is selected, a list (rather ugly one) of checkboxes
      will be displayed, allowing you to filter routes

  I only used one store - MainStore. Here I stored all the map, bus and control
  data. When something is changed on the interface or when the interval function
  is executed, a new action is created, which will result in data changed in the
  store, which in turn will trigger a re-render of components.

  I placed all the logic to interact with NextBus feed in a separate module -
  NextBus.js. This works in async fashion, since it performs AJAX requests to
  NextBus website, and emits an event when data is fetched. When this happens,
  a new action is generated.

  I also used d3.js (for AJAX calls and to draw the map + buses) and ES6
  JavaScript (transpiled with babel). To project the data in GeoJSON map file
  from (longitude, latitude) to (x, y) on screen I used the Mercator projection.

Other things

  One thing I noticed is that sometimes NextBus feed returns vehicles with
  undefined values, so I had to filter that out.

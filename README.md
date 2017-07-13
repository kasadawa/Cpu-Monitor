# Cpu-Monitor
With this lite app you can monitor the average work of your CPU for the last 60 seconds in the browser.
see the aurage usage of your CPU( in %).
The project is implemented using plotly-js as front-end and nodeJs/express for back-end. Ws is used for communication between them.


Quick installation: 
clone/donwlaod the repo
run npm install
run npm start
open the browser and type http://localhost:3100 and the graph with the average CPU usage will appear.


Deppendencies

    "body-parser" -- parse json
    "express" -- lite server/router
    "os-utils"  -- getting cpu usage (in %) on Mac machines
    "windows-cpu" -- getting cpu usage (in %) on windows machines
    "ws" -- socket for sending the data to the html 

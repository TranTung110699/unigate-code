#!/bin/bash
# use dev routes, where React Loadable is not used. Fixes some issues with hot reload & Loadable not working nicely together
cd src/routes
cp admin.dev.js admin.js
cp nodeEditContainer.dev.js nodeEditContainer.js
cp dashboard.dev.js dashboard.js
 

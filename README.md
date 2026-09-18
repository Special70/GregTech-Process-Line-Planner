# GregTech Process Line Planner

Created by Special70

This project is made to help Star Technology Players plan out the machines and resources they need to start producing the resources they need. Normal GregTech runners can use this website since the only difference is that there are extra items from the Star Technology modpack.

It was initialized due to a course project requirement where utilizing React Vite, Rest API and Database Access was required

Tools Used:
- `IconExporter Mod` : get the metadata and live icon of items with ease to make item displays in the material suggester possible
- `Claude AI` : helped vibecode simple logic to scrape JEI recipe type names, converting 64x64 img files from IconExporter into atlas webp files and generationg json files to pair an item's ingame name, icon file name and their sheet + coordinate values. Also partially helped during development such as knowledge gaps but most of the important logic is done manually

&nbsp;  
The repository has 2 folders that contains files that serves their respective jobs:
- `react_vite_website` : contains the react website
- `backend_service` : contains the backend code that will be used for backend service runners.
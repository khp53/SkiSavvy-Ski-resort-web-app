# skisavvy_group_11

## How to run node server

To run the Node.js server part with Eclipse, you can follow these steps:

Open Eclipse and navigate to your project directory.
Make sure you have Node.js installed on your system.
Open a terminal or command prompt and navigate to your project directory.
Install the required dependencies by running the following command:
npm install
Once the dependencies are installed, you can start the Node.js server by running the following command:
node app
The server should now be running. You can access it by opening a web browser and navigating to http://localhost:4000


Or you can click on the run button on eclipse.

## Front-end

At http://localhost:4000 the project has been deployed.

To access Calculate Route use case:
1. From home page click on Calculate Route button on the nav bar.
2. It should automatically fetch the map data from mongo db using "localhost:4000/api/resort" REST API.
3. After the map data finished loading the system will ask user for start point.
4. After start point has been selected, the system should prompt the user for the end point.
5. Next The system will ask the user to input there difficulty.
6. On the right side of the map the difficulty selection drop-down should be presented by the system.
7. After a difficulty has been choosen, the system will then calculate all possible routes to the destination point.
8. After route calculation, the system will show the route and mark them will appropriate color.
9. The system will also prompt the user if they want they can choose from different route options.
10. The system will present user with route choice drop-down.
11. The route difficulty and route type information can be display by user when they hover over the routes.
12. The points or node types or names can be displayed by the user when they hover over the nodes.
13. Finally to restart or reselect routes there will be a green reset button at the bottom.



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.

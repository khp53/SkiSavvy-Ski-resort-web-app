# skisavvy_group_11
# For Iteration 3 Please refer to iteration_3 branch

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

To access Calculate Route use case:
Note: User has to first go to calculate route page from home screen nav bar.
1. The SkiSavvy application provides Skiers with an overview of the ski area.
2. The SkiSavvy application requests Skier provide a start location.
3. The skier selects the start location.
4. The SkiSavvy application requests the Skier to provide an
end location.
5. The skier selects the end location.
6. The SkiSavvy application requests the Skier to provide info
about acceptable slope difficulty levels.
7. The skier enters slope restrictions.
7a. The skier requests the SkiSavvy application to use Skier’s stored profile.
7b. The SkiSavvy application retrieves Skier’s profile and uses it to determine acceptable difficulty level.
7b.1 No profile is available.
7b.2 SkiSavvy application informs Skier about missing profile. Use Case resumes at step 7.
8. The application prompts user to calculate route.
9. The skier clicks on calculate route.
10. The SkiSavvy application calculates possible routes to the
requested destination (based on restrictions).
11. The application displays all possible paths below map.
12. SkiSavvy application requests the Skier to select a route
based on indicated criteria (e.g., fastest, longest, easiest,
minimum lift usage)
13. The skier selects one of the options.
14. The SkiSavvy application displays the desired route (based
on the selected criteria).
15. The application displays path based on criteria under map.
16. The application offers the skier to reset all options or to go back to the previous route.



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.

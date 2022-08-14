# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Imrpovements that can be made with more time

First of all, the openweathermap seems to be in some way faulty, since it doesn't have cors enabled and even after working around that it still would throw 403 at some occasions. This is why I am using the json file, downloaded from the browser. This is the most important thing to be figured out and fixed. Otherwise - project architecture could be better, obvoiusly styling and UI/UX can be much improved. City selector can be added based on the selected country instead of having only one country selector. Weather information can probably be displayed better and in more depth.

Didn't have time to create any sort of testing for the application - this is also something that should be done with more time.

Some more though can be put into how to manipulate the data from openweathermap to be displayed in the best way possible. I decided that gropuing everythin by day and then expanding results for different hours of the day is probably most intuitive. Nevertheless it can be done in some sort of slider that flows through the hours and days respectively. 

There are some places that type ```any``` is being used, which is always not a good practice. Couldn't find a typing that openweathermap provides, so decided that it would be a waste of time to write out the whole structure of the data. With more time, that should probably be done. 

There probably will be some optimisations to be made - for example minimising the rerenders. I have tried to do that anyways, but feels like it can be better (probably by using persistent state for caching state)

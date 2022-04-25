# A test graphql backend

## How to run
- npm i
- npm run start
- open browser at http://localhost:4000/
- enjoy

## The task
Implement a react app using this graphql backend. App contains a **list of news** with *title*, *date*, *author* and a *number of likes*. Every news could be opened in a separate page with a verbose data (*all the fields*) with a buttons to **like**/**dislike** and **delete** the news.

## Notes
- App design doesn't matter
- Backend app can't be changed
- Supplemental data refreshes are considered to be a bad practice

# Solution
## How to run
- `npm run start` to run the app in the development mode. Open [http://localhost:1234](http://localhost:1234)
- `npm test` to run the unit tests
- `npm run typecheck` to check if there any typescript error
- `npm run lint` to check if there any linting error
- `npm run audit` to check if there any vulnerabilites in the dependencies
- `npm run build` to build the app for production.

## Notes
- I added loremflickr images to make the app look better.

- I used as few as possible requests to graphql server according to description. In a real enviroment with multiple users interacting, refetches from backend should be used to keep data synced. 

- You can find the app deployed [here](https://oceana-62233.web.app/) and the apollo server [here](https://oceana-graphql-server.herokuapp.com/graphql).
# Interview Scheduler

Using the latest tools and techniques, Interview Scheduler is a easy to use WebApp that allows users to book and cancel interviews. Built with React as a Single Page App, data is persisted by an API server using a PostgreSQL database. We use a WebSocket server to build a realtime experience. UI components are built through StoryBook. Testing is completed with Jest and Cypress.

 ## Features
- Once an interview is booked, users can make edits to their appointment or cancel it if needed. 
- The intuitive navigation bar lets users switch between the days of the week, view current appointments and view open time slots. 
- The remaining number of available appointments is noted under each day of the week and will update as appointments are booked or cancelled.
- When booking, editing, or deleting appointments, users will be shown a status indicator while the appointment saves/deletes.


!["Screenshot of Main page"](https://github.com/a-tuyen/scheduler/blob/master/docs/Scheduler-Main.png?raw=true)
!["Screenshot of New Appointment"](https://github.com/a-tuyen/scheduler/blob/master/docs/Scheduler-New-Appt.png?raw=true)
!["Screenshot of Deleting Appointment"](https://github.com/a-tuyen/scheduler/blob/master/docs/Scheduler-Delete-Appt.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Dependencies
- React
- React Test Renderer
- Axios
- Classnames
- Normalize.css
- StoryBook
- Node-Sass
- Prop-types
- Babel
# React Invoice Generator

React Invoice Generator allows you quickly make invoices and save them as PDF. [https://tuanpham-dev.github.io/react-invoice-generator/](https://tuanpham-dev.github.io/react-invoice-generator/)

![react-invoice-generator](https://raw.githubusercontent.com/tuanpham-dev/react-invoice-generator/master/screenshot.png)

Additionally, I added a small express script to allow for invoice management: That is, you can easily create new invoices and change old ones.

To use this repo, do the following steps:

1. Clone repo
2. Install packages by running `yarn install`
3. Copy `allInvoices.example.json` and rename it to `allInvoices.json`
4. Spin up the website by running `yarn dev`
5. Spin up the server by running `yarn server`
6. Manage your invoices from a single place.

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn lint` (`lint:write`)

Launches Prettier, an opinionated code formatter.

https://prettier.io/

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

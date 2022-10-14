#Robot Navigator

This next app visualises the position of a robot on map, based on X, Y and Angle parameters. The coordinate data is received from a websocket stream.

The interface consists of two parts, the “Controls” unit to the left and the “Map” unit to the right. The control unit consists of Start and Stop toggle buttons to move the robot. It displays the current position of the robot along with a “Copy” button to copy the data to clipboard.

The user can submit a new position by submitting coordinates through the “New robot pose” form. The user can also click anywhere inside the map to send a new robot position to the backend, changing the robot position on the map in real-time. Hovering over the robot also displays a tooltip displaying the current position of the robot.

## Installation

This project can be installed using the following commands

```bash
yarn install # or `npm install`
```

You can then run the development server:

```bash
yarn dev # or `npm run dev`
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the interface.

## Device support

This app is supported by wide screen devices with resolution greater than 1200px

## Future improvements

1. Click and drag on map to set pose along with position
2. Navigation arrows
3. Validation for New robot pose form
4. Small screen device support
5. Elaborate test suites

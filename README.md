# VoltageController
Voltage controller for Arduino Uno and Raspberry Pi 2(RasPi). Controlling is done via a web user interface.

Front-end:
The front-end is constructed with Angular.js. In consists of one knob controlling one of Arduino Uno's PWM outputs (http://www.russellmcc.com/knobjs/). 
The output range is 0-5V, with resolution of 2^8=256. Front-end server code is in 'index.js' which is run by node.js. Front-end code uses a websocket connection(socket.io) to communicate with RasPi.

Back-end:
Here 'back-end' means the server running on RasPi. The server-side code has an index.js-file that is run by node.js. This file forms a websocket connection with the front-end. This file also forms a serial-port -connection with Arduino Uno. When the RasPi receives a websocket-package, it's transmitted to the Arduino uno with the established serial-port -connection. The code is also listening incoming serial-port data from the Arduino Uno. When it receives data from the Arduino, the data is forwarded to the web-UI via the websocket -connection.

Arduino (sendReceiveVoltages.ino):
A simple python-code that sends and receives voltage-information. It uses an interrupt-service-routine to read analog voltages from an adc-pin at 100Hz frequency. The ISR also sends the voltage value to the RasPi if the voltage has changed. Incoming serial-data is polled in the main-loop and updated to PWM output (in my application, it drives a LED).

const ReactNative = require("react-native");
const { Buffer } = require("buffer");
const { NativeModules, DeviceEventEmitter } = ReactNative;
const BluetoothSerial1 = NativeModules.BluetoothSerial;

/**
 * Listen for available events
 * @param  {String} eventName Name of event one of connectionSuccess, connectionLost, data, rawData
 * @param  {Function} handler Event handler
 */
BluetoothSerial1.on = (eventName, handler) => {
  DeviceEventEmitter.addListener(eventName, handler);
};

/**
 * Stop listening for event
 * @param  {String} eventName Name of event one of connectionSuccess, connectionLost, data, rawData
 * @param  {Function} handler Event handler
 */
BluetoothSerial1.removeListener = (eventName, handler) => {
  DeviceEventEmitter.removeListener(eventName, handler);
};

/**
 * Write data to device, you can pass string or buffer,
 * We must convert to base64 in RN there is no way to pass buffer directly
 * @param  {Buffer|String} data
 * @return {Promise<Boolean>}
 */
BluetoothSerial1.write = data => {
  if (typeof data === "string") {
    data = new Buffer(data);
  }
  return BluetoothSerial1.writeToDevice(data.toString("base64"));
};

module.exports = BluetoothSerial1;

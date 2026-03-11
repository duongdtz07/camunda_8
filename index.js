const { ZBClient } = require("zeebe-node");

const zbc = new ZBClient({
    gatewayAddress: "localhost:26500",
    useTLS: false,
    oAuth: {
        url: "http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token",
        audience: "zeebe-api",
        clientId: "orchestration",
        clientSecret: "secret",
    }
});

const client = require("./workers/client");
const validateOrder = require("./workers/validateOrder.js");
const processPayment = require("./workers/processPayment.js");
const checkInventory = require("./workers/checkInventory.js");
const notifyOutOfStock = require("./workers/notifyOutOfStock.js");
// const publishMessageCancelOrder = require("./publishMessage-cancelOrder.js");
const sendShippingNotification = require("./workers/sendShippingNotification.js");
const refundPayment = require("./workers/refundPayment.js");
const shippingToClient = require("./workers/shippingToClient.js");

client(zbc);
validateOrder(zbc);
processPayment(zbc);
checkInventory(zbc);
notifyOutOfStock(zbc);
sendShippingNotification(zbc);
refundPayment(zbc);
shippingToClient(zbc);

console.log("Workers are running...");
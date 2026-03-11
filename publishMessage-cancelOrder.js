const { ZBClient } = require("zeebe-node");

const zbc = new ZBClient('localhost:26500');

async function cancelOrder() {
  await zbc.publishMessage({
    name: "cancel-order",
    correlationKey: 10, // Use the orderId as the correlation key
    variables: {
      cancellationReason: "Customer requested cancellation",
      reason: "customer cancel",
    },
  });

  console.log("Cancel order message sent");
}

cancelOrder();
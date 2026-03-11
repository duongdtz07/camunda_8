
// =========== START NOTIFICATION WORKER ============
module.exports = (zbc) => {
  zbc.createWorker({
    taskType: "send-shipping-notification",
    taskHandler: async (job) => {
      const { orderId, customer } = job.variables;
      console.log(
        `Sending shipping notification for order ${orderId} to ${customer}`,
      );
      const isShipping = false; // Simulate shipping status
      if (isShipping) {
        // Simulate sending notification
        await job.complete({
          notificationStatus: "Shipping notification sent",
          isShipping,
        });
      } else {
        await job.complete({
          notificationStatus: "Shipping notification not sent",
          isShipping,
        });
      }
    },
  });
}

// ============ END NOTIFICATION WORKER ============
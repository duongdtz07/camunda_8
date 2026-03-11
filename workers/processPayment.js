const paymentService = require("../services/paymentService");

// =========== START OTHER WORKERS (PAYMENT, INVENTORY, NOTIFICATION, REFUND) ============
module.exports = (zbc) => {
  zbc.createWorker({
    taskType: "process-payment",
    taskHandler: async (job) => {
      const { orderId, price, isValid } = job.variables;
      try {
        const paymentSuccess = await paymentService.pay(price); // customer card hasn't enough money
        if (paymentSuccess) {
          return await job.complete({
            paymentStatus: "Payment successful",
            paymentSuccess,
          });
        } else {
          console.log(
            "Payment failed: Customer account does not have enough balance",
          );
          return await job.error(
            "PAYMENT_FAILED",
            `Error processing payment: Customer account does not have enough balance`,
          );
        }
      } catch (error) {
        console.log("Error Payment failed: ", error);
        return await job.fail(
          {
            paymentStatus: "Payment processing error",
            paymentSuccess: false,  
          },
          job.retries - 1, // Decrease retries by 1
        );
      }
    },
  });

  zbc.createWorker({
    taskType: "handle-payment-failure",
    taskHandler: async (job) => {
      let retryCount = job.variables.retryCount || 0;
      retryCount++;

      console.log("Retry payment: ", retryCount);

      return job.complete({
        retryCount,
        paymentStatus: "Payment failed",
        message: "Customer account does not have enough balance",
      })
    },
  });
}


// ============ END OTHER WORKERS (PAYMENT, INVENTORY, NOTIFICATION, REFUND) ============



// =========== START REFUND WORKER ============
module.exports = (zbc) => {
  zbc.createWorker({
    taskType: "refund-payment",
    taskHandler: async (job) => {
      const { orderId, price } = job.variables;
      console.log(`Processing refund for order ${orderId} with amount ${price}`);
      // Add your refund processing logic here
      // await job.complete();
      try {
        const refundSuccess = true; // Simulate refund success
        if (refundSuccess) {
          await job.complete({
            refundStatus: "Refund successful",
            refundSuccess,
          });
        }
      } catch (error) {
        await job.error(
          "REFUND_ERROR",
          `Error processing refund: ${error.message}`,
        );
        return;
      }
    },
  });
}
// ============ END REFUND WORKER ============
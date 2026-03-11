
// =========== START INVENTORY CHECK WORKER ============
module.exports = (zbc) => {
  zbc.createWorker({
    taskType: "check-inventory",
    taskHandler: async (job) => {
      const { productName, quantity } = job.variables;
      console.log(`Checking inventory for ${quantity} x ${productName}`);
      // Add your inventory checking logic here
      // await job.complete();
      const inventoryAvailable = quantity <= 100; // quantity <= isStock; // Simulate inventory check
      if (inventoryAvailable) {
        await job.complete({
          inventoryStatus: "Inventory available",
          inventoryAvailable,
        });
      } else {
        await job.complete({
          inventoryStatus: "Inventory not available",
          inventoryAvailable,
        });
      }
    },
  });
} 

// ============ END INVENTORY CHECK WORKER ============
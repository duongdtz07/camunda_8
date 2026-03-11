
// =========== START OUT OF STOCK NOTIFICATION WORKER ============
module.exports = (zbc) => {
    zbc.createWorker({
        taskType: "notify-out-of-stock",
        taskHandler: async (job) => {
            const {orderId, productName} = job.variables;
            console.log(`Notifying customer about out of stock for order ${orderId} and product ${productName}`);
            // Add your notification logic here
            try {
                const notificationSent = true; // Simulate notification sending
                if (notificationSent) {
                    await job.complete({
                        notificationStatus: "Out of stock notification sent",
                        notificationSent,
                    });
                }
            } catch (error) {
                await job.error(
                    "NOTIFICATION_ERROR",
                    `Error sending out of stock notification: ${error.message}`,
                );
                return;
            }
        },
    });
}

// ============ END OUT OF STOCK NOTIFICATION WORKER ============
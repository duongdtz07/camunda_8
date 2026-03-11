module.exports = (zbc) => {
    zbc.createWorker({
        taskType: "order-success-send-mail",
        taskHandler: async (job) => {
            const { orderId, customer } = job.variables;
            console.log(`Shipping order ${orderId} to customer ${customer}`);
            // Add your shipping logic here
            return await job.complete();
        },
    })
}
const {ZBClient} = require("zeebe-node");
const zbc = new ZBClient();

async function main() {
    try {
        // Deploy the BPMN process
        // const res = await zbc.deployProcess("./diagram_demo_process_full.bpmn");
        
        // Create a new process instance    
        const instance = await zbc.createProcessInstance({
            bpmnProcessId: "Process_0hwofoe",
            variables: {
                price: 20000000,
                orderId: 50,
            },
        });
        console.log("Process instance created:", instance);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await zbc.close();
    }
}

main();

zbc.createWorker({
    taskType: "process-handled-request",
    taskHandler: async (job) => {
        const {price, orderId} = job.variables;
        try {
            const isValid = await handledRequest(orderId);
            if (isValid) {
                await job.complete({
                    validationStatus: "Order is valid",
                    isValid,
                });
            } else {
                await job.error(
                    "ORDER_VALIDATION_FAILED",
                    `Order validation failed for orderId ${orderId}`,
                );
            }
        } catch (error) {
            await job.fail({
                errorMessage: `Error processing handled request: ${error.message}`,
            }, job.retries - 1);
        }
    }}
);

const handledRequest = async (orderId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${orderId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.id === orderId) {
                    return true; // Simulate valid order if API returns matching orderId
                }
                return false; // Simulate invalid order otherwise
            })
            .catch((error) => {
                console.error("Error validating order:", error);
                return false;
            });
        return response;
    } catch (error) {
        console.error("Error in handledRequest: ", error);
        throw error; // Rethrow the error to be caught in the worker
    }
};
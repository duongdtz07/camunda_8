# 1. Business Errors (Error nghiệp vụ)
[Đây là lỗi xảy ra do logic nghiệp vụ trong BPMN, không phải lỗi hệ thống]

ex: KH không đủ tiền thanh toán, payment bị từ chối, không tìm thấy đơn hàng

Trong BPMN thường được xử lý bằng: 
- Error Boundary Event
- Error End Event
- Error Throw

Ex: Check Payment
    |
    | ---> Payment success -> Ship Order
    |
    |---> Payment failed -> Error - Cancel Order

Đặc điểm:
- Có thể dự đoán
- Không tạo incident
- Xử lý bằng BPMN - Error Event
## => Operater thường không phải can thiệp

# 2. Technical Errors (lỗi kỹ thuật)
(Đây là lỗi phổ biến mà vận hành phải xử lý)

- Xảy ra khi JOB WORKER Fail khi xử lý job
EX: Worker gọi API thì 
    + API timeout
    + API trả 500
    + Network lỗi
    worker code: job.fail("Paymen service unavailable", 3)
    Hệ thống tự động retry


# Gặp lỗi:
06:45:41.049 | zeebe |  [process-handled-request] INFO: Grpc channel closed
06:45:41.050 | zeebe |  INFO: Grpc channel closed

Grpc là giao thức kết nối worker/client với zeebe gateway
Khi gặp error này tức là:
- Zeebe/ Gateway container bị stop
- Docker compose down
- Worker vẫn chạy nhưng cluster đã tắt

Solution:
- Kiểm tra container đã tạo nhưng bị stop chưa (docker compose ps -a):
    NAME            STATUS
    zeebe           Exited
    operate         Exited
    elasticsearch   Exited
    connectors      Exited
    => container đã tạo nhưng đã tắt

- Start lại Camunda cluster => chạy docker compose up -d (-d là để container chạy ngầm)
    NAME            STATUS
    zeebe           Up
    operate         Up
    elasticsearch   Up
    connectors      Up

- Check UI Camunda

### Error & Solutions:
1. Job worker không hoạt động
2. Incident (Sự cố workflow) - Ops
3. Technical Errors (lỗi kỹ thuật) - Dev/ Worker xử lý
4. Lỗi deploy process - Dev
5. Lỗi Variable Mapping
6. Lỗi External Service Intergration - Dev/ Ops xử lý
7. Lỗi Infrastructure
8. Lỗi Partition/ Cluster
9. Lỗi dữ liệu (Data Issues)
10. Business error - BPMN xử lý
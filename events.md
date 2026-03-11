# EVENTS:

## 1. Start Event: process start
## 2. End Event: process end
## 3. Error Boundary Event:
    - 1 Event để bắt lỗi Business Error
    - Business Error sẽ catch error (job.error()/ job.throwError())
    - Lỗi này sẽ do Job Worker bên ngoài xử lý

## 4. Message Boundary Event:
    - Nhận message từ hệ thống bên ngoài khi task đang chạy
    Ex: Task chờ thanh toán => trong lúc chờ nếu nhận message "cancel order" từ hệ thống khác => process sẽ chuyển sang huỷ đơn hàng.

## 5. 
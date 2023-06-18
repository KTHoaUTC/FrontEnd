import { useEffect, useRef, useState } from "react";
import jsQR, { QRCode } from "jsqr";
import { Workbook } from "exceljs";
import { Button, Input } from "antd";
import styles from "./style.module.scss";

const ImageQRScanner = () => {
  const [qrCodeData, setQrCodeData] = useState<any>(null);
  const [printing, setPrinting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const code = jsQR(
              imageData.data,
              imageData.width,
              imageData.height
            );
            if (code) {
              setQrCodeData(JSON.parse(code.data));
            } else {
              setQrCodeData(null);
            }
          }
        };
        img.src = reader.result as string;
      };
    }
  };

  const exportToExcel = async () => {
    if (qrCodeData) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Hóa đơn");
      const row = worksheet.addRow(Object.values(qrCodeData));
      row.commit();

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "hoa-don.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    }
  };
const handlePrint = () => {
  setPrinting(true);
  setTimeout(() => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Ticket Information</title>
            <style>
              @media print {
                body {
                  padding: 1rem;
                }
              }
            </style>
          </head>
          <body>
            <div className=${styles.info_ticket}>
              <h2>Thông tin vé</h2>
              <p><strong>Phim:</strong> ${qrCodeData.title}</p>
              <p><strong>Rạp chiếu:</strong> ${qrCodeData.theater}</p>
              <p><strong>Ngày chiếu:</strong> ${qrCodeData.date}</p>
              <p><strong>Giờ chiếu:</strong> ${qrCodeData.time}</p>
              <p><strong>Phòng:</strong> ${qrCodeData.room}</p>
              <p><strong>Ghế:</strong> ${qrCodeData.seats}</p>
              <p><strong>Tổng giá vé:</strong> ${qrCodeData.totalPrice} VNĐ</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
        setPrinting(false);
      };
    }
  }, 1000);
};

  return (
    <>
      {" "}
      <div style={{ textAlign: "center", margin: "5rem 0" }}>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: "1rem", width: "50%" }}
        />
        {qrCodeData ? (
          <>
            {" "}
            <div className={styles.info_ticket}>
              <h2>Thông tin vé</h2>
              <p>
                <strong>Phim:</strong> {qrCodeData.title}
              </p>
              <p>
                <strong>Rạp chiếu:</strong> {qrCodeData.theater}
              </p>
              <p>
                <strong>Ngày chiếu:</strong> {qrCodeData.date}
              </p>
              <p>
                <strong>Giờ chiếu:</strong> {qrCodeData.time}
              </p>
              <p>
                <strong>Phòng:</strong> {qrCodeData.room}
              </p>
              <p>
                <strong>Ghế:</strong> {qrCodeData.seats}
              </p>
              <p>
                <strong>Tổng giá vé:</strong> {qrCodeData.totalPrice} VNĐ
              </p>
            </div>
            <Button
              className={styles.btn}
              onClick={handlePrint}
              disabled={printing}
            >
              In vé
            </Button>
            <Button className={styles.btn} onClick={exportToExcel}>
              Xuất Excel
            </Button>
          </>
        ) : (
          <p>Không tìm thấy mã QR hợp lệ</p>
        )}
      </div>
    </>
  );
};

export default ImageQRScanner;

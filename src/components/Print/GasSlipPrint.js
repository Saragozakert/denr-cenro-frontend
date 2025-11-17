import React from 'react';
import { createRoot } from 'react-dom/client';
import DENRLogo from "../../assets/images/DENR.png";
import BagongPilipinasLogo from "../../assets/images/bagongpilipinas.png";

const formatDateFullMonth = (dateString) => {
  if (!dateString) return '';
  
  try {
    if (dateString.includes('T')) {
      const date = new Date(dateString);
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    }
    return dateString; 
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

const formatName = (name) => {
  if (!name) return '';
  return name.toUpperCase();
};

const formatPurpose = (purpose) => {
  if (!purpose) return '';
  return purpose.toUpperCase();
};

const calculateLineWidth = (name) => {
  if (!name) return '150px';
  const nameLength = name.length;
  const calculatedWidth = Math.max(150, Math.min(200, nameLength * 8));
  return `${calculatedWidth}px`;
};

const GasSlipPrintContent = ({ slip }) => {
  const fuelType = slip.fuel_type || 'Gasoline';
  const fuelAmount = slip.gasoline_amount || '0';
  
  const withdrawnLineWidth = calculateLineWidth(slip.withdrawn_by);
  const approvedLineWidth = calculateLineWidth(slip.approved_by);
  const issuedLineWidth = calculateLineWidth(slip.issued_by);

  // Helper function to return content or non-breaking space
  const getFieldValue = (value) => {
    return value || '\u00A0'; // \u00A0 is non-breaking space
  };

  const SlipComponent = ({ isAdminCopy = false }) => (
    <div className={`slip ${isAdminCopy ? 'admin-slip' : 'user-slip'}`}>
      <div className="header">
        <div className="republic">Republic of the Philippines</div>
        <div className="denr">Department of Environment and Natural Resources</div>
        <div className="cenro">COMMUNITY ENVIRONMENT AND NATURAL RESOURCES OFFICE</div>
        <div className="address">DENR, R13-D3, Lianga, Surigao del Sur</div>
        
        <div className="logo-container">
          <img src={DENRLogo} alt="DENR Logo" className="logo1" />
          <img src={BagongPilipinasLogo} alt="Bagong Pilipinas Logo" className="logo2" />
        </div>
        
        <div className="title">DAILY GAS ISSUED SLIP</div>
      </div>
      
      <div className="details">
        <div className="detail-row">
          <span className="detail-label">Date:</span>
          <span className="detail-value">{getFieldValue(formatDateFullMonth(slip.date_approved || slip.created_at))}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Type of Vehicle:</span>
          <span className="detail-value">{getFieldValue(slip.model_name)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Plate No.:</span>
          <span className="detail-value">{getFieldValue(slip.plate_no)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Section:</span>
          <span className="detail-value">{getFieldValue(slip.section)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Office:</span>
          <span className="detail-value">{getFieldValue(slip.office)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Purchased No.</span>
          <span className="detail-value">{getFieldValue(slip.purchased_no)}</span>
        </div>
        <div className="purpose-row">
          <span className="purpose-label">Purpose:</span>
          <span className="purpose-container">
            <span className="purpose-value">{getFieldValue(formatPurpose(slip.purpose))}</span>
          </span>
        </div>
      </div>
      
      <table className="fuel-table">
        <thead>
          <tr>
            <th style={{width: '20%'}}>Fuel Type</th>
            <th style={{width: '15%'}}>Unit Price</th>
            <th style={{width: '15%'}}>Quantity</th>
            <th style={{width: '15%'}}>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Diesel</td>
            <td>{'\u00A0'}</td>
            <td>{'\u00A0'}</td>
            <td>{fuelType === 'Diesel' ? fuelAmount + ' ' : '\u00A0'}</td>
          </tr>
          <tr>
            <td>Gasoline</td>
            <td>{'\u00A0'}</td>
            <td>{'\u00A0'}</td>
            <td>{fuelType === 'Gasoline' ? fuelAmount + ' ' : '\u00A0'}</td>
          </tr>
          <tr>
            <td>Others</td>
            <td>{'\u00A0'}</td>
            <td>{'\u00A0'}</td>
            <td>{fuelType === 'Others' ? fuelAmount + ' ' : '\u00A0'}</td>
          </tr>
        </tbody>
      </table>
      
      <div className="signatures">
        <div className="signature-box">
          <div className="signature-name">{formatName(slip.withdrawn_by || '')}</div>
          <div className="signature-line-container">
            <div className="signature-line" style={{width: withdrawnLineWidth}}></div>
            <div className="signature-label">Withdrawn by:</div>
          </div>
        </div>
        <div className="signature-box">
          <div className="signature-name">{formatName(slip.approved_by || '')}</div>
          <div className="signature-line-container">
            <div className="signature-line" style={{width: approvedLineWidth}}></div>
            <div className="signature-label">Approved by:</div>
          </div>
        </div>
        <div className="signature-box">
          <div className="signature-name">{formatName(slip.issued_by || '')}</div>
          <div className="signature-line-container">
            <div className="signature-line" style={{width: issuedLineWidth}}></div>
            <div className="signature-label">Issued by:</div>
          </div>
        </div>
      </div>
      
      {!isAdminCopy && (
        <div className="cut-line"></div>
      )}
    </div>
  );

  return (
    <div className="slip-container">
      <SlipComponent isAdminCopy={false} />
      <SlipComponent isAdminCopy={true} />
    </div>
  );
};

function GasSlipPrint({ slip }) {
  const handlePrint = () => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Daily Gas Issued Slip - ${slip.model_name}</title>
          <style>
              @media print {
                  @page {
                      size: A4 portrait;
                      margin: 0.3in;
                  }
                  body {
                    font-family: Arial, sans-serif;
                    font-size: 13px;
                    line-height: 1.1;
                    margin-top: 15px;
                  }

                  .slip-container {
                    width: 100%;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 50px;
                  }
                  .slip {
                      width: 100%;
                      position: relative;
                      page-break-inside: avoid;
                  }
                  .user-slip {
                      margin-top: 25px;
                  }
                  .admin-slip {
                      margin-top: 85px;
                  }
                  .cut-line {
                      position: absolute;
                      left: 0;
                      right: 0;
                      bottom: -50px;
                      border-bottom: 1px dashed #999;
                      text-align: center;
                  }
                  .cut-line-text {
                      position: relative;
                      top: 6px;
                      background: white;
                      padding: 0 8px;
                      color: #999;
                      font-size: 10px;
                  }
                  .header {
                      text-align: center;
                      margin-top: -30px;
                      padding-bottom: 3px;
                      position: relative;
                  }
                  .republic {
                      font-size: 13px;
                      font-weight: bold;
                      margin-bottom: 1px;
                  }
                  .denr {
                      font-size: 13px;
                      font-weight: bold;
                      color: #0d6a10ff;
                      margin-bottom: 1px;
                  }
                  .cenro {
                      font-size: 12px;
                      font-weight: bold;
                      color: #120a82ff;
                      text-transform: uppercase;
                      margin-bottom: 1px;
                  }
                  .address {
                      font-size: 12px;
                      margin-bottom: 3px;
                  }
                  .title {
                      font-size: 10px;        
                      text-transform: uppercase;
                      margin-top: -5px;
                      font-weight: bold;

                  }
                  .logo-container {
                      display: flex;
                      justify-content: center;
                      align-items: flex-start;
                      gap: 20px;
                      margin: 3px 0;
                      position: relative;
                  }
                  .logo1 {
                      height: 75px;
                      width: auto;
                      object-fit: contain;
                      position: absolute;
                      left: 70px;
                      top: -70px;
                  }
                  .logo2 {
                      height: 110px;
                      width: 110px;
                      object-fit: contain;
                      position: absolute;
                      top: -80px;
                      right: 50px;
                  }
                  .details {
                      width: 100%;
                      margin: 8px 0;
                      margin-top: 40px;
                  }
                  .detail-row {
                    margin: 4px 0;
                    display: flex;
                    align-items: flex-start;
                  }

                  .detail-label {
                    display: inline-block;
                    width: 150px;
                    font-weight: bold;
                    flex-shrink: 0;
                    font-size: 12px;
                  }

                  .detail-value {
                    display: inline-block;
                    border-bottom: 1px solid #000;
                    min-width: 180px;
                    max-width: 180px;
                    padding-bottom: 1px;
                    flex-shrink: 0;
                    font-size: 11px;
                  }

                  .purpose-row {
                    margin: 4px 0;
                    display: flex;
                    align-items: flex-start;
                  }
                    
                  .purpose-label {
                    display: inline-block;
                    width: 150px;
                    font-weight: bold;
                    flex-shrink: 0;
                    font-size: 12px;
                  }
                  .purpose-container {
                    display: inline-block;
                    width: calc(100% - 150px);
                    min-height: 18px;
                  }
                  .purpose-value {
                    display: block;
                    width: 100%;
                    min-height: 18px;
                    word-wrap: break-word;
                    white-space: pre-wrap;
                    line-height: 1.2;
                    text-transform: uppercase;
                    padding-bottom: 1px;
                    font-size: 11px;
                  }
                  .fuel-table {
                      width: 100%;
                      border-collapse: collapse;
                      margin: 10px 0;
                      border: 1px solid #000;
                  }
                  .fuel-table th, .fuel-table td {
                      border: 1px solid #000;
                      padding: 6px;
                      text-align: left;
                  }
                  .fuel-table th {
                      background-color: #f0f0f0;
                      font-weight: bold;
                      font-size: 12px;
                  }
                  .signatures {
                      display: flex;
                      justify-content: space-between;
                      margin-top: 40px;
                      align-items: flex-end;
                  }
                  .signature-box {
                      text-align: center;
                      min-width: 180px;
                      max-width: 200px;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      flex: 1;
                  }
                  .signature-name {
                      font-weight: bold;
                      text-transform: uppercase;
                      margin-bottom: -1px;
                      font-size: 10px;
                      word-wrap: break-word;
                      min-height: 14px;
                      text-align: center;
                      width: 100%;
                  }
                  .signature-line-container {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      width: 100%;
                  }
                  .signature-line {
                      border-top: 1px solid #000;
                      height: 1px;
                      margin-bottom: 4px;
                      margin-left: auto;
                      margin-right: auto;
                  }
                  .signature-label {
                      font-size: 12px;
                      text-align: center;
                      margin-top: -2px;
                  }
                  .copy-label {
                      position: absolute;
                      top: -15px;
                      right: 8px;
                      font-weight: bold;
                      font-size: 11px;
                      background-color: #f0f0f0;
                      padding: 1px 4px;
                      border: 1px solid #ccc;
                  }
                  
                  .signature-box .signature-line-container {
                      align-items: center;
                  }
                  
                  .signature-box:first-child,
                  .signature-box:nth-child(2),
                  .signature-box:last-child {
                      align-items: center;
                  }
              }
              
              /* Remove screen styles to prevent window flash */
              body {
                  visibility: hidden;
              }
              
              @media print {
                  body {
                      visibility: visible;
                  }
              }
          </style>
      </head>
      <body>
          <div id="print-root"></div>
      </body>
      </html>
    `);
    
    iframeDoc.close();

    setTimeout(() => {
      const printRoot = iframeDoc.getElementById('print-root');
      
      if (printRoot) {
        const root = createRoot(printRoot);
        root.render(<GasSlipPrintContent slip={slip} />);
        

        setTimeout(() => {
          const iframeWindow = iframe.contentWindow;
          
          iframeWindow.focus();
          iframeWindow.print();
          
          iframeWindow.onafterprint = () => {
            setTimeout(() => {
              document.body.removeChild(iframe);
            }, 100);
          };
        }, 500);
      }
    }, 100);
  };

  return { handlePrint };
}

export default GasSlipPrint;
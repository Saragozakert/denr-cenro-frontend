import DENRLogo from "../../assets/images/DENR.png";
import BagongPilipinasLogo from "../../assets/images/bagongpilipinas.png";

const formatDateFullMonth = (dateString) => {
  if (!dateString) return 'N/A';
  
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
    return dateString; 
  }
};

// Function to capitalize and make text bold
const formatName = (name) => {
  if (!name) return '';
  return name.toUpperCase();
};

// Function to format purpose text (convert to uppercase)
const formatPurpose = (purpose) => {
  if (!purpose) return 'N/A';
  return purpose.toUpperCase();
};

// Function to calculate consistent width based on name length
const calculateLineWidth = (name) => {
  if (!name) return '150px'; // Consistent default width
  
  const nameLength = name.length;
  // Base width calculation: approximately 8px per character for uppercase text
  const calculatedWidth = Math.max(150, Math.min(200, nameLength * 8));
  return `${calculatedWidth}px`;
};

function GasSlipPrint({ slip }) {
    // Determine which fuel type has amount and display accordingly
    const fuelType = slip.fuel_type || 'Gasoline'; // Default to Gasoline if not specified
    const fuelAmount = slip.gasoline_amount || '0';
    
    // Calculate consistent line widths for each signature
    const withdrawnLineWidth = calculateLineWidth(slip.withdrawn_by);
    const approvedLineWidth = calculateLineWidth(slip.approved_by);
    const issuedLineWidth = calculateLineWidth(slip.issued_by);
    
    const printContent = `
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
                        gap: 15px;
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
                        margin-top: 120px;
                    }
                    .cut-line {
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: -80px;
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
                        margin-bottom: 8px;
                        padding-bottom: 3px;
                        position: relative;
                    }
                    .republic {
                        font-size: 14px;
                        font-weight: bold;
                        margin-bottom: 2px;
                    }
                    .denr {
                        font-size: 13px;
                        font-weight: bold;
                        color: #4CAF50;
                        margin-bottom: 1px;
                    }
                    .cenro {
                        font-size: 12px;
                        font-weight: bold;
                        color: #2196F3;
                        text-transform: uppercase;
                        margin-bottom: 1px;
                    }
                    .address {
                        font-size: 12px;
                        margin-bottom: 3px;
                    }
                    .title {
                        font-size: 12px;        
                        text-transform: uppercase;
                        margin-top: -3px;
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
                        height: 65px;
                        width: auto;
                        object-fit: contain;
                        position: absolute;
                        left: 90px;
                        top: -75px;
                    }
                    .logo2 {
                        height: 90px;
                        width: 90px;
                        object-fit: contain;
                        position: absolute;
                        top: -85px;
                        right: 80px;
                    }
                    .details {
                        width: 100%;
                        margin: 8px 0;
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
                    }
                    .detail-value {
                        display: inline-block;
                        border-bottom: 1px solid #000;
                        min-width: 180px;
                        max-width: 180px;
                        padding-bottom: 1px;
                        flex-shrink: 0;
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
                        margin-bottom: 8px;
                        font-size: 12px;
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
                        font-size: 11px;
                        text-align: center;
                        margin-top: 0;
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
                    
                    /* Center all signature lines and labels */
                    .signature-box .signature-line-container {
                        align-items: center;
                    }
                    
                    /* Ensure consistent width for all signature containers */
                    .signature-box:first-child,
                    .signature-box:nth-child(2),
                    .signature-box:last-child {
                        align-items: center;
                    }
                }
            </style>
        </head>
        <body onload="window.print(); window.onafterprint = function() { window.close(); }">
            <div class="slip-container">
                <!-- First slip (User Copy) -->
                <div class="slip user-slip">
                    <div class="header">
                        <div class="republic">Republic of the Philippines</div>
                        <div class="denr">Department of Environment and Natural Resources</div>
                        <div class="cenro">COMMUNITY ENVIRONMENT AND NATURAL RESOURCES OFFICE</div>
                        <div class="address">DENR, R13-D3, Lianga, Surigao del Sur</div>
                        
                        <div class="logo-container">
                            <img src="${DENRLogo}" alt="DENR Logo" class="logo1">
                            <img src="${BagongPilipinasLogo}" alt="Bagong Pilipinas Logo" class="logo2">
                        </div>
                        
                        <div class="title">DAILY GAS ISSUED SLIP</div>
                    </div>
                    
                    <div class="details">
                        <div class="detail-row">
                            <span class="detail-label">Date:</span>
                            <span class="detail-value">${formatDateFullMonth(slip.date_approved || slip.created_at)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Type of Vehicle:</span>
                            <span class="detail-value">${slip.model_name || 'N/A'}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Plate No.:</span>
                            <span class="detail-value">${slip.plate_no || 'N/A'}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Section:</span>
                            <span class="detail-value">${slip.section || 'N/A'}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Office:</span>
                            <span class="detail-value">${slip.office || 'N/A'}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Purchased No.</span>
                            <span class="detail-value">${slip.purchase_no || 'N/A'}</span>
                        </div>
                        <div class="purpose-row">
                            <span class="purpose-label">Purpose:</span>
                            <span class="purpose-container">
                                <span class="purpose-value">${formatPurpose(slip.purpose)}</span>
                            </span>
                        </div>
                    </div>
                    
                    <table class="fuel-table">
                        <thead>
                            <tr>
                                <th style="width: 40%">Fuel Type</th>
                                <th style="width: 20%">Unit Price</th>
                                <th style="width: 20%">Quantity</th>
                                <th style="width: 20%">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Diesel</td>
                                <td></td>
                                <td></td>
                                <td>${fuelType === 'Diesel' ? fuelAmount + ' ' : ''}</td>
                            </tr>
                            <tr>
                                <td>Gasoline</td>
                                <td></td>
                                <td></td>
                                <td>${fuelType === 'Gasoline' ? fuelAmount + ' ' : ''}</td>
                            </tr>
                            <tr>
                                <td>Others</td>
                                <td></td>
                                <td></td>
                                <td>${fuelType === 'Others' ? fuelAmount + ' ' : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div class="signatures">
                        <div class="signature-box">
                            <div class="signature-name">${formatName(slip.withdrawn_by || '')}</div>
                            <div class="signature-line-container">
                                <div class="signature-line" style="width: ${withdrawnLineWidth}"></div>
                                <div class="signature-label">Withdrawn by:</div>
                            </div>
                        </div>
                        <div class="signature-box">
                            <div class="signature-name">${formatName(slip.approved_by || '')}</div>
                            <div class="signature-line-container">
                                <div class="signature-line" style="width: ${approvedLineWidth}"></div>
                                <div class="signature-label">Approved by:</div>
                            </div>
                        </div>
                        <div class="signature-box">
                            <div class="signature-name">${formatName(slip.issued_by || '')}</div>
                            <div class="signature-line-container">
                                <div class="signature-line" style="width: ${issuedLineWidth}"></div>
                                <div class="signature-label">Issued by:</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cut-line">
                        <span class="cut-line-text">Cut Here</span>
                    </div>
                </div>
                
                <!-- Second slip (Admin Copy) -->
                <div class="slip admin-slip">
                    <div class="header">
                        <div class="republic">Republic of the Philippines</div>
                        <div class="denr">Department of Environment and Natural Resources</div>
                        <div class="cenro">COMMUNITY ENVIRONMENT AND NATURAL RESOURCES OFFICE</div>
                        <div class="address">DENR, R13-D3, Lianga, Surigao del Sur</div>
                        
                        <div class="logo-container">
                            <img src="${DENRLogo}" alt="DENR Logo" class="logo1">
                            <img src="${BagongPilipinasLogo}" alt="Bagong Pilipinas Logo" class="logo2">
                        </div>
                        
                        <div class="title">DAILY GAS ISSUED SLIP</div>
                    </div>
                    
                    <div class="details">
                        <div class="detail-row">
                            <span class="detail-label">Date:</span>
                            <span class="detail-value">${formatDateFullMonth(slip.date_approved || slip.created_at)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Type of Vehicle:</span>
                            <span class="detail-value">${slip.model_name || 'N/A'}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Plate No.:</span>
                            <span class="detail-value">${slip.plate_no || 'N/A'}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Section:</span>
                            <span class="detail-value">${slip.section || 'N/A'}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Office:</span>
                            <span class="detail-value">${slip.office || 'N/A'}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Purchased No.</span>
                            <span class="detail-value">${slip.purchase_no || 'N/A'}</span>
                        </div>
                        <div class="purpose-row">
                            <span class="purpose-label">Purpose:</span>
                            <span class="purpose-container">
                                <span class="purpose-value">${formatPurpose(slip.purpose)}</span>
                            </span>
                        </div>
                    </div>
                    
                    <table class="fuel-table">
                        <thead>
                            <tr>
                                <th style="width: 40%">Fuel Type</th>
                                <th style="width: 20%">Unit Price</th>
                                <th style="width: 20%">Quantity</th>
                                <th style="width: 20%">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Diesel</td>
                                <td></td>
                                <td></td>
                                <td>${fuelType === 'Diesel' ? fuelAmount + ' ' : ''}</td>
                            </tr>
                            <tr>
                                <td>Gasoline</td>
                                <td></td>
                                <td></td>
                                <td>${fuelType === 'Gasoline' ? fuelAmount + ' ' : ''}</td>
                            </tr>
                            <tr>
                                <td>Others</td>
                                <td></td>
                                <td></td>
                                <td>${fuelType === 'Others' ? fuelAmount + ' ' : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div class="signatures">
                        <div class="signature-box">
                            <div class="signature-name">${formatName(slip.withdrawn_by || '')}</div>
                            <div class="signature-line-container">
                                <div class="signature-line" style="width: ${withdrawnLineWidth}"></div>
                                <div class="signature-label">Withdrawn by:</div>
                            </div>
                        </div>
                        <div class="signature-box">
                            <div class="signature-name">${formatName(slip.approved_by || '')}</div>
                            <div class="signature-line-container">
                                <div class="signature-line" style="width: ${approvedLineWidth}"></div>
                                <div class="signature-label">Approved by:</div>
                            </div>
                        </div>
                        <div class="signature-box">
                            <div class="signature-name">${formatName(slip.issued_by || '')}</div>
                            <div class="signature-line-container">
                                <div class="signature-line" style="width: ${issuedLineWidth}"></div>
                                <div class="signature-label">Issued by:</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    const handlePrint = () => {
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write(printContent);
        printWindow.document.close();
    };

    return { handlePrint };
}

export default GasSlipPrint;
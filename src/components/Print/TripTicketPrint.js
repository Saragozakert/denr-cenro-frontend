import { createRoot } from 'react-dom/client';
import DENRLogo from "../../assets/images/DENR.png";
import BagongPilipinasLogo from "../../assets/images/bagongpilipinas.png";


const TripTicketPrintContent = ({ slip }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';

        try {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    };


    const getVehicleDisplay = () => {
        const model = slip.model_name || '';
        const plate = slip.plate_no || '';

        if (model && plate) {
            return `${model}/${plate}`;
        } else if (model) {
            return model;
        } else if (plate) {
            return plate;
        }
        return '';
    };

    return (
        <div className="slip">
            <div className="header">
                <div className="republic-ticket">Department of Environment and Natural Resources</div>
                <div className="denr-ticket">Kagawaran ng Kapaligiran at Likas Yaman Caraga Region</div>
                <div className="cenro-ticket">CENRO Lianga Surigao del Sur</div>
                <div className="address-ticket">DRIVER'S TRIP TICKET</div>
                <div className="ticket-number">No. <span className="underline-field short"></span></div>

                <div className="logo-container">
                    <img src={DENRLogo} alt="DENR Logo" className="logo1" />
                    <img src={BagongPilipinasLogo} alt="Bagong Pilipinas Logo" className="logo2" />
                </div>
            </div>

            <div className="date-section">
                <div className="dash-line">
                    <span className="date-field">{formatDate(slip.date)}</span>
                </div>
                <div className="date-label">Date</div>
            </div>

            <div className="admin-note">
                TO BE FILED BY THE ADMINISTRATIVE OFFICIAL AUTHORIZING THE TRAVEL
            </div>

            <div className="driver-section">
                1. Name of the Driver: <span className="driver-field">{(slip.withdrawn_by || '').toUpperCase()}</span>
            </div>

            <div className="car-plate-section">
                2. Gov't car to be used, Plate No.: <span className="car-field">{getVehicleDisplay().toUpperCase()}</span>
            </div>

            <div className="car-plate-section">
                3. Name of authorized passenger/s: <span className="passenger-field">{(slip.authorized_passengers || '').toUpperCase()}</span>
            </div>

            <div className="car-plate-section">
                4. Place/s to be visited/inspected: <span className="place-field">{(slip.places_to_visit || '').toUpperCase()}</span>
            </div>

            <div className="car-plate-section">
                5. Purpose: <span className="purpose-field">{(slip.purpose || '').toUpperCase()}</span>
            </div>

            <div className="signature-section">
                <div className="requesting-party">
                    REQUESTING PARTY:
                    <div className="requesting-name">{(slip.requesting_party || '').toUpperCase()}</div>
                    <div className="requesting-line"></div>
                    <div className="requesting-position">{(slip.position || '').toUpperCase()}</div>
                </div>
                <div className="approved">
                    <div className="approved-title">APPROVED:</div>
                    <div className="approved-content">
                        <div className="approved-name">{(slip.approved_by || '').toUpperCase()}</div>
                        <div className="approved-line"></div>
                        <div className="approved-position">{(slip.approve_section_position || '').toUpperCase()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};


function TripTicketPrint({ slip }) {
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
                <title>Trip Ticket - ${slip.model_name}</title>
                <style>
                 @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0.3in;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 12px;
                        line-height: 1.2;
                        margin-top: 15px;
                    }
                    .slip {
                        width: 100%;
                        position: relative;
                        page-break-inside: avoid;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 10px;
                        padding-bottom: 3px;
                        position: relative;
                    }
                    .republic-ticket {
                        font-size: 13px;
                        font-weight: bold;
                        margin-bottom: 2px;
                    }
                    .denr-ticket {
                        font-size: 11px;
                        margin-bottom: 1px;
                    }
                  .cenro-ticket {
                      font-size: 10px;
                      text-transform: uppercase;
                      margin-bottom: 1px;
                  }
                  .address-ticket {
                      font-size: 12px;
                      margin-bottom: 1px;
                      font-weight: bold;
                  }
                  .ticket-number {
                      font-size: 11px;
                      font-weight: bold;
                      margin-top: 3px;
                      margin-bottom: 8px;
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
                      height: 60px;
                      width: auto;
                      object-fit: contain;
                      position: absolute;
                      left: 90px;
                      top: -70px;
                  }
                  .logo2 {
                      height: 85px;
                      width: 85px;
                      object-fit: contain;
                      position: absolute;
                      top: -80px;
                      right: 80px;
                  }
                  .date-section {
                      text-align: right;
                      margin-top: 20px;
                      margin-right: 50px;
                  }
                  .dash-line {
                      font-size: 12px;
                      letter-spacing: 1px;
                      margin-bottom: 2px;
                  }
                  .date-field {
                      border-bottom: 1px solid #000;
                      display: inline-block;
                      min-width: 150px;
                      text-align: center;
                      padding: 0 5px;
                  }
                  .date-label {
                      font-size: 11px;
                      font-weight: bold;
                      text-align: center;
                      margin-left: 520px;
                  }
                    .admin-note {
                        text-align: left;
                        margin-top: 0px;
                        margin-left: 50px;
                        font-size: 10px;
                        font-weight: bold;
                        text-transform: uppercase;
                    }
                
                    .driver-section {
                        text-align: left;
                        margin-top: 15px;
                        margin-left: 50px;
                        font-size: 12px;
                    }
                    .driver-field {
                        border-bottom: 1px solid #000;
                        display: inline-block;
                        margin-left: 100px;
                        width: 250px;
                        vertical-align: bottom; 
                        margin-bottom: 2px;  
                        padding: 0 5px;
                    }

                    .car-field {
                        border-bottom: 1px solid #000;
                        display: inline-block;
                        margin-left: 38px;
                        width: 250px;
                        vertical-align: bottom; 
                        margin-bottom: 2px;
                        padding: 0 5px;
                    }

                    .passenger-field {
                        border-bottom: 1px solid #000;
                        display: inline-block;
                        margin-left: 27px;
                        width: 250px;
                        vertical-align: bottom; 
                        margin-bottom: 2px;
                        padding: 0 5px;
                    }

                    .place-field {
                        border-bottom: 1px solid #000;
                        display: inline-block;
                        margin-left: 38px;
                        width: 250px;
                        vertical-align: bottom; 
                        margin-bottom: 2px;
                        padding: 0 5px;
                    }

                    .purpose-field {
                        border-bottom: 1px solid #000;
                        display: inline-block;
                        margin-left: 155px;
                        width: 250px;
                        vertical-align: bottom; 
                        margin-bottom: 2px;
                        padding: 0 5px;
                    }
                        
                    .car-plate-section {
                        text-align: left;
                        margin-top: 15px;
                        margin-left: 50px;
                        font-size: 12px;
                    }

                    .signature-section {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 40px;
                        margin-left: 50px;
                        margin-right: 50px;
                        font-size: 12px;
                        font-weight: bold;
                    }

        
                    .requesting-line {
                        border-bottom: 1px solid #000;
                        width: 200px;
                        margin-top: 35px; 
                        margin-bottom: 5px;
                    }
                    
                    .underline-field {
                        border-bottom: 1px solid #000;
                        display: inline-block;
                        text-align: center;
                    }
                    .underline-field.short {
                        min-width: 80px;
                    }
                    .underline-field.long {
                        min-width: 150px;
                    }
                    .underline-field.extra-long {
                        min-width: 300px;
                    }
                    .underline-field.left-align {
                        text-align: left;
                        margin-left: 0;
                    }
        
                    .requesting-name {
                        font-weight: normal;
                        font-size: 12px;
                        text-align: center;
                        width: 200px;
                        padding: 0 5px;
                        position: absolute;
                        top: 35px; 
                        left: 0;
                    }

                    .requesting-position {
                        font-weight: normal;
                        font-size: 11px;
                        text-align: center;
                        width: 200px;
                        padding: 0 5px;
                        font-style: italic;
                        margin-top: 5px;
                    }

                    .approved-position {
                        font-weight: normal;
                        font-size: 11px;
                        text-align: center;
                        width: 200px;
                        padding: 0 5px;
                        font-style: italic;
                        margin-top: 5px;
                    }

                    .approved-label {
                        font-weight: normal;
                        font-size: 11px;
                        text-align: center;
                        width: 200px;
                        padding: 0 5px;
                        font-style: italic;
                        margin-top: 5px;
                    }

                    .approved-content {
                        position: relative;
                        margin-top: 5px;
                    }
                }
                           
                body {
                    visibility: hidden;
                }
                
                @media print {
                    body {
                        visibility: visible;
                    }
                }

                .signature-section {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 40px;
                    margin-left: 50px;
                    margin-right: 50px;
                    font-size: 12px;
                    font-weight: bold;
                }

                .requesting-party {
                    text-align: left;
                    position: relative;
                    min-height: 95px; /* Increased from 80px to 90px */
                }

                .requesting-name {
                    font-weight: normal;    
                    font-size: 12px;
                    text-align: center;
                    width: 200px;
                    padding: 0 5px;
                    position: absolute;
                    top: 30px; /* Increased from 20px to 30px */
                    left: 0;
                }

                .requesting-line {
                    border-bottom: 1px solid #000;
                    width: 200px;
                    margin-top: 35px; /* Increased from 25px to 35px */
                    margin-bottom: 5px;
                }

                .requesting-position {
                    font-weight: normal;
                    font-size: 11px;
                    text-align: center;
                    width: 200px;
                    padding: 0 5px;
                    font-style: italic;
                    margin-top: 5px;
                }

                .approved {
                    position: relative;
                    min-height: 90px; 
                }

                .approved-title {
                    text-align: right;
                    margin-right: 130px; /* Adjust this value to move only the title */
                }

                .approved-content {
                    position: relative;
                    margin-top: 5px;
                }

                .approved-name {
                    font-weight: normal;
                    font-size: 12px;
                    text-align: center;
                    width: 200px;
                    padding: 0 5px;
                    position: absolute;
                    top: 28px; 
                    right: 0;
                }

                .approved-line {
                    border-bottom: 1px solid #000;
                    width: 200px;
                    margin-top: 31.5px; 
                    margin-bottom: 5px;
                    margin-left: auto;
                }

                .approved-position {
                    font-weight: normal;
                    font-size: 11px;
                    text-align: center;
                    width: 200px;
                    padding: 0 5px;
                    font-style: italic;
                    margin-top: 5px;
                }

                .approved-label {
                    font-weight: normal;
                    font-size: 11px;
                    text-align: center;
                    width: 200px;
                    padding: 0 5px;
                    font-style: italic;
                    margin-top: 5px;
                }
                    </style>
            </head>
            <body>
                <div id="print-root"></div>
            </body>
        </html>
    `);

        iframeDoc.close();

        // Wait for the DOM to be ready
        setTimeout(() => {
            const printRoot = iframeDoc.getElementById('print-root');

            if (printRoot) {
                // Use React DOM to render the component
                const root = createRoot(printRoot);
                root.render(<TripTicketPrintContent slip={slip} />);

                // Wait for React to render then print
                setTimeout(() => {
                    const iframeWindow = iframe.contentWindow;

                    // Focus and print
                    iframeWindow.focus();
                    iframeWindow.print();

                    // Clean up after printing
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

export default TripTicketPrint;
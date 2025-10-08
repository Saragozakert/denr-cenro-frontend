import React from 'react';
import { createRoot } from 'react-dom/client';
import DENRLogo from "../../assets/images/DENR.png";
import BagongPilipinasLogo from "../../assets/images/bagongpilipinas.png";

// React Component for the Print Content
const TripTicketPrintContent = ({ slip }) => {
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
                <div className="dash-line"><span className="underline-field long"></span></div>
                <div className="date-label">Date</div>
            </div>

            <div className="admin-note">
                TO BE FILED BY THE ADMINISTRATIVE OFFICIAL AUTHORIZING THE TRAVEL
            </div>

            <div className="car-plate-section">
                1. Name of the Driver: <span className="underline-field extra-long left-align"></span>
            </div>

            <div className="car-plate-section">
                2. Gov't car to be used, Plate No.: <span className="underline-field extra-long"></span>
            </div>

            <div className="car-plate-section">
                3. Name of authorized passenger/s: <span className="underline-field extra-long"></span>
            </div>

            <div className="car-plate-section">
                4. Place/s to be visited/inspected: <span className="underline-field extra-long"></span>
            </div>

            <div className="car-plate-section">
                5. Purpose: <span className="underline-field extra-long"></span>
            </div>
        </div>
    );
};

// Main component function
function TripTicketPrint({ slip }) {
    const handlePrint = () => {
        // Create a hidden iframe instead of a new window
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

        // Write the basic HTML structure with styles
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
                
                    .car-plate-section {
                        text-align: left;
                        margin-top: 7px;
                        margin-left: 50px;
                        font-size: 12px;
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
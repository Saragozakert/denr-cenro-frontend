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

    const getDriverName = () => {
        return (slip.withdrawn_by || '').toUpperCase();
    };


    const getAuthorizedPassengers = () => {
        return (slip.authorized_passengers || '').toUpperCase();
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
                <div className="date-content-wrapper">
                    <div className="date-field">{formatDate(slip.date)}</div>
                    <div className="date-label">Date</div>
                </div>
            </div>

            <div className="admin-note">
                TO BE FILED BY THE ADMINISTRATIVE OFFICIAL AUTHORIZING THE TRAVEL
            </div>

            <div className="driver-section">
                1. Name of the Driver: <span className="driver-field">{getDriverName()}</span>
            </div>

            <div className="car-plate-section">
                2. Gov't car to be used, Plate No.: <span className="car-field">{getVehicleDisplay().toUpperCase()}</span>
            </div>

            <div className="car-plate-section">
                3. Name of authorized passenger/s: <span className="passenger-field">{getAuthorizedPassengers()}</span>
            </div>

            <div className="car-plate-section">
                4. Place/s to be visited/inspected: <span className="place-field">{(slip.places_to_visit || '').toUpperCase()}</span>
            </div>

            <div className="car-plate-section purpose-section">
                5. Purpose:
                <div className="purpose-field">{(slip.purpose || '').toUpperCase()}</div>
            </div>

            <div className="signature-section">
                <div className="requesting-party">
                    <div className="requesting-title">REQUESTING PARTY:</div>
                    <div className="requesting-content">
                        <div className="requesting-name">
                            {(slip.requesting_party || '').toUpperCase()}
                        </div>
                        <div className="requesting-line"></div>
                        <div className="requesting-position">{(slip.position || '').toUpperCase()}</div>
                    </div>
                </div>

                <div className="approved">
                    <div className="approved-title">APPROVED:</div>
                    <div className="approved-content">
                        <div className="approved-name">
                            JOSEPH E. LANGANLANGAN
                        </div>
                        <div className="approved-line"></div>
                        <div className="approved-position">CENR OFFICER</div>
                    </div>
                </div>
            </div>

            <div className="cut-line"></div>
            <div className="driver-section-fields">
                <div className="driver-note">
                    TO BE FILED BY THE DRIVER:
                </div>

                <div className="time-departure">
                    1. Time of Departure from the office/garage:
                    <span className="time-field underline-field long"></span>
                    <span className="am-pm-checkbox">
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">AM</span>
                        </span>
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">PM</span>
                        </span>
                    </span>
                </div>
                <div className="time-arrival">
                    2. Time of arrival at Item No. 4 above:
                    <span className="time-field underline-field long"></span>
                    <span className="am-pm-checkbox">
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">AM</span>
                        </span>
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">PM</span>
                        </span>
                    </span>
                </div>

                <div className="time-departure-item4">
                    3. Time of departure from Item No. 4 above:
                    <span className="time-field underline-field long"></span>
                    <span className="am-pm-checkbox">
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">AM</span>
                        </span>
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">PM</span>
                        </span>
                    </span>
                </div>

                <div className="time-arrival-back">
                    4. Time of arrival back to the office/garage:
                    <span className="time-field underline-field long"></span>
                    <span className="am-pm-checkbox">
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">AM</span>
                        </span>
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">PM</span>
                        </span>
                    </span>
                </div>

                <div className="distance-traveled">
                    5. Approximate distance traveled to & from:
                    <span className="distance-field underline-field long"></span>
                    <span className="distance-unit">
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">KM</span>
                        </span>
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">M</span>
                        </span>
                    </span>
                </div>

                <div className="gasoline-diesel">
                    6. Gasoline/Diesel issued/purchased and used:
                    <span className="fuel-field underline-field long"></span>
                    <span className="fuel-unit">
                        <span className="checkbox">Liters</span>
                    </span>
                </div>

                <div className="balance-tank">
                    7. Balance in Tank:
                </div>

                <div className="issued-office">
                    a. Issued by the office from stock:
                    <span className="issued-field underline-field long"></span>
                    <span className="issued-unit">
                        <span className="checkbox">Liters</span>
                    </span>
                </div>

                <div className="purchased-trip">
                    b. Add: purchased during the trip (to from):
                    <span className="purchased-field underline-field long"></span>
                    <span className="purchased-unit">
                        <span className="checkbox">Liters</span>
                    </span>
                </div>

                <div className="gear-oil">
                    8. Gear oil used:
                    <span className="gear-field underline-field long"></span>
                    <span className="gear-unit">
                        <span className="checkbox">Liters</span>
                    </span>
                </div>

                <div className="lubricating-oils">
                    9. Lubricating oils used:
                    <span className="lubricating-field underline-field long"></span>
                    <span className="lubricating-unit">
                        <span className="checkbox">Liters</span>
                    </span>
                </div>

                <div className="grease">
                    10. Grease issued/purchased:
                    <span className="grease-field underline-field long"></span>
                    <span className="grease-unit">
                        <span className="checkbox">Liters</span>
                    </span>
                </div>

                <div className="odometer-reading">
                    11. Odometer reading, if any:
                </div>

                <div className="odometer-beginning">
                    - At the beginning of the trip:
                    <span className="beginning-field underline-field long"></span>
                    <span className="beginning-unit">
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">KM</span>
                        </span>
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">M</span>
                        </span>
                    </span>
                </div>

                <div className="odometer-end">
                    - At the end of the trip:
                    <span className="end-field underline-field long"></span>
                    <span className="end-unit">
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">KM</span>
                        </span>
                        <span className="checkbox">
                            <span className="checkbox-box">□</span>
                            <span className="checkbox-text">M</span>
                        </span>
                    </span>
                </div>
            </div>

            <div className="remarks-section">
                <div className="remarks-note">
                    REMARKS:
                </div>
                <div className="remarks-line"></div>
                <div className="certification-text">
                    I hereby certify to the correctness of the above stated records of travel.
                </div>

                <div className="driver-signature-container">
                    <div className="driver-signature-name">{getDriverName()}</div>
                    <div className="driver-signature-line"></div>
                    <div className="driver-label">Driver</div>
                </div>

                <div className="certification-text-2">
                    I hereby certify that I used the herein stated government vehicles with Plate No.
                    <span className="plate-field">{getVehicleDisplay().toUpperCase()}</span>
                    on official business as stated above.
                </div>

                <div className="authorized-passengers-section">
                    <div className="authorized-passengers-note">
                        AUTHORIZED PASSENGERS:
                    </div>
                    <div className="authorized-passengers-name">{getAuthorizedPassengers()}</div>
                    <div className="authorized-passengers-line"></div>
                </div>

                <div className="note-section">
                    <div className="note-text">
                        Note: This form should be accomplished in duplicate/quadruplicate, 2 copies to be attached to the disbursement voucher.
                    </div>
                </div>

                <div className="contact-info">
                    <div className="address">DENR CENRO Lianga, Surigao del Sur, Philippines</div>
                    <div class="contact-details">
                        Mobile No. 0907-169-7840 E-Mail:
                        <span class="email-highlight">cenrolianga@denr.gov.ph</span>
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
                    height: 80px;
                    width: auto;
                    object-fit: contain;
                    position: absolute;
                    left: 100px;
                    top: -95px;
                  }

                  .logo2 {
                    height: 120px;
                    width: auto;
                    object-fit: contain;
                    position: absolute;
                    top: -115px;
                    right: 80px;
                  }

                  .date-section {
                    text-align: right;
                    margin-top: -15px;
                    margin-right: 50px;
                  }
            
                  .date-field {
                    font-size: 11px;
                    letter-spacing: 1px;
                    padding: 0 5px 2px 5px;
                    border-bottom: 1px solid #000;
                    display: inline-block;
                    text-align: center;
                    line-height: 1;
                    font-weight: bold;
                }

                  .date-content-wrapper {
                    display: inline-block;
                    text-align: center;
                }

                  .date-label {
                    font-size: 11px;
                    text-align: center;
                    margin-top: 2px;
                    width: 100%;
                }

                    .admin-note {
                    text-align: left;
                    margin-top: 0px;
                    margin-left: 50px;
                    font-size: 10px;
                    font-weight: bold;
                    text-transform: uppercase;
                    }

                    .driver-field,
                    .car-field,
                    .passenger-field,
                    .place-field,
                    .purpose-field {
                        font-size: 10px !important; 
                        font-weight: normal !important; 
                    }

                    .requesting-party,
                    .approved-title,
                    .approved-name,
                    .approved-position,
                    .requesting-name,
                    .requesting-position {
                        font-size: 10px !important; 
                        text-transform: uppercase !important; 
                    }
                
                    .driver-section {
                        text-align: left;
                        margin-top: 5px;
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
                        font-size: 10px !important;
                        font-weight: normal !important;
                    }

                    .car-field {
                        border-bottom: 1px solid #000;
                        display: inline-block;
                        margin-left: 38px;
                        width: 250px;
                        vertical-align: bottom; 
                        margin-bottom: 2px;
                        padding: 0 5px;
                        font-size: 10px !important;
                        font-weight: normal !important;
                    }

                    .cut-line {
                        margin-top: -45px; 
                        border-bottom: 1px solid #000;
                        text-align: left;
                        width: 625px; 
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .driver-section-fields {
                        margin-top: 10px;
                        margin-left: 50px;
                    }

                    .driver-note {
                        text-align: left;
                        margin-bottom: 10px;
                        font-size: 10px;
                        font-weight: bold;
                        text-transform: uppercase;
                    }

                    .time-departure {
                        text-align: left;
                        margin-top: -5px;
                        font-size: 12px;
                        margin-left: 0;
                    }

                    .time-arrival {
                        text-align: left;
                        margin-top: 5px;
                        font-size: 12px;
                        margin-left: 0;
                    }

                    .time-departure-item4 {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: 0;
                    }

                    .time-arrival-back {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: 0;
                    }

                    .distance-traveled {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: 0;
                    }

                    .gasoline-diesel {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: 0;
                    }

                    .balance-tank {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: 0;
                    }

                    .issued-office {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: 14px; 
                    }

                    .purchased-trip {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: 14px; 
                    }

                    .gear-oil {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: 0;
                    }

                    .lubricating-oils {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: 0;
                    }

                    .grease {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: -7px;
                    }

                    .odometer-reading {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: -6px;
                    }

                    .odometer-beginning {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: 14px; 
                    }

                    .odometer-end {
                        text-align: left;
                        margin-top: 3px;
                        font-size: 12px;
                        margin-left: 14px;
                    }

                    .remarks-section {
                        margin-top: 20px;
                        margin-left: 50px;
                    }

                    .remarks-note {
                        text-align: left;
                        margin-bottom: 5px;
                        font-size: 10px;
                        font-weight: bold;
                        text-transform: uppercase;
                    }

                    .remarks-line {
                        border-bottom: 1px solid #000;
                        width: 620px;
                        margin-left: 0;
                    }

                    .certification-text {
                        text-align: left;
                        margin-top: 5px;
                        font-size: 12px;
                        font-style: italic;
                        width: 90%;
                    }

                    .certification-text-2 {
                        text-align: left;
                        margin-top: 30px;
                        font-size: 12px;
                        font-style: italic;
                        width: 92%;
                    }

                    .authorized-passengers-section {
                        margin-top: 20px;
                        position: relative;
                    }

                    .authorized-passengers-note {
                        text-align: left;
                        margin-bottom: 5px;
                        font-size: 10px;
                        font-weight: bold;
                        text-transform: uppercase;
                    }

                    .authorized-passengers-name {
                        font-size: 10px;
                        text-align: left;
                        width: 90%;
                        text-transform: uppercase;
                        position: absolute;
                        top: 40px; 
                        left: 20px;
                        font-weight: bold !important;
                    }

                    .authorized-passengers-line {
                        border-bottom: 1px solid #000;
                        width: 620px;
                        margin-left: 0;
                        margin-top: 40px; 
                    }

                    .note-section {
                        margin-top: 10px;
                        margin-left: 0;
                        text-align: left;
                    }

                    .note-text {
                        font-size: 12px;
                        font-style: italic;
                        font-weight: bold;             
                        margin-top: -5px;       
                    }

                    .contact-info {
                        text-align: center;
                        margin-bottom: 5px;
                    }
                    .address {
                        font-size: 12px;
                        margin-top: 50px;
                    }
                    .contact-details {
                        font-size: 12px;
                        margin-bottom: 50px;
                    }
                        
                    .email-highlight {
                    color: blue;
                    font-style: italic;
                    text-decoration: underline;
                    text-decoration-style: solid;
                    }

                    .plate-field {
                        border-bottom: 1px solid #000;
                        display: inline-block;
                        min-width: 100px;
                        text-align: center;
                        margin: 0 5px;
                        vertical-align: bottom;
                        font-size: 10px;
                    }

                    .driver-signature-container {
                        margin-top: 30px;
                        display: inline-block;
                        text-align: center;
                        width: 100%;
                    }

                    .driver-signature-name {
                        font-size: 10px;
                        font-weight: bold;
                        text-align: center;
                        margin-bottom: 1px;
                        width: 200px;
                        margin-left: 390px;
                        text-transform: uppercase;
                    }

                    .driver-signature-line {
                        border-bottom: 1px solid #000;
                        width: 150px;
                        margin-bottom: 5px;
                        margin-left: 415px; 
                    }

                    .driver-label {
                        text-align: center;
                        font-size: 11px;
                        margin-top: -5px;
                        width: 200px;
                        margin-left: 390px; 
                    }

                    .time-departure .time-field {
                        margin-left: 178px !important; 
                    }

                    .time-arrival .time-field {
                        margin-left: 211px !important; 
                    }

                    .time-departure-item4 .time-field {
                        margin-left: 178px !important; 
                    }

                    .time-arrival-back .time-field {
                        margin-left: 184px !important; 
                    }

                    .distance-traveled .distance-field {
                        margin-left: 182px !important; 
                    }

                    .gasoline-diesel .fuel-field {
                        margin-left: 160px !important; 
                    }

                    .balance-tank .balance-field {
                        margin-left: 210px !important; 
                    }

                    .issued-office .issued-field {
                        margin-left: 218px !important; 
                    }

                    .purchased-trip .purchased-field {
                        margin-left: 172px !important; 
                    }

                    .gear-oil .gear-field {
                        margin-left: 323px !important; 
                    }

                    .lubricating-oils .lubricating-field {
                        margin-left: 285px !important; 
                    }

                    .grease .grease-field {
                        margin-left: 258px !important; 
                    }

                    .odometer-reading .odometer-field {
                        margin-left: 162px !important; 
                    }

                    .odometer-beginning .beginning-field {
                        margin-left: 247px !important; 
                    }

                    .odometer-end .end-field {
                        margin-left: 279px !important; 
                    }

                    .time-field, 
                    .distance-field,
                    .fuel-field, 
                    .balance-field, 
                    .issued-field, 
                    .purchased-field, 
                    .gear-field, 
                    .lubricating-field, 
                    .grease-field, 
                    .odometer-field, 
                    .beginning-field, 
                    .end-field {
                        width: 60px !important; 
                        min-width: 60px !important;
                        margin-left: 80px;
                    }

                    .am-pm-checkbox, .distance-unit, .fuel-unit, .balance-unit, .issued-unit, .purchased-unit, .gear-unit, .lubricating-unit, .grease-unit, .odometer-unit, .beginning-unit, .end-unit {
                        margin-left: -5px;
                    }

                    .checkbox {
                        margin-left: 10px;
                        font-size: 11px; /* Keep the original font size */
                        display: inline-flex;
                        align-items: center;
                        gap: 2px;
                    }

                    .checkbox-box {
                        font-size: 11; /* Make only the box larger */
                        font-family: "Arial Unicode MS", "Segoe UI Symbol";
                        line-height: 1;
                    }

                    .checkbox-text {
                        font-size: 11px; /* Keep text at original size */
                        line-height: 1;
                    }
                      

                    .passenger-field {
                        border-bottom: 1px solid #000;
                        display: inline-block;
                        margin-left: 27px;
                        width: 250px;
                        vertical-align: bottom; 
                        margin-bottom: 2px;
                        padding: 0 5px;
                        font-size: 10px !important;
                        font-weight: normal !important;
                    }

                    .place-field {
                        border-bottom: 1px solid #000;
                        display: inline-block;
                        margin-left: 38px;
                        width: 250px;
                        vertical-align: bottom; 
                        margin-bottom: 2px;
                        padding: 0 5px;
                        font-size: 10px !important;
                        font-weight: normal !important;
                    }

                    .purpose-section {
                        display: flex;
                        align-items: flex-start;
                        margin-top: 15px;
                        margin-left: 50px;
                        font-size: 12px;
                    }

                    .purpose-field {
                        display: block;
                        margin-left: 158px;
                        width: 420px;
                        margin-top: -2px;
                        margin-bottom: 2px;
                        padding: 0 5px;
                        word-wrap: break-word;
                        white-space: normal;
                        line-height: 1.3;
                        font-size: 10px !important;
                        font-weight: normal !important;
                    }
                                            
                    .car-plate-section {
                        text-align: left;
                        margin-top: 5px;
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
                    .underline-field.medium {
                        min-width: 100px;
                    }
                    .underline-field.extra-long {
                        min-width: 300px;
                    }
                    .underline-field.left-align {
                        text-align: left;
                        margin-left: 0;
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
                        margin-top: 40px;
                        
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
                    position: relative;
                    min-height: 90px; 
                }

            .requesting-title {
                text-align: left;
                margin-left: 0;
                margin-top: -25px;
                font-size: 10px !important;
                font-weight: bold !important;
                text-transform: uppercase !important;
            }
                
                .requesting-content {
                    position: relative;
                    margin-top: 5px;
                    margin-top: 40px;
                }
    
                .requesting-name {
                    font-weight: normal;
                    font-size: 10px !important; 
                    text-align: center;
                    width: 200px;   
                    padding: 0 5px;
                    position: absolute;
                    top: -15px;
                    left: 0;
                    font-weight: bold !important;
                    text-transform: uppercase !important;
                }

               .requesting-line {
                    border-bottom: 1px solid #000;
                    width: 160px;
                    margin-top: 2px; 
                    margin-bottom: 5px;
                    margin-left: 25px;
                }

                .approved-line {
                    border-bottom: 1px solid #000;
                    width: 165px;
                    margin-top: 2px; 
                    margin-bottom: 5px;
                    margin-left: 22px;
                }

                .requesting-position {
                    font-weight: normal;
                    font-size: 10px !important; 
                    text-align: center;
                    width: 200px;
                    padding: 0 5px;
                    font-style: italic;
                    margin-top: -2px;
                    text-transform: uppercase !important;
                }

                .approved {
                    position: relative;
                    min-height: 90px; 
                }

                .approved-title {
                    text-align: right;
                    margin-right: 130px; 
                    margin-top: -25px;
                    font-size: 10px !important;
                    font-weight: bold !important;
                    text-transform: uppercase !important;
                }

               

                .approved-name {
                    font-weight: normal;
                    font-size: 10px !important; 
                    text-align: center;
                    width: 200px;   
                    padding: 0 5px;
                    position: absolute;
                    top: -15px;
                    right: 0;
                    font-weight: bold !important;
                    text-transform: uppercase !important;
                }

              

                .approved-position {
                    font-weight: normal;
                    font-size: 10px !important; 
                    text-align: center;
                    width: 200px;
                    padding: 0 5px;
                    font-style: italic;
                    margin-top: -2px;
                    text-transform: uppercase !important;
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

        setTimeout(() => {
            const printRoot = iframeDoc.getElementById('print-root');

            if (printRoot) {
                const root = createRoot(printRoot);
                root.render(<TripTicketPrintContent slip={slip} />);


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

export default TripTicketPrint;
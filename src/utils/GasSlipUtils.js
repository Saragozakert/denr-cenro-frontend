export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
        if (dateString.includes('T')) {
            const date = new Date(dateString);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            return `${month}-${day}-${year}`;
        }
        return dateString; 
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString; 
    }
};

export const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'approved': return 'gas-slip-status-badge approved';
        case 'declined': return 'gas-slip-status-badge declined';
        case 'pending': return 'gas-slip-status-badge pending';
        default: return 'gas-slip-status-badge pending';
    }
};

export const getStatusText = (status) => {
    switch (status) {
        case 'approved': return 'Approved';
        case 'declined': return 'Declined';
        case 'pending': return 'Pending';
        default: return 'Pending';
    }
};
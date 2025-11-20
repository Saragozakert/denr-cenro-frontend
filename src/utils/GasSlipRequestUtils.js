// Data enhancement utilities
export const DataEnhancementUtils = {
  enhanceFuelRecords: (fuelRecords, requestingParties, employees) => {
    return fuelRecords.map(record => {
      let requestingPosition = record.position;
      if (!requestingPosition) {
        const requestingParty = requestingParties.find(
          party => party.full_name === record.requesting_party
        );
        requestingPosition = requestingParty ? requestingParty.position : 'N/A';
      }

      let approveSectionPosition = record.approve_section_position;
      if (!approveSectionPosition || approveSectionPosition === 'N/A') {
        const employee = employees.find(
          emp => emp.name === record.approved_by
        );
        approveSectionPosition = employee ? employee.position : 'N/A';
      }

      return {
        ...record,
        position: requestingPosition,
        approve_section_position: approveSectionPosition
      };
    });
  },

  filterFuelRecords: (enhancedFuelRecords, searchTerm, statusFilter) => {
    return enhancedFuelRecords.filter(record => {
      const matchesSearch =
        record.model_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.plate_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.requesting_party?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.withdrawn_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.office?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.approve_section_position?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  },
};

// Navigation utilities (reuse from AdminDashboardUtils if needed)
export { NavigationUtils } from './AdminDashboardUtils';
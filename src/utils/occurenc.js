export const getNextOccurrence = (currentStartDate, recurrencePattern) => {
    const startDate = new Date(currentStartDate);
    let nextStartDate;
  
    switch (recurrencePattern) {
      case 'daily':
        nextStartDate = new Date(startDate);
        nextStartDate.setDate(nextStartDate.getDate() + 1);
        break;
      case 'weekly':
        nextStartDate = new Date(startDate);
        nextStartDate.setDate(nextStartDate.getDate() + 7);
        break;
      case 'monthly':
        nextStartDate = new Date(startDate);
        nextStartDate.setMonth(nextStartDate.getMonth() + 1);
        break;
      case 'yearly':
        nextStartDate = new Date(startDate);
        nextStartDate.setFullYear(nextStartDate.getFullYear() + 1);
        break;
      case 'custom':
        // Handle custom recurrence pattern if needed
        nextStartDate = new Date(startDate); // Placeholder logic for custom recurrence
        break;
      default:
        nextStartDate = new Date(startDate);
        break;
    }
  
    return nextStartDate;
  };
  
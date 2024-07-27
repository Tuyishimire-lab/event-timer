export const getTimeRemaining = (startDate, endDate, recurrencePattern) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    let started = now >= start;
    let total = 0;
    let nextOccurrence = null;
  
    if (started) {
      if (now < end) {
        total = end - now;
      } else {
        // Move to the next occurrence
        const nextStart = getNextOccurrence(startDate, recurrencePattern);
        nextOccurrence = new Date(nextStart);
        nextOccurrence.setHours(end.getHours(), end.getMinutes(), end.getSeconds());
        total = now >= nextOccurrence ? 0 : nextOccurrence - now;
      }
    } else {
      total = start - now;
    }
  
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);
  
    return { total, days, hours, minutes, seconds, started, nextOccurrence };
  };
  
  const getNextOccurrence = (startDate, recurrencePattern) => {
    const now = new Date();
    let nextStart = new Date(startDate);
  
    if (recurrencePattern === 'daily') {
      if (now >= nextStart) {
        nextStart.setDate(nextStart.getDate() + 1);
      }
    } else if (recurrencePattern === 'weekly') {
      if (now >= nextStart) {
        nextStart.setDate(nextStart.getDate() + 7);
      }
    } else if (recurrencePattern === 'monthly') {
      if (now >= nextStart) {
        nextStart.setMonth(nextStart.getMonth() + 1);
      }
    } else if (recurrencePattern === 'yearly') {
      if (now >= nextStart) {
        nextStart.setFullYear(nextStart.getFullYear() + 1);
      }
    }
  
    return nextStart;
};
  
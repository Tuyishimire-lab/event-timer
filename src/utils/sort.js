
export const sortEventsByEndTime = (events) => {
    return events.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
};
  
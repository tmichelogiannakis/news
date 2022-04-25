const displayDate = (date: Date): string =>
  date
    .toLocaleDateString('en', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    .replace(',', '');

export default displayDate;

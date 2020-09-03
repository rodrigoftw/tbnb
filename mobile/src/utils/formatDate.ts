import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

const formatDate = (dateString: string): string => {
  const parsed = parseISO(dateString);
  return format(parsed, 'MM/dd/yyyy - HH:mm a', {
    locale: enUS,
  });
};

export default formatDate;

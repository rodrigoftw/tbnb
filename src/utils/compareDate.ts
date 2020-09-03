import { isBefore } from 'date-fns';

const compareDate = (createdDate: string, updatedDate: string): boolean => {
  return isBefore(new Date(createdDate), new Date(updatedDate));
};

export default compareDate;

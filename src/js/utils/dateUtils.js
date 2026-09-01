import { format, parseISO } from 'date-fns';
import { id, enUS } from 'date-fns/locale';
import { getLocale } from '../localization/localization.js';

export const formatReadableDate = (isoDateString) => {
  const date = parseISO(isoDateString);
  const activeLocale = getLocale() === 'id' ? id : enUS;
  
  return format(date, 'EEEE, d MMMM yyyy HH:mm', { locale: activeLocale });
};

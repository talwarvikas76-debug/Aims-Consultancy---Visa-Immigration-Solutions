import { COMPANY_DETAILS } from '../data/aimsData';

export interface WhatsAppRoutingInfo {
  isOfficeHours: boolean;
  isOpen: boolean;
  phone: string;
  phoneRaw: string;
  formattedNumber: string;
  deskLabel: string;
  statusBadge: string;
  statusDetail: string;
  currentIstTime: string;
}

/**
 * Accurately parses current date and time in Indian Standard Time (Asia/Kolkata).
 */
export function getISTDate(): {
  day: string;
  hour: number;
  minute: number;
  timeString: string;
  isSunday: boolean;
} {
  const now = new Date();
  
  // Format into components in Asia/Kolkata time zone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  let day = 'Mon';
  let hour = 10;
  let minute = 0;

  for (const part of parts) {
    if (part.type === 'weekday') day = part.value;
    if (part.type === 'hour') hour = parseInt(part.value, 10);
    if (part.type === 'minute') minute = parseInt(part.value, 10);
  }

  // 12-hour formatted representation for user display
  const time12Formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const timeString = time12Formatter.format(now);

  return {
    day,
    hour,
    minute,
    timeString,
    isSunday: day === 'Sun',
  };
}

/**
 * Checks if current IST time falls within office working hours:
 * Mon - Sat: 9:00 AM (09:00) to 6:00 PM (18:00) IST.
 * Sundays and outside 9AM-6PM are closed.
 */
export function isOfficeWorkingHours(): boolean {
  const { isSunday, hour, minute } = getISTDate();
  if (isSunday) return false;

  const currentMinutes = hour * 60 + minute;
  const startMinutes = 9 * 60;  // 9:00 AM
  const endMinutes = 18 * 60;   // 6:00 PM (18:00)

  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
}

/**
 * Returns active routing parameters based on current working hours or close time.
 */
export function getWhatsAppRoutingDetails(): WhatsAppRoutingInfo {
  const isOpen = isOfficeWorkingHours();
  const { timeString, day } = getISTDate();

  if (isOpen) {
    return {
      isOfficeHours: true,
      isOpen: true,
      phone: COMPANY_DETAILS.phone,
      phoneRaw: COMPANY_DETAILS.phoneRaw, // '919193319128'
      formattedNumber: '91933-19128',
      deskLabel: 'Primary Office Desk',
      statusBadge: 'Office Hours Active',
      statusDetail: `Mon-Sat 9AM-6PM IST • Connecting to 91933-19128`,
      currentIstTime: `${day}, ${timeString} IST`,
    };
  } else {
    return {
      isOfficeHours: false,
      isOpen: false,
      phone: COMPANY_DETAILS.afterHoursPhone,
      phoneRaw: COMPANY_DETAILS.afterHoursPhoneRaw, // '919592747000'
      formattedNumber: '95927-47000',
      deskLabel: 'After-Hours Support Desk',
      statusBadge: 'After-Hours Desk Active',
      statusDetail: `Office Closed • Connecting to 95927-47000`,
      currentIstTime: `${day}, ${timeString} IST`,
    };
  }
}

/**
 * Builds a direct wa.me link ensuring message delivery to the active WhatsApp number.
 */
export function getWhatsAppDeliveryUrl(
  message: string,
  forceRecipient?: 'office' | 'afterhours'
): string {
  let targetRaw = COMPANY_DETAILS.phoneRaw; // default 919193319128

  if (forceRecipient === 'office') {
    targetRaw = COMPANY_DETAILS.phoneRaw;
  } else if (forceRecipient === 'afterhours') {
    targetRaw = COMPANY_DETAILS.afterHoursPhoneRaw;
  } else {
    const routing = getWhatsAppRoutingDetails();
    targetRaw = routing.phoneRaw;
  }

  return `https://wa.me/${targetRaw}?text=${encodeURIComponent(message)}`;
}

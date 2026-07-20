export function normalize(value?: string) {
  return value?.toString().trim().toLowerCase() || "";
}

export function parseDate(value?: string) {
  if (!value) return null;

  const trimmed = value.toString().trim();
  const isoMatch = trimmed.match(/^\d{4}-\d{2}-\d{2}$/);
  const monthMap: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };

  let day: number;
  let month: number;
  let year: number;

  if (isoMatch) {
    const [y, m, d] = trimmed.split("-");
    year = Number(y);
    month = Number(m) - 1;
    day = Number(d);
  } else {
    const parts = trimmed
      .replace(/,/g, "")
      .split(/[-\s/]+/)
      .filter(Boolean);

    if (parts.length !== 3) return null;

    const [first, second, third] = parts;
    const firstLower = first.toLowerCase();
    const secondLower = second.toLowerCase();

    if (monthMap[secondLower] !== undefined) {
      day = Number(first);
      month = monthMap[secondLower];
      year = Number(third);
    } else if (monthMap[firstLower] !== undefined) {
      month = monthMap[firstLower];
      day = Number(second);
      year = Number(third);
    } else {
      const firstNum = Number(first);
      const secondNum = Number(second);
      const thirdNum = Number(third);
      const twoDigitYear = third.length === 2;

      day = firstNum;
      month = secondNum - 1;
      year = twoDigitYear
        ? thirdNum <= new Date().getFullYear() % 100
          ? 2000 + thirdNum
          : 1900 + thirdNum
        : thirdNum;

      if (firstNum <= 12 && secondNum > 12 && !twoDigitYear) {
        month = firstNum - 1;
        day = secondNum;
        year = thirdNum;
      }
    }
  }

  if (
    Number.isFinite(day) &&
    Number.isFinite(month) &&
    Number.isFinite(year) &&
    year > 0 &&
    month >= 0 &&
    month <= 11 &&
    day >= 1 &&
    day <= 31
  ) {
    return new Date(year, month, day);
  }

  return null;
}

export function formatDateToDDMMYY(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

export function formatDateToDDMMYYYY(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}

export function coursePrefix(courseName: string) {
  const cleaned = courseName.replace(/[^a-zA-Z]/g, "").toUpperCase();
  return cleaned.slice(0, 3) || "CRT";
}

export async function generateNextSerialNumber(
  getSerials: () => Promise<{ serialNumber: string }[]>
) {
  const serials = await getSerials();
  let max = 1000;

  for (const item of serials) {
    const numeric = parseInt(item.serialNumber, 10);
    if (Number.isFinite(numeric) && numeric > max) {
      max = numeric;
    }
  }

  return String(max + 1);
}

export function buildRollNumber(courseName: string, serialNumber: string) {
  return `${coursePrefix(courseName)}-${serialNumber}`;
}

export function buildVerificationCode(serialNumber: string) {
  const suffix = String(Date.now()).slice(-3);
  return `VER${serialNumber}${suffix}`;
}

export function certificateToVerifyResponse(cert: {
  serialNumber: string;
  rollNumber: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: string;
  courseName: string;
  courseDuration: string;
  session: string;
  grade: string;
  issueDate: Date;
  verificationCode: string;
  certificateUrl?: string | null;
}) {
  return {
    serialNumber: cert.serialNumber,
    rollNumber: cert.rollNumber,
    studentName: cert.studentName,
    fatherName: cert.fatherName,
    motherName: cert.motherName,
    dateOfBirth: cert.dateOfBirth,
    gender: cert.gender,
    courseName: cert.courseName,
    courseDuration: cert.courseDuration,
    session: cert.session,
    grade: cert.grade,
    issueDate: formatDateToDDMMYY(cert.issueDate),
    verificationCode: cert.verificationCode,
    certificateUrl: cert.certificateUrl || undefined,
  };
}

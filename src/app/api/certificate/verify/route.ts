import { NextResponse } from 'next/server'

// Sample certificate data
const certificates = [
  {
    id: '2',
    serialNumber: '1442',
    rollNumber: 'DCA-1442',
    studentName: 'PRIYA PATEL',
    fatherName: 'RAMESH PATEL',
    motherName: 'SUNITA PATEL',
    dateOfBirth: '15/07/04',
    gender: 'Female',
    courseName: 'DFA',
    courseDuration: '6 Months',
    session: 'July-December (2025)',
    grade: 'A',
    issueDate: '05/01/26',
    verificationCode: 'VER1442002',
    isValid: true
  },
  {
    id: '3',
    serialNumber: '1443',
    rollNumber: 'CCC-1443',
    studentName: 'AMIT KUMAR',
    fatherName: 'SURESH KUMAR',
    motherName: 'REKHA KUMAR',
    dateOfBirth: '20/01/05',
    gender: 'Male',
    courseName: 'CCC',
    courseDuration: '6 Months',
    session: 'July-December (2025)',
    grade: 'A+',
    issueDate: '05/01/26',
    verificationCode: 'VER1443003',
    isValid: true
  },
  {
    id: '4',
    serialNumber: '1444',
    rollNumber: 'DCA-1444',
    studentName: 'RAVI SINGH',
    fatherName: 'ARUN SINGH',
    motherName: 'MEENA SINGH',
    dateOfBirth: '12/06/2004',
    gender: 'Male',
    courseName: 'DCA',
    courseDuration: '6 Months',
    session: 'July-December (2025)',
    grade: 'A',
    issueDate: '05/01/26',
    verificationCode: 'VER1444004',
    isValid: true
  }
]

interface CertificateVerifyRequest {
  serialNumber?: string
  rollNumber?: string
  studentName?: string
  fatherName?: string
  verificationCode?: string
  dateOfBirth?: string
}

function normalize(value?: string) {
  return value?.toString().trim().toLowerCase() || ''
}

function parseDate(value?: string) {
  if (!value) return null

  const trimmed = value.toString().trim()
  const isoMatch = trimmed.match(/^\d{4}-\d{2}-\d{2}$/)
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
  }

  let day: number
  let month: number
  let year: number

  if (isoMatch) {
    const [y, m, d] = trimmed.split('-')
    year = Number(y)
    month = Number(m) - 1
    day = Number(d)
  } else {
    const parts = trimmed
      .replace(/,/g, '')
      .split(/[-\s/]+/)
      .filter(Boolean)

    if (parts.length !== 3) return null

    const [first, second, third] = parts
    const firstLower = first.toLowerCase()
    const secondLower = second.toLowerCase()

    if (monthMap[secondLower] !== undefined) {
      // day month year
      day = Number(first)
      month = monthMap[secondLower]
      year = Number(third)
    } else if (monthMap[firstLower] !== undefined) {
      // month day year
      month = monthMap[firstLower]
      day = Number(second)
      year = Number(third)
    } else {
      const firstNum = Number(first)
      const secondNum = Number(second)
      const thirdNum = Number(third)
      const twoDigitYear = third.length === 2

      // Default numeric parsing to day/month/year (DD/MM/YY or DD/MM/YYYY)
      day = firstNum
      month = secondNum - 1
      year = twoDigitYear
        ? thirdNum <= new Date().getFullYear() % 100
          ? 2000 + thirdNum
          : 1900 + thirdNum
        : thirdNum

      // If the numeric values are more consistent with MM/DD/YYYY, allow that too
      if (firstNum <= 12 && secondNum > 12 && !twoDigitYear) {
        month = firstNum - 1
        day = secondNum
        year = thirdNum
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
    return new Date(year, month, day)
  }

  return null
}

export async function POST(request: Request) {
  try {
    const {
      serialNumber,
      rollNumber,
      studentName,
      fatherName,
      verificationCode,
      dateOfBirth,
    } = (await request.json()) as CertificateVerifyRequest

    const normalizedStudentName = normalize(studentName)
    const normalizedFatherName = normalize(fatherName)
    const normalizedSearch = normalize(
      serialNumber || rollNumber || studentName || fatherName || verificationCode
    )
    const normalizedDob = normalize(dateOfBirth)

    const certificate = certificates.find(cert => {
      const serialMatch = normalize(cert.serialNumber) === normalizedSearch
      const rollMatch = normalize(cert.rollNumber) === normalizedSearch
      const studentMatch = normalizedStudentName && normalize(cert.studentName) === normalizedStudentName
      const fatherMatch = normalizedFatherName && normalize(cert.fatherName) === normalizedFatherName
      const codeMatch = normalize(cert.verificationCode) === normalizedSearch
      const partialRollMatch = normalizedSearch && normalize(cert.rollNumber).endsWith(normalizedSearch)
      return serialMatch || rollMatch || studentMatch || fatherMatch || codeMatch || partialRollMatch
    })

    if (!certificate) {
      return NextResponse.json({
        found: false,
        message: 'Certificate not found. Please check your details and try again.'
      })
    }

    if (!dateOfBirth) {
      return NextResponse.json({
        found: true,
        valid: false,
        message: 'Date of birth is required for verification.'
      })
    }

    const inputDob = parseDate(dateOfBirth)
    const certificateDob = parseDate(certificate.dateOfBirth)

    if (!inputDob || !certificateDob || inputDob.getTime() !== certificateDob.getTime()) {
      return NextResponse.json({
        found: true,
        valid: false,
        message: 'Date of birth does not match the certificate.'
      })
    }

    if (!certificate.isValid) {
      return NextResponse.json({
        found: true,
        valid: false,
        message: 'This certificate has been invalidated.'
      })
    }

    return NextResponse.json({
      found: true,
      valid: true,
      certificate: {
        serialNumber: certificate.serialNumber,
        rollNumber: certificate.rollNumber,
        studentName: certificate.studentName,
        fatherName: certificate.fatherName,
        motherName: certificate.motherName,
        dateOfBirth: certificate.dateOfBirth,
        gender: certificate.gender,
        courseName: certificate.courseName,
        courseDuration: certificate.courseDuration,
        session: certificate.session,
        grade: certificate.grade,
        issueDate: certificate.issueDate,
        verificationCode: certificate.verificationCode
      }
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify certificate' },
      { status: 500 }
    )
  }
}
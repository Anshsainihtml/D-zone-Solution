import { NextResponse } from 'next/server'

// Sample certificate data
const certificates = [
  {
    id: '1',
    serialNumber: 'NICE2024001',
    rollNumber: 'STU001',
    studentName: 'Rahul Sharma',
    courseName: 'Diploma in Financial Accounting (DFA)',
    completionDate: '2024-03-15',
    verificationCode: 'VER123456',
    isValid: true
  },
  {
    id: '2',
    serialNumber: 'NICE2024002',
    rollNumber: 'STU002',
    studentName: 'Priya Patel',
    courseName: 'Diploma in Computer Applications (DCA)',
    completionDate: '2024-02-28',
    verificationCode: 'VER234567',
    isValid: true
  },
  {
    id: '3',
    serialNumber: 'NICE2024003',
    rollNumber: 'STU003',
    studentName: 'Amit Kumar',
    courseName: 'Course on Computer Concepts (CCC)',
    completionDate: '2024-01-20',
    verificationCode: 'VER345678',
    isValid: true
  }
]

interface CertificateVerifyRequest {
  serialNumber?: string
  rollNumber?: string
  verificationCode?: string
}

export async function POST(request: Request) {
  try {
    const {
      serialNumber,
      rollNumber,
      verificationCode,
    } = (await request.json()) as CertificateVerifyRequest

    // Find certificate by any of the search criteria
    const certificate = certificates.find(cert =>
      cert.serialNumber === serialNumber ||
      cert.rollNumber === rollNumber ||
      cert.verificationCode === verificationCode
    )

    if (!certificate) {
      return NextResponse.json({
        found: false,
        message: 'Certificate not found. Please check your details and try again.'
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
        courseName: certificate.courseName,
        completionDate: certificate.completionDate,
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
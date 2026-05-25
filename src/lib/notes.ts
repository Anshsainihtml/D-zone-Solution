export type NoteItem = {
  id: number
  title: string
  topics: string
  description: string
  comingSoon: boolean
}

export const notes: NoteItem[] = [
  {
    id: 1,
    title: "DFA – Financial Accounting Notes",
    topics: "12 Topics",
    description:
      "Complete notes covering Tally Prime, GST, TDS, accounting fundamentals, voucher entries, and financial reporting",
    comingSoon: true,
  },
  {
    id: 2,
    title: "DCA – Computer Applications Notes",
    topics: "9 Topics",
    description:
      "Comprehensive guide to MS Office, Windows OS, Internet basics, Email, typing, and essential computer skills",
    comingSoon: true,
  },
  {
    id: 3,
    title: "ADCA – Advanced Computer Applications",
    topics: "14 Topics",
    description:
      "Advanced MS Office, Excel automation, Tally basics, CorelDraw, Photoshop, and professional DTP fundamentals",
    comingSoon: true,
  },
  {
    id: 4,
    title: "CCC – Computer Concepts Notes",
    topics: "11 Topics",
    description:
      "Complete CCC syllabus notes including LibreOffice, Internet tools, cyber security, and digital financial tools",
    comingSoon: true,
  },
  {
    id: 5,
    title: "O Level – NIELIT Certification Notes",
    topics: "8 Topics",
    description:
      "IT tools, HTML/CSS web development, Python programming, database basics, and complete O Level study material",
    comingSoon: true,
  },
  {
    id: 6,
    title: "Tally Prime with GST Notes",
    topics: "8 Topics",
    description:
      "Accounting fundamentals, GST configuration, inventory management, payroll, bank reconciliation, and P/L reports",
    comingSoon: true,
  },
]

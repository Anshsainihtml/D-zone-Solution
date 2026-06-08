export const certificateFormFields = (values?: Record<string, unknown>) => [
  {
    name: "studentName",
    label: "Student Full Name",
    type: "text" as const,
    required: true,
    placeholder: "Enter student full name",
    value: values?.studentName || "",
  },
  {
    name: "fatherName",
    label: "Father's Name",
    type: "text" as const,
    required: true,
    placeholder: "Enter father's name",
    value: values?.fatherName || "",
  },
  {
    name: "motherName",
    label: "Mother's Name",
    type: "text" as const,
    placeholder: "Enter mother's name",
    value: values?.motherName || "",
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth (DD/MM/YY)",
    type: "text" as const,
    required: true,
    placeholder: "e.g. 15/07/04",
    value: values?.dateOfBirth || "",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select" as const,
    required: true,
    value: values?.gender || "",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    name: "courseName",
    label: "Course Name",
    type: "select" as const,
    required: true,
    value: values?.courseName || "",
    options: [
      { label: "DCA", value: "DCA" },
      { label: "DFA", value: "DFA" },
      { label: "CCC", value: "CCC" },
      { label: "ADCA", value: "ADCA" },
      { label: "Tally", value: "Tally" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    name: "courseDuration",
    label: "Course Duration",
    type: "text" as const,
    required: true,
    placeholder: "e.g. 6 Months",
    value: values?.courseDuration || "6 Months",
  },
  {
    name: "session",
    label: "Session",
    type: "text" as const,
    required: true,
    placeholder: "e.g. July-December (2025)",
    value: values?.session || "",
  },
  {
    name: "grade",
    label: "Grade",
    type: "select" as const,
    required: true,
    value: values?.grade || "",
    options: [
      { label: "A+", value: "A+" },
      { label: "A", value: "A" },
      { label: "B+", value: "B+" },
      { label: "B", value: "B" },
      { label: "C", value: "C" },
    ],
  },
  {
    name: "completionDate",
    label: "Completion Date",
    type: "date" as const,
    required: true,
    value: values?.completionDate || "",
  },
  {
    name: "issueDate",
    label: "Issue Date",
    type: "date" as const,
    required: true,
    value: values?.issueDate || "",
  },
  {
    name: "serialNumber",
    label: "Serial Number (auto if empty)",
    type: "text" as const,
    placeholder: "Leave empty to auto-generate",
    value: values?.serialNumber || "",
  },
  {
    name: "rollNumber",
    label: "Roll Number (auto if empty)",
    type: "text" as const,
    placeholder: "Leave empty to auto-generate",
    value: values?.rollNumber || "",
  },
  {
    name: "verificationCode",
    label: "Verification Code (auto if empty)",
    type: "text" as const,
    placeholder: "Leave empty to auto-generate",
    value: values?.verificationCode || "",
  },
  {
    name: "isValid",
    label: "Certificate Valid",
    type: "checkbox" as const,
    value: values?.isValid !== false,
  },
];

export function toDateInputValue(value?: string | Date | null) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
}

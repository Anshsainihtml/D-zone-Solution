  "use client";

  import { useState, useRef, type FormEvent } from "react";

  type Certificate = {
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
    issueDate: string;
    certificateUrl?: string;
  };

  type CertificateResult =
    | {
        found: false;
        message: string;
      }
    | {
        found: true;
        valid: false;
        message: string;
      }
    | {
        found: true;
        valid: true;
        certificate: Certificate;
      };

  export default function CertificatePage() {
    const [searchType, setSearchType] = useState<"serial" | "roll" | "name">("serial");

    const [searchValue, setSearchValue] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [selectedDob, setSelectedDob] = useState("");
    const [dob, setDob] = useState("");
    const [searching, setSearching] = useState(false);
    const dateInputRef = useRef<HTMLInputElement | null>(null);

    const [result, setResult] = useState<CertificateResult | null>(null);

    const formatDateToDDMMYY = (isoDate: string) => {
      if (!isoDate) return "";
      const [year, month, day] = isoDate.split("-");
      if (!day || !month || !year) return "";
      return `${day}/${month}/${year.slice(-2)}`;
    };

    const openDatePicker = () => {
      if (!dateInputRef.current) return;
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      }
      dateInputRef.current.focus();
    };

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setSearching(true);
      setResult(null);

      try {
        const bodyPayload: Record<string, string> = {
          dateOfBirth: dob,
        };

        if (searchType === "serial") {
          bodyPayload.serialNumber = searchValue.trim();
        } else if (searchType === "roll") {
          bodyPayload.rollNumber = searchValue.trim();
        } else {
          bodyPayload.studentName = searchValue.trim();
          bodyPayload.fatherName = fatherName.trim();
        }

        const response = await fetch("/api/certificate/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyPayload),
        });

        let data: CertificateResult | null = null;
        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          data = (await response.json()) as CertificateResult;
        } else {
          data = {
            found: false,
            message: "Unexpected server response format.",
          };
        }

        setResult(data);
      } catch (error) {
        setResult({
          found: false,
          message:
            "An error occurred while verifying the certificate.",
        });
      } finally {
        setSearching(false);
      }
    };

    return (
      <main className="min-h-screen bg-[#f5f5f5]">

        {/* Page */}
        <section className="px-4 py-14">

          <div className="mx-auto max-w-7xl">

            {/* Top Heading */}
            <div className="text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-sm">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h2 className="mt-8 text-5xl font-bold tracking-tight text-black">
                Certificate Verification
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-500">
                Verify your Nice Academy certificate by entering your serial number,
                roll number, or student/father name.
              </p>
            </div>

            {/* Search Card */}
            <div className="mx-auto mt-16 max-w-5xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">

              <form onSubmit={handleSearch}>

                {/* Search By */}
                <div>

                  <label className="mb-4 block text-lg font-semibold text-black">
                    Search By
                  </label>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {/* Serial */}
                    <button
                      type="button"
                      onClick={() => setSearchType("serial")}
                      className={`flex items-center justify-center gap-3 rounded-2xl border px-6 py-4 text-sm font-semibold transition ${
                        searchType === "serial"
                          ? "border-black bg-black text-white"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      📄 Serial Number
                    </button>

                    {/* Roll */}
                    <button
                      type="button"
                      onClick={() => setSearchType("roll")}
                      className={`flex items-center justify-center gap-3 rounded-2xl border px-6 py-4 text-sm font-semibold transition ${
                        searchType === "roll"
                          ? "border-black bg-black text-white"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      # Roll Number
                    </button>

                    {/* Name */}
                    <button
                      type="button"
                      onClick={() => setSearchType("name")}
                      className={`flex items-center justify-center gap-3 rounded-2xl border px-6 py-4 text-sm font-semibold transition ${
                        searchType === "name"
                          ? "border-black bg-black text-white"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      👤 Name
                    </button>
                  </div>
                </div>

                {/* Input */}
                {searchType === "name" ? (
                  <>
                    <div className="mt-8">
                      <label className="mb-3 block font-semibold text-black">
                        Full Name
                      </label>

                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Enter your full name"
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-black outline-none transition focus:border-black"
                        required
                      />
                    </div>

                    <div className="mt-6">
                      <label className="mb-3 block font-semibold text-black">
                        Father&apos;s Name
                      </label>

                      <input
                        type="text"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        placeholder="Enter father&apos;s name"
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-black outline-none transition focus:border-black"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <div className="mt-8">
                    <label className="mb-3 block font-semibold text-black">
                      {searchType === "serial" ? "Serial Number" : "Roll Number"}
                    </label>

                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder={
                        searchType === "serial"
                          ? "Enter Serial Number"
                          : "Enter Roll Number"
                      }
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-black outline-none transition focus:border-black"
                      required
                    />
                  </div>
                )}

                {/* DOB */}
                <div className="mt-6">

                  <label className="mb-3 block font-semibold text-black">
                    Date of Birth
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={dob}
                      readOnly
                      placeholder="DD/MM/YY"
                      onClick={openDatePicker}
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-black outline-none focus:border-black cursor-pointer"
                    />
                    <input
                      type="date"
                      ref={dateInputRef}
                      value={selectedDob}
                      onChange={(e) => {
                        setSelectedDob(e.target.value);
                        setDob(formatDateToDDMMYY(e.target.value));
                      }}
                      className="absolute inset-0 h-full w-full opacity-0 pointer-events-none"
                      required
                    />
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Use the date picker to select your birth date in DD/MM/YY format
                  </p>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={searching}
                  className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-black text-lg font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                >
                  {searching ? "Searching..." : "🔍 Search Certificate"}
                </button>
              </form>
            </div>

            {/* Result */}
            {result && (

              <div className="mt-20">

                {/* Heading */}
                <div className="text-center">

                  <h2 className="text-4xl font-bold text-black">
                    {result.found && result.valid
                      ? "Certificate Found"
                      : result.found && !result.valid
                      ? "Certificate Invalid"
                      : "Certificate Not Found"}
                  </h2>

                  <p className="mt-3 text-lg text-slate-500">
                    {result.found && result.valid
                      ? "Your certificate details are displayed below"
                      : "Please verify the details and try again."}
                  </p>
                </div>

                {/* Not Found */}
                {!result.found && (
                  <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
                    {result.message}
                  </div>
                )}

                {/* Invalid */}
                {result.found && !result.valid && (
                  <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-yellow-200 bg-yellow-50 p-6 text-center text-yellow-700">
                    {result.message}
                  </div>
                )}

                {/* Found */}
                {result.found &&
                  result.valid &&
                  result.certificate && (

                  <div className="mx-auto mt-12 w-full max-w-7xl overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">

                    {/* Header */}
                    <div className="flex items-center justify-center gap-4 border-b border-slate-200 bg-slate-50 px-6 py-7">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>

                      <h3 className="text-3xl font-bold text-black">
                        Certificate Details
                      </h3>
                    </div>

                    {/* Table */}
                    <div className="p-4 sm:p-8">

                      <div className="overflow-hidden rounded-2xl border border-slate-200">

                        {[
                          [
                            "Serial Number",
                            result.certificate.serialNumber,
                          ],
                          [
                            "Candidate's Name",
                            result.certificate.studentName,
                          ],
                          [
                            "Father's Name",
                            result.certificate.fatherName,
                          ],
                          [
                            "Mother's Name",
                            result.certificate.motherName,
                          ],
                          [
                            "Date of Birth",
                            result.certificate.dateOfBirth,
                          ],
                          [
                            "Gender",
                            result.certificate.gender,
                          ],
                          [
                            "Roll Number",
                            result.certificate.rollNumber,
                          ],
                          [
                            "Course Name",
                            result.certificate.courseName,
                          ],
                          [
                            "Course Duration",
                            result.certificate.courseDuration,
                          ],
                          [
                            "Session",
                            result.certificate.session,
                          ],
                          [
                            "Grade",
                            result.certificate.grade,
                          ],
                          [
                            "Date of Issue",
                            result.certificate.issueDate,
                          ],
                        ].map(([label, value], index) => (

                          <div
                            key={index}
                            className="grid grid-cols-[45%_55%] border-b border-slate-200 last:border-b-0"
                          >

                            {/* Left */}
                            <div className="bg-white px-6 py-5 text-sm font-medium text-slate-500 sm:text-base">
                              {label}
                            </div>

                            {/* Right */}
                            <div className="border-l border-slate-200 bg-white px-6 py-5 text-sm font-semibold text-black sm:text-base">
                              {value}
                            </div>
                          </div>
                        ))}

                        {/* Verified */}
                        <div className="grid grid-cols-[45%_55%]">

                          <div className="px-6 py-5 text-sm font-medium text-slate-500 sm:text-base">
                            Verified
                          </div>

                          <div className="flex items-center gap-2 border-l border-slate-200 px-6 py-5 font-semibold text-emerald-600">

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>

                            Verified
                          </div>
                        </div>
                      </div>

                      {/* Download */}
                      {result.certificate.certificateUrl ? (
                        <a
                          href={result.certificate.certificateUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 4v12m0 0l-4-4m4 4l4-4"
                            />
                          </svg>

                          Download Certificate
                        </a>
                      ) : (
                        <div className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-300 px-6 py-4 text-lg font-semibold text-slate-600 cursor-not-allowed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 4v12m0 0l-4-4m4 4l4-4"
                            />
                          </svg>

                          Certificate File Not Available
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

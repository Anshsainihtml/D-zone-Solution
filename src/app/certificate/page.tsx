"use client";

import { useState, type FormEvent } from "react";

type Certificate = {
  serialNumber: string;
  rollNumber: string;
  studentName: string;
  courseName: string;
  completionDate: string;
  verificationCode: string;
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
  const [searchType, setSearchType] = useState<"serial" | "roll">("serial");
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState<CertificateResult | null>(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearching(true);
    setResult(null);

    try {
      const response = await fetch('/api/certificate/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [searchType === 'serial' ? 'serialNumber' : searchType === 'roll' ? 'rollNumber' : 'verificationCode']: searchValue
        }),
      });

      const data = (await response.json()) as CertificateResult;
      setResult(data);
    } catch (error) {
      setResult({
        found: false,
        message: 'An error occurred while verifying the certificate. Please try again.'
      });
    } finally {
      setSearching(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Certificate Verification</h1>
          <p className="text-xl text-gray-200">
            Verify your Nice Academy certificate online
          </p>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Verify Your Certificate</h2>

            <form onSubmit={handleSearch} className="space-y-6">
              {/* Search Type Selection */}
              <div>
                <label className="block text-gray-700 font-semibold mb-3">
                  Search By
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="serial"
                      checked={searchType === "serial"}
                      onChange={(e) => setSearchType(e.target.value as "serial" | "roll")}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Serial Number</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="roll"
                      checked={searchType === "roll"}
                      onChange={(e) => setSearchType(e.target.value as "serial" | "roll")}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Roll Number</span>
                  </label>
                </div>
              </div>

              {/* Search Input */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  {searchType === "serial" ? "Serial Number" : "Roll Number"}
                </label>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  placeholder={
                    searchType === "serial"
                      ? "e.g., NAB-2024-12345"
                      : "e.g., DCA-2024-001"
                  }
                  required
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                disabled={searching}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-black transition disabled:bg-gray-400"
              >
                {searching ? "Searching..." : "Verify Certificate"}
              </button>
            </form>

            {/* Result */}
            {result && (
              <div className={`mt-8 p-6 rounded-lg border-2 ${
                result.found && result.valid
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">
                    {result.found && result.valid ? '✓' : '✗'}
                  </span>
                  <h3 className={`text-2xl font-bold ${
                    result.found && result.valid ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.found && result.valid
                      ? 'Certificate Valid'
                      : result.found && !result.valid
                      ? 'Certificate Invalid'
                      : 'Certificate Not Found'
                    }
                  </h3>
                </div>

                {result.found && result.valid && result.certificate ? (
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>Student Name:</strong> {result.certificate.studentName}
                    </p>
                    <p>
                      <strong>Course:</strong> {result.certificate.courseName}
                    </p>
                    <p>
                      <strong>Completion Date:</strong> {result.certificate.completionDate}
                    </p>
                    <p>
                      <strong>Serial Number:</strong> {result.certificate.serialNumber}
                    </p>
                    <p>
                      <strong>Roll Number:</strong> {result.certificate.rollNumber}
                    </p>
                    <p>
                      <strong>Verification Code:</strong> {result.certificate.verificationCode}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-700">{('message' in result && result.message) || 'Certificate details are not available.'}</p>
                )}

                {result.found && result.valid && (
                  <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                    Download Certificate
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-8 p-6 bg-zinc-100 rounded-lg border border-zinc-200">
            <h3 className="text-lg font-bold text-black mb-3">How to Verify</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Select your verification method (Serial or Roll Number)</li>
              <li>Enter your certificate details</li>
              <li>Click "Verify Certificate"</li>
              <li>View your certificate details instantly</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}

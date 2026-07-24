import { useState } from "react";
import axios from "axios";
import {
  Globe,
  Timer,
  FileText,
  Image,
  Heading,
  BookOpen,
  Copy,
} from "lucide-react";

function App() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const analyzeWebsite = async () => {
    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setReport(null);

      let website = url.trim();

      if (
        !website.startsWith("http://") &&
        !website.startsWith("https://")
      ) {
        website = "https://" + website;
      }

      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        {
          url: website,
        }
      );

      setReport(res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyReport = () => {
    navigator.clipboard.writeText(
      JSON.stringify(report, null, 2)
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-slate-800">
          🚀 Page Pulse
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Analyze any webpage in seconds
        </p>

        <div className="mt-8">

          <input
            type="text"
            placeholder="example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                analyzeWebsite();
              }
            }}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={analyzeWebsite}
            disabled={loading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </button>

        </div>

        <div className="mt-8 border rounded-2xl p-6 bg-slate-50">

          <h2 className="text-2xl font-bold mb-6">
            Report
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-3 mb-5">
              {error}
            </div>
          )}

          {report ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">

                  <div className="flex items-center gap-2 text-gray-600 font-semibold">
                    <Globe size={18} />
                    HTTP Status
                  </div>

                  <div className="mt-3 inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-bold">
                    ✅ {report.status}
                  </div>

                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">

                  <div className="flex items-center gap-2 text-gray-600 font-semibold">
                    <Timer size={18} />
                    Response Time
                  </div>

                  <div className="mt-3 inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold">
                    ⚡ {report.responseTime}
                  </div>

                </div>

                <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 md:col-span-2">

                  <div className="flex items-center gap-2 text-gray-600 font-semibold">
                    <FileText size={18} />
                    Page Title
                  </div>

                  <p className="mt-3 text-lg font-medium break-words">
                    {report.title}
                  </p>

                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 md:col-span-2">

                  <div className="flex items-center gap-2 text-gray-600 font-semibold">
                    <FileText size={18} />
                    Meta Description
                  </div>

                  <p className="mt-3 text-gray-700 break-words">
                    {report.metaDescription}
                  </p>

                </div>

                <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">

                  <div className="flex items-center gap-2 text-gray-600 font-semibold">
                    <Heading size={18} />
                    H1 Count
                  </div>

                  <p className="text-3xl font-bold mt-3">
                    {report.h1Count}
                  </p>

                </div>

                <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">

                  <div className="flex items-center gap-2 text-gray-600 font-semibold">
                    <Image size={18} />
                    Missing Alt Images
                  </div>

                  <p className="text-3xl font-bold mt-3">
                    {report.missingAltImages}
                  </p>

                </div>
                                <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 md:col-span-2">

                  <div className="flex items-center gap-2 text-gray-600 font-semibold">
                    <BookOpen size={18} />
                    Word Count
                  </div>

                  <p className="text-3xl font-bold mt-3">
                    {report.wordCount}
                  </p>

                </div>

              </div>

              <button
                onClick={copyReport}
                className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <Copy size={18} />

                {copied ? "✅ Copied!" : "📋 Copy Report"}
              </button>

            </>
          ) : (
            !error && (
              <div className="text-center py-10">

                <div className="text-6xl">
                  🌐
                </div>

                <h3 className="text-xl font-semibold mt-4">
                  No Report Yet
                </h3>

                <p className="text-gray-500 mt-2">
                  Enter any website URL above and click
                  <span className="font-semibold"> Analyze </span>
                  to generate a report.
                </p>

              </div>
            )
          )}

        </div>

        <footer className="mt-8 text-center text-sm text-gray-500 border-t pt-6">

          <p>
            Built for{" "}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              Digital Heroes Training Task
            </a>
          </p>

          <p className="mt-2 text-xs text-gray-400">
            Developed by Kajal Verma ❤️
          </p>

        </footer>

      </div>

    </div>
  );
}

export default App;

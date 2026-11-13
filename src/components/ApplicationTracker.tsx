import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Upload,
  MessageSquare,
} from 'lucide-react';
import { INITIAL_TRACK_RECORDS } from '../data/hubData';
import { ApplicationTrackRecord, ApplicationDocument } from '../types';
import { getWhatsAppDeliveryUrl } from '../utils/whatsappRouting';
import { AimsLogo } from './AimsLogo';

export const ApplicationTracker: React.FC = () => {
  const [searchRef, setSearchRef] = useState('AIMS-8492');
  const [activeRecord, setActiveRecord] = useState<ApplicationTrackRecord>(INITIAL_TRACK_RECORDS[0]);
  const [notFound, setNotFound] = useState(false);
  const [documents, setDocuments] = useState<ApplicationDocument[]>(INITIAL_TRACK_RECORDS[0].documents);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchRef.trim().toUpperCase();
    const found = INITIAL_TRACK_RECORDS.find(
      (r) => r.refId.toUpperCase() === query || r.applicantName.toUpperCase().includes(query)
    );

    if (found) {
      setActiveRecord(found);
      setDocuments(found.documents);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  const handleDemoSelect = (rec: ApplicationTrackRecord) => {
    setSearchRef(rec.refId);
    setActiveRecord(rec);
    setDocuments(rec.documents);
    setNotFound(false);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDoc: ApplicationDocument = {
        id: `d-${Date.now()}`,
        name: file.name,
        category: 'Client Uploaded',
        status: 'under_review',
        updatedAt: 'Just now',
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setUploadSuccess(`Successfully uploaded "${file.name}" for compliance audit.`);
      setTimeout(() => setUploadSuccess(null), 4000);
    }
  };

  return (
    <section id="tracker" className="py-16 sm:py-20 bg-[#F4F5F7] border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#926B16]">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>Live Case Dossier Status</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight font-display">
            Live Visa Application Tracker
          </h2>
          <p className="text-sm sm:text-base text-[#334155] leading-[1.65]">
            Track your immigration milestones in real time. Verify document compliance, embassy lodgement, biometrics, and stamping status.
          </p>
        </div>

        {/* Search Bar & Demo Selector */}
        <div className="max-w-2xl mx-auto mb-10">
          <form
            onSubmit={handleSearch}
            className="flex gap-2 p-1.5 bg-white rounded-xl shadow-sm border border-slate-200"
          >
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="Enter Application Reference (e.g. AIMS-8492 or Name)"
                className="w-full px-3 py-2.5 text-sm text-[#0F172A] font-semibold focus:outline-hidden bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
            >
              Track Dossier
            </button>
          </form>

          {/* Preset Demo Cases */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs">
            <span className="text-slate-600 font-medium">Sample Records:</span>
            {INITIAL_TRACK_RECORDS.map((rec) => (
              <button
                key={rec.refId}
                onClick={() => handleDemoSelect(rec)}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold border transition-colors cursor-pointer ${
                  activeRecord.refId === rec.refId
                    ? 'bg-[#0F172A] text-white border-[#0F172A]'
                    : 'bg-white text-[#334155] border-slate-200 hover:border-[#C29B38]'
                }`}
              >
                <span>
                  {rec.flag} {rec.refId} ({rec.applicantName.split(' ')[0]})
                </span>
              </button>
            ))}
          </div>

          {notFound && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Record not found. Try one of our sample tracking records above or contact our Hoshiarpur desk.</span>
            </div>
          )}
        </div>

        {/* Active Application Dashboard */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200/90 overflow-hidden">
          {/* Dashboard Header Bar */}
          <div className="p-6 bg-[#0F172A] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 border border-white/10 shrink-0">
                <AimsLogo variant="emblem" className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl">{activeRecord.flag}</span>
                  <h3 className="text-lg font-bold tracking-tight">{activeRecord.applicantName}</h3>
                  <span className="px-2 py-0.5 rounded bg-[#1E293B] border border-[#C29B38]/40 text-[#DFB958] text-[10px] font-mono font-bold">
                    {activeRecord.refId}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  AIMS Dossier: {activeRecord.destination} • {activeRecord.visaType}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Lodge Date</span>
                <span className="font-semibold tabular-nums">{activeRecord.submissionDate}</span>
              </div>
              <div className="border-l border-slate-700 pl-4">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Decision</span>
                <span className="font-semibold text-[#DFB958] tabular-nums">{activeRecord.expectedDecision}</span>
              </div>
              <a
                href={getWhatsAppDeliveryUrl(
                  `Hello AIMS Consultancy, checking status for Application Ref: ${activeRecord.refId} (${activeRecord.applicantName}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#C29B38] hover:bg-[#B38D2D] text-[#0F172A] font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Query</span>
              </a>
            </div>
          </div>

          {/* Overall Progress Indicator */}
          <div className="p-6 border-b border-slate-200 bg-[#F8F9FA]">
            <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#926B16]" />
                <span>Current Stage: {activeRecord.currentStage}</span>
              </span>
              <span className="text-[#926B16] tabular-nums">{activeRecord.stageProgress}% Completed</span>
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0F172A] to-[#C29B38] h-full rounded-full transition-all duration-700"
                style={{ width: `${activeRecord.stageProgress}%` }}
              />
            </div>

            <p className="text-xs text-[#334155] mt-2.5">
              <strong className="text-[#0F172A]">Advisor Note:</strong> "{activeRecord.officerRemarks}"
            </p>
          </div>

          {/* Split View: Milestones (Left) and Document Checklist (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left Column: Milestone Pipeline */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Application Progression Milestones
              </h4>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {activeRecord.milestones.map((m, idx) => {
                  const isDone = m.status === 'completed';
                  return (
                    <div key={m.id} className="relative">
                      <div
                        className={`absolute -left-[29px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                          isDone
                            ? 'bg-[#0F172A] border-white text-[#DFB958] shadow-xs'
                            : 'bg-white border-[#C29B38] text-[#926B16]'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </div>

                      <div className="bg-[#F8F9FA] p-4 rounded-xl border border-slate-200/80">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-sm font-bold text-[#0F172A]">{m.title}</h5>
                          <span className="text-[11px] font-semibold text-slate-500 tabular-nums">{m.date}</span>
                        </div>
                        <p className="text-xs text-[#334155] mt-1 leading-[1.6]">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Document Verification Hub */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[#F8F9FA]/70 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Document Verification Hub
                  </h4>
                  <p className="text-[11px] text-slate-500">Legal audit & compliance status</p>
                </div>
                <span className="text-xs font-bold text-[#0F172A] bg-[#C29B38]/20 px-2.5 py-1 rounded-md border border-[#C29B38]/40 tabular-nums">
                  {documents.filter((d) => d.status === 'verified').length} / {documents.length} Verified
                </span>
              </div>

              {uploadSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{uploadSuccess}</span>
                </div>
              )}

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="p-2 rounded-lg bg-[#F4F5F7] text-[#0F172A] shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-[#0F172A] truncate" title={doc.name}>
                          {doc.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {doc.category} • {doc.fileSize || 'PDF'}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        doc.status === 'verified'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : doc.status === 'under_review'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {doc.status === 'verified' ? 'Verified' : 'Under Review'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl bg-white text-center hover:border-[#C29B38] transition-colors">
                <input
                  type="file"
                  id="document-file-upload"
                  onChange={handleSimulateUpload}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                <label htmlFor="document-file-upload" className="cursor-pointer block space-y-1.5">
                  <Upload className="w-5 h-5 text-[#926B16] mx-auto" />
                  <div className="text-xs font-bold text-[#0F172A]">Upload Additional Document</div>
                  <p className="text-[10px] text-slate-500">
                    PDF, JPEG up to 10MB (Bank proof, IELTS, Degree, SOP)
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

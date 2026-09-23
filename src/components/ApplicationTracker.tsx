import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Upload, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  ArrowRight,
  Sparkles,
  MessageSquare,
  Lock,
  ExternalLink
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
    <section id="tracker" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200/90 text-slate-800 text-xs font-bold mb-3 shadow-xs">
            <AimsLogo variant="emblem" className="w-4 h-4" />
            <span>AIMS Client Self-Service Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-display">
            Live Visa Application Tracker
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Track your immigration milestones in real time. Verify document compliance, embassy lodgement, biometrics, and stamping status.
          </p>
        </div>

        {/* Search Bar & Demo Pills */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex gap-2 p-1.5 bg-white rounded-xl shadow-md border border-slate-200">
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                placeholder="Enter Application Reference (e.g. AIMS-8492 or Name)"
                className="w-full px-3 py-2.5 text-sm text-slate-900 font-semibold focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
            >
              Track Dossier
            </button>
          </form>

          {/* Preset Demo Cases */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs">
            <span className="text-slate-500 font-medium">Quick Demo Records:</span>
            {INITIAL_TRACK_RECORDS.map((rec) => (
              <button
                key={rec.refId}
                onClick={() => handleDemoSelect(rec)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-colors cursor-pointer ${
                  activeRecord.refId === rec.refId
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
                }`}
              >
                <span>{rec.flag} {rec.refId} ({rec.applicantName.split(' ')[0]})</span>
              </button>
            ))}
          </div>

          {notFound && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>Record not found. Try one of our live demo tracking records above or contact the office desk.</span>
            </div>
          )}
        </div>

        {/* Active Application Dashboard */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Dashboard Header Bar */}
          <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/10 border border-white/10 shrink-0">
                  <AimsLogo variant="emblem" className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{activeRecord.flag}</span>
                    <h3 className="text-lg font-black tracking-tight">{activeRecord.applicantName}</h3>
                    <span className="px-2 py-0.5 rounded bg-blue-600/40 border border-blue-400/30 text-blue-200 text-[10px] font-mono font-bold">
                      {activeRecord.refId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    AIMS Dossier: {activeRecord.destination} • {activeRecord.visaType}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Lodge Date</span>
                <span className="font-semibold">{activeRecord.submissionDate}</span>
              </div>
              <div className="border-l border-slate-700 pl-4">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Decision</span>
                <span className="font-semibold text-emerald-300">{activeRecord.expectedDecision}</span>
              </div>
              <a
                href={getWhatsAppDeliveryUrl(`Hello AIMS Consultancy, checking status for Application Ref: ${activeRecord.refId} (${activeRecord.applicantName}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 ml-2 cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Query</span>
              </a>
            </div>
          </div>

          {/* Overall Progress Indicator */}
          <div className="p-6 border-b border-slate-200 bg-blue-50/40">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
              <span className="flex items-center gap-1.5 text-blue-700">
                <Clock className="w-3.5 h-3.5" />
                <span>Current Stage: {activeRecord.currentStage}</span>
              </span>
              <span className="text-blue-600">{activeRecord.stageProgress}% Completed</span>
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${activeRecord.stageProgress}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 mt-2.5 italic">
              <strong>Official Note:</strong> "{activeRecord.officerRemarks}"
            </p>
          </div>

          {/* Split View: Milestones (Left) and Document Checklist (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            
            {/* Left Column: 4 Milestone Pipeline */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Application Progression Milestones
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {activeRecord.milestones.map((m, idx) => {
                  const isDone = m.status === 'completed';
                  return (
                    <div key={m.id} className="relative">
                      {/* Milestone Dot */}
                      <div className={`absolute -left-[29px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                        isDone 
                          ? 'bg-emerald-600 border-white text-white shadow-xs' 
                          : 'bg-white border-blue-600 text-blue-600 animate-pulse'
                      }`}>
                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-bold text-slate-900">{m.title}</h5>
                          <span className="text-[10px] font-semibold text-slate-500">{m.date}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Secure Document Checklist & Uploads */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50/50 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Document Verification Hub
                  </h4>
                  <p className="text-[11px] text-slate-500">Legal audit & compliance status</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {documents.filter(d => d.status === 'verified').length} / {documents.length} Verified
                </span>
              </div>

              {/* Upload Success Alert */}
              {uploadSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{uploadSuccess}</span>
                </div>
              )}

              {/* Document List */}
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-slate-800 truncate" title={doc.name}>
                          {doc.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {doc.category} • {doc.fileSize || 'PDF'}
                        </div>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      doc.status === 'verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : doc.status === 'under_review'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doc.status === 'verified' ? 'Verified' : 'Under Review'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Upload New Document Box */}
              <div className="p-4 border-2 border-dashed border-blue-300 rounded-xl bg-blue-50/50 text-center hover:bg-blue-50 transition-colors">
                <input
                  type="file"
                  id="document-file-upload"
                  onChange={handleSimulateUpload}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                />
                <label
                  htmlFor="document-file-upload"
                  className="cursor-pointer block space-y-1.5"
                >
                  <Upload className="w-5 h-5 text-blue-600 mx-auto" />
                  <div className="text-xs font-bold text-blue-700">
                    Upload Additional Document
                  </div>
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

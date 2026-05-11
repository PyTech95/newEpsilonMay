import React, { useRef, useState } from 'react';
import { Upload, X, Loader2, FileText } from 'lucide-react';
import { api } from './api';

/**
 * Generic file field for non-image uploads (PDFs etc.).
 * Stores the resolved URL string. Renders a clean PDF tile preview.
 */
export default function FileField({ label, value, onChange, help, accept = '.pdf', maxSizeMb = 20 }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onPick = () => inputRef.current?.click();

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`File is too large (max ${maxSizeMb} MB).`);
      return;
    }
    setError('');
    setUploading(true);
    try {
      const res = await api.uploadImage(file); // same endpoint; backend allows PDFs too
      onChange(res.url);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const fileName = value ? value.split('/').pop() : '';

  return (
    <div>
      <span className="fld-label">{label}</span>

      <div className="flex items-start gap-4 mt-1">
        <div className="w-28 h-28 flex-shrink-0 bg-bone border border-navy/10 overflow-hidden flex flex-col items-center justify-center text-navy/60">
          {value ? (
            <>
              <FileText size={32} className="text-gold" />
              <span className="font-caps text-[0.5rem] tracking-[0.18em] mt-2 text-center px-1 truncate w-full" title={fileName}>{fileName}</span>
            </>
          ) : (
            <span className="font-caps text-[0.55rem] text-navy/40 tracking-[0.22em]">No file</span>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onPick}
              disabled={uploading}
              data-testid={`file-field-upload-btn-${label}`}
              className="btn-outline-gold border-navy/30 text-navy hover:text-gold text-xs px-4 py-2 disabled:opacity-50"
            >
              {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
              {uploading ? 'Uploading…' : `Upload ${accept.replace('.', '').toUpperCase()}`}
            </button>
            {value && (
              <a href={value} target="_blank" rel="noopener noreferrer"
                 className="border border-navy/20 text-navy/70 hover:text-gold hover:border-gold/50 text-xs px-3 py-2 inline-flex items-center gap-1">
                Open
              </a>
            )}
            {value && (
              <button type="button" onClick={() => onChange('')}
                className="border border-navy/20 text-navy/70 hover:text-red-500 hover:border-red-300 text-xs px-3 py-2 inline-flex items-center gap-1">
                <X size={13} /> Clear
              </button>
            )}
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={onFile}
              className="hidden"
              data-testid={`file-field-input-${label}`}
            />
          </div>

          <input
            type="text"
            className="fld-input text-sm"
            placeholder={`…or paste a ${accept.replace('.', '').toUpperCase()} URL`}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            data-testid={`file-field-url-${label}`}
          />

          {error && <p className="text-red-600 text-xs">{error}</p>}
          {help && <p className="text-xs text-navy/50">{help}</p>}
        </div>
      </div>
    </div>
  );
}

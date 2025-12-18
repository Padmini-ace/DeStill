import React, { useRef, useState } from 'react';
import { FileInput } from '../types';
import { Upload, X, FileText } from 'lucide-react';

interface ChaosInputProps {
  onDistill: (text: string, files: FileInput[]) => void;
  isProcessing: boolean;
  isFollowUp?: boolean;
}

const ChaosInput: React.FC<ChaosInputProps> = ({ onDistill, isProcessing, isFollowUp = false }) => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<FileInput[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files) as File[];
      // Limit to 3 files
      const remainingSlots = 3 - files.length;
      const filesToProcess = selectedFiles.slice(0, remainingSlots);

      const processedFiles: FileInput[] = [];

      for (const file of filesToProcess) {
        if (file.type === 'application/pdf' || file.type.startsWith('text/')) {
           const base64 = await fileToBase64(file);
           processedFiles.push({
             name: file.name,
             mimeType: file.type,
             data: base64
           });
        }
      }
      setFiles(prev => [...prev, ...processedFiles]);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove Data URI prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!text.trim() && files.length === 0) return;
    onDistill(text, files);
    setText('');
    setFiles([]);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto transition-all duration-500 ${isFollowUp ? 'mt-8' : 'mt-0'}`}>
      <div 
        className="relative group bg-[#0B1526] border border-[#1E293B] rounded-lg focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37] transition-all flex flex-col min-h-[16rem] cursor-text overflow-hidden"
        onClick={() => textareaRef.current?.focus()}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isFollowUp ? "Add new context to re-distill..." : "Dump everything here. De-Still will decide what matters."}
          className="w-full h-full absolute inset-0 bg-transparent text-[#E2E8F0] py-20 px-12 resize-none focus:outline-none placeholder:text-slate-600 hover:placeholder:text-slate-400 placeholder:transition-colors placeholder:duration-300 font-light leading-relaxed text-center z-10"
          disabled={isProcessing}
        />
        
        {/* Bottom Section: Files and Upload Button - Absolute Positioned */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-4 pb-4 z-20 pointer-events-none">
          
          {/* File List */}
          <div className="flex flex-wrap gap-2 mr-4 pointer-events-auto">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-[#1E293B] text-xs text-[#D4AF37] px-3 py-1.5 rounded-full border border-[#D4AF37]/30">
                <FileText size={12} />
                <span className="truncate max-w-[100px] md:max-w-[150px]">{file.name}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); removeFile(idx); }} 
                  className="hover:text-white"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <div className="flex-shrink-0 pointer-events-auto">
            <button 
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="text-[#8C7326] hover:text-[#D4AF37] transition-colors p-2 rounded-full hover:bg-[#1E293B]"
              disabled={isProcessing || files.length >= 3}
              title="Upload PDF (Max 3)"
            >
              <Upload size={20} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".pdf,text/plain"
              multiple
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={(!text && files.length === 0) || isProcessing}
          className={`
            px-8 py-3 rounded-sm font-serif tracking-widest uppercase text-sm font-semibold transition-all duration-300
            ${(!text && files.length === 0) || isProcessing 
              ? 'bg-[#1E293B] text-slate-500 cursor-not-allowed' 
              : 'bg-[#D4AF37] text-[#050A14] hover:bg-[#FCD34D] shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]'
            }
          `}
        >
          {isFollowUp ? 'Re-distill' : 'De-Still my priorities'}
        </button>
      </div>
    </div>
  );
};

export default ChaosInput;
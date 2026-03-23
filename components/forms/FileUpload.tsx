'use client';

import { useRef, useState, ChangeEvent } from 'react';
import { cn } from '@/lib/utils';
import { Upload, X, FileText } from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps {
  name: string;
  label?: string;
  error?: string;
  defaultValue?: string | null;
  className?: string;
  accept?: string;
}

export function FileUpload({
  name,
  label,
  error,
  defaultValue,
  className,
  accept = 'image/*',
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <label className='text-sm font-medium text-slate-700'>{label}</label>}

      <div
        className={cn(
          'relative group cursor-pointer flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-all',
          'border-slate-200 bg-white overflow-hidden',
          'hover:border-blue-500 hover:bg-slate-50',
          error && 'border-red-500',
          preview ? 'aspect-video h-48' : 'h-32',
        )}
        onClick={handleClick}
      >
        {preview ? (
          <>
            <Image src={preview} alt='Preview' fill className='object-contain p-2' />
            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
              <span className='text-white text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm'>
                Change File
              </span>
            </div>
          </>
        ) : fileName ? (
          <div className='flex flex-col items-center gap-2 p-4'>
            <div className='p-3 rounded-full bg-blue-50 text-blue-500'>
              <FileText className='w-6 h-6' />
            </div>
            <p className='text-sm font-medium text-slate-600 truncate max-w-[200px]'>{fileName}</p>
            <span className='text-xs text-slate-400'>Click to change</span>
          </div>
        ) : (
          <>
            <div className='p-3 rounded-full bg-slate-100 text-slate-400 group-hover:text-blue-500 transition-colors'>
              <Upload className='w-5 h-5' />
            </div>
            <div className='text-center'>
              <p className='text-sm font-medium text-slate-600'>Click to upload</p>
              <p className='text-xs text-slate-400 mt-1'>Images or Documents</p>
            </div>
          </>
        )}

        <input
          type='file'
          name={name}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className='hidden'
        />
        {!preview && !fileName && <input type='hidden' name={`${name}_cleared`} value='true' />}
      </div>

      {preview && (
        <button
          type='button'
          onClick={handleRemove}
          className='flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 transition-colors w-fit mt-1'
        >
          <X className='w-3.5 h-3.5' />
          Remove File
        </button>
      )}

      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
}

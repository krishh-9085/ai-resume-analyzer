import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '~/lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        setSelectedFile(file);
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024;

    const {getRootProps, getInputProps, isDragActive, fileRejections} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = selectedFile;

    return (
        <>
            <div
                {...getRootProps()}
                className={`
                    w-full p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 
                    text-black placeholder-white/60 focus:outline-none focus:ring-2 
                    focus:ring-white/30 focus:border-white/40 transition-all duration-300 
                    cursor-pointer
                    ${file
                    ? 'h-[72px] flex items-center'
                    : 'h-[140px] flex items-center justify-center'
                }
                    ${isDragActive
                    ? 'border-white/40 bg-white/15 scale-[1.005] shadow-lg'
                    : 'hover:border-white/30 hover:bg-white/12'
                }
                `}
            >
                <input {...getInputProps()} />

                {file ? (
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-4 min-w-0 flex-1">
                            <div className="relative flex-shrink-0">
                                <img src="/images/pdf.png" alt="pdf" className="w-8 h-8" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white shadow-sm"></div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-lg font-semibold text-black truncate">
                                    {file.name}
                                </p>
                                <p className="text-sm text-black/60">
                                    {formatSize(file.size)}
                                </p>
                            </div>
                        </div>

                        <button
                            className="flex-shrink-0 p-3 hover:bg-white/20 rounded-lg transition-colors duration-200 ml-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFile(null);
                                onFileSelect?.(null);
                            }}
                        >
                            <svg className="w-6 h-6 text-black/60 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-6 w-full justify-center">
                        <div className={`transition-all duration-300 flex-shrink-0 ${isDragActive ? 'scale-110' : ''}`}>
                            <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>

                        <div className="text-left">
                            <p className="text-xl font-semibold text-white">
                                {isDragActive ? (
                                    <span className="text-blue-600">Drop your PDF here</span>
                                ) : (
                                    <>
                                        <span>Click to upload</span>
                                        <span className="font-normal text-white/70"> or drag & drop</span>
                                    </>
                                )}
                            </p>
                            <p className="text-lg text-white/50 mt-1">
                                PDF files only • Max {formatSize(maxFileSize)}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {fileRejections.length > 0 && (
                <div className="mt-3 p-4 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
                    <p className="text-base text-red-600 font-medium">
                        {fileRejections[0].errors[0].message}
                    </p>
                </div>
            )}
        </>
    )
}

export default FileUploader

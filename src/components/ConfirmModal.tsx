import { X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-zinc-950 border border-black dark:border-zinc-800 w-full max-w-sm p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-light uppercase tracking-widest text-black dark:text-white">
            {title}
          </h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-zinc-400 mb-8">
          {message}
        </p>
        
        <div className="flex gap-4">
          <button onClick={onCancel} className="btn btn-secondary w-full">
            CANCEL
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onCancel();
            }} 
            className="btn btn-danger w-full"
          >
            CLEAR
          </button>
        </div>
      </div>
    </div>
  );
};

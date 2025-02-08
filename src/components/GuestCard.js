import { Mail } from 'lucide-react';

const GuestCard = ({ guest, hasDuplicates, isSelected, onSelect }) => (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:scale-105 cursor-pointer
        ${isSelected ? 'ring-2 ring-green-500 dark:ring-green-400' : ''}
      `}
      onClick={() => onSelect(guest.table)}
    >
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-500 mb-2">
          {guest.table}
        </div>
        <div className="text-gray-800 dark:text-gray-200 font-medium mb-1">
          {guest.name}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Table Number
        </div>
        
        {hasDuplicates && guest.email && (
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Mail size={14} />
            <span className="truncate">{guest.email}</span>
          </div>
        )}
      </div>
    </div>
);

export default GuestCard;
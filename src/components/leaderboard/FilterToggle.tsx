import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FilterToggleProps<T extends string> {
  options: { value: T; label: string; icon?: LucideIcon }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function FilterToggle<T extends string>({
  options,
  value,
  onChange,
  className,
}: FilterToggleProps<T>) {
  return (
    <div className={cn('flex rounded-lg bg-muted p-1', className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
            value === option.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {option.icon && <option.icon className="w-4 h-4 flex-shrink-0" />}
          <span className="hidden sm:inline">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
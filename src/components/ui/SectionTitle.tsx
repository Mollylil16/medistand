import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  centered = true,
  className,
}) => {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 animate-fade-in-up">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full animate-scale-in" />
    </div>
  );
};


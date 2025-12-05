import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = true, style }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-lg p-6',
        hover && 'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};


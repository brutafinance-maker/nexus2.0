import React from 'react';

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  hover?: boolean;
}

export const Card = ({ children, className = '', hover = true, ...props }: CardProps) => {
  return (
    <div 
      className={`bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm ${hover ? 'hover:shadow-md transition-shadow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

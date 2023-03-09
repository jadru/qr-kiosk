import React from 'react';
import { Link, LinkProps, useNavigate } from 'react-router-dom';

interface Props {
  className?: string;
  children?: string;
}

const ErrorMessage: React.FC<Props> = ({ className, children }) => (
  <p className={`text-red-400 mt-1 font-bold text-sm h-6 pl-3 ${className}`}>
    {children}
  </p>
);

export default ErrorMessage;

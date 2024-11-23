import React from 'react';

type EmptyStateProps = {
  message: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="empty-state">
      <p>{message}</p>
    </div>
  );
};

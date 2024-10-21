import React from 'react';

type Props = {
  children: React.ReactNode;
  endContent?: React.ReactNode;
};

const PageTitle = ({ children, endContent }: Props) => (
  <div className="flex items-center justify-between">
    <p className="text-2xl">{children}</p>
    {endContent && endContent}
  </div>
);

export default PageTitle;

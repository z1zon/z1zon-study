import React from "react";

interface ReactWrapperProps {
  children: React.ReactNode;
}

const ReactWrapper: React.FC<ReactWrapperProps> = ({ children }) => <>{children}</>;

export default ReactWrapper;

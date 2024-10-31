import React from "react";

export default function HomePageLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto max-w-5xl flex flex-col items-center w-full h-full justify-center">
      {children}
    </div>
  );
}

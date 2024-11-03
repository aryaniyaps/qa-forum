import React from "react";

export default function HomePageLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center w-full h-full justify-center">
      <div className="mx-auto max-w-5xl flex flex-col w-full h-full gap-4 flex-1">
        {children}
      </div>
    </div>
  );
}

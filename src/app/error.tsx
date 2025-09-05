"use client";

import React from "react";

const ErrorComponent = ({ reset }: { reset: () => void }) => {
  return (
    <div className="flex items-center justify-center py-10 px-4 text-center h-[calc(100dvh-70px)]">
      <div className="bg-[var(--card-foreground)] border border-[var(--chart-5)] text-[var(--destructive)] p-6 rounded-md w-full max-w-md shadow">
        <h2 className="text-xl font-semibold mb-2">Error</h2>
        <p className="text-sm mb-4">
          Something went wrong while fetching data.
        </p>
        {reset && (
          <button
            onClick={reset}
            className="px-4 py-2 cursor-pointer text-sm font-medium text-[var(--foreground)] bg-[var(--destructive)] rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorComponent;

import React from 'react';
import { CoursesHub } from './courses/CoursesHub';

export const App: React.FC = () => {
  return (
    <div className="min-h-dvh w-full bg-[#08060e] text-[#f8f5ff] p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1440px] mx-auto space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#221a35]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1d152d] border border-[#302249] flex items-center justify-center font-black text-[#ff4fcb]">
              O
            </div>
            <div>
              <div className="text-sm font-black text-white">
                Orbit | Vietnam · Môi Trường Phát Triển Khóa Học Độc Lập
              </div>
              <div className="text-xs font-mono text-[#c4a6ff]/75">
                Repository: github.com/DaiVietForWork-81/khoahoc
              </div>
            </div>
          </div>

          <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#13111c] border border-[#221a35] text-emerald-300">
            Standalone Preview · Tự động đồng bộ sang Orbit Hub khi push lên main
          </div>
        </header>

        <main>
          <CoursesHub />
        </main>
      </div>
    </div>
  );
};

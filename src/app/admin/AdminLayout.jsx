// "use client";
// import React, { useState } from "react";
// import { Menu } from "lucide-react";
// import { AdminSidebar } from "../compoments/navbar";

// export default function AdminLayout({ children }) {
//   const [open, setOpen] = useState(false);

//   const closeDrawer = () => setOpen(false);

//   return (
//     <div className="flex min-h-dvh bg-slate-50">
//       {/* Mobile overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 z-40 bg-black/40 md:hidden"
//           onClick={closeDrawer}
//           aria-hidden
//         />
//       )}

//       {/* Sidebar drawer (mobile) / column (desktop) */}
//       <div
//         className={`
//           fixed inset-y-0 left-0 z-50 md:static md:z-auto
//           flex shrink-0
//           transform transition-transform duration-300 ease-out
//           ${open ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0
//         `}
//       >
//         <AdminSidebar onNavigate={closeDrawer} />
//       </div>

//       {/* Main */}
//       <div className="flex min-w-0 flex-1 flex-col">
//         <header className="sticky top-0 z-30 flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-sm md:hidden">
//           <button
//             type="button"
//             aria-label="Open menu"
//             aria-expanded={open}
//             className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
//             onClick={() => setOpen(true)}
//           >
//             <Menu size={22} />
//           </button>
//           <h1 className="text-base font-bold text-slate-900">Admin Panel</h1>
//         </header>

//         <main className="min-w-0 flex-1 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-6 md:pl-2 md:pr-8 lg:pr-10">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

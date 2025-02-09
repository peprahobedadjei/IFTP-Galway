import React from "react";
import Link from "next/link";

const Nav = () => {
    return (
        <>
            <header className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex-1 md:flex md:items-center md:gap-12">
                            <a className="block text-teal-600" href="#">
                                <span className="sr-only">Home</span>
<div className="text-2xl text-black font-extrabold">LeakShield</div>
                            </a>
                        </div>

                        <div className="md:flex md:items-center md:gap-12">
                            <nav aria-label="Global" className="hidden md:block">
                                <ul className="flex items-center gap-6 text-sm">
                                    <Link
                                     className="text-gray-500 transition hover:text-gray-500/75" href="/settings"> Settings
                                    </Link>
                                </ul>
                            </nav>

                            <div className="hidden md:flex md:items-center md:gap-4">
                                {/* Avatar */}
                                <button
                                    type="button"
                                    className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                                >
                                    <span className="sr-only">Toggle dashboard menu</span>
                                    <img
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="User Avatar"
                                        className="size-10 object-cover"
                                    />
                                </button>

                                {/* User info */}
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-gray-700">Administartor</p>
                                    <p className="text-xs text-gray-500">Software Engineer</p>
                                </div>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="block md:hidden">
                                <button
                                    className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Nav;

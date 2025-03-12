"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmail() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isResending, setIsResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const { VerifyEmailMutation, resendOtpMutation } = useAuth();
    const router = useRouter();

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        VerifyEmailMutation.mutate(
            { email, otp },
            {
                onSuccess: () => {
                    alert("Email Verified Successfully");
                    router.push('/login');
                },
            }
        );
    };

    const handleResendOTP = async () => {
        if (!email) {
            alert("Please enter your email address.");
            return;
        } else {
            resendOtpMutation.mutate({ email }, { onSuccess: () => setResendSuccess(true) });
        }
        setIsResending(true);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-900 p-4">
            <div className="w-full max-w-md">
                <form onSubmit={handleVerify} className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Verify Your Email</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Please enter the verification code sent to your email address.
                    </p>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Verification Code
                        </label>
                        <input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter verification code"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Verify Email
                    </button>

                    <div className="mt-4 text-center">
                        {resendSuccess ? (
                            <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                                Verification code sent successfully!
                            </p>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResendOTP}
                                disabled={isResending}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium focus:outline-none"
                            >
                                {isResending ? "Sending..." : "Didn't receive the code? Resend"}
                            </button>
                        )}
                    </div>

                    <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
                        Already verified?{" "}
                        <Link href="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
"use client"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
    const { user, logoutMutation } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Welcome,{user?.email}</h1>
            <button className="btn-danger" onClick={() => logoutMutation.mutate()} type="button">Logout</button>
        </div>
    )
}
import AuthForm from "@/components/AuthForm";

export default function Login() {
    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <AuthForm type="login" />;
        </div>
    )
}
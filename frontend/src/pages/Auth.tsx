import { Image } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoSrc from "../../public/logo.png";
import { AuthForm } from "../layouts/AuthForm";

export function Auth() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function signIn(): void {
		navigate("/");
	}

	return (
		<main className="flex flex-col h-screen w-screen items-center gap-8 pt-52">
			<Image src={logoSrc} width={300} />
			<AuthForm setEmail={setEmail} setPassword={setPassword} btnFnc={signIn} />
		</main>
	);
}

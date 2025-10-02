import { Image } from "@heroui/react";
import { useState } from "react";
import logoSrc from "../../public/logo.png";
import { usePostLogin } from "../hooks/usePostLogin";
import { AuthForm } from "../layouts/AuthForm";

export function Auth() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const { mutate } = usePostLogin();

	function signIn(): void {
		mutate({ email, pass });
	}

	return (
		<main className="flex flex-col h-screen w-screen items-center gap-8 pt-52">
			<Image src={logoSrc} width={300} />
			<AuthForm setEmail={setEmail} setPass={setPass} btnFnc={signIn} />
		</main>
	);
}

import { Button, Input } from "@heroui/react";

type AuthFormProps = {
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	btnFnc: () => void;
};

export function AuthForm({ setEmail, setPassword, btnFnc }: AuthFormProps) {
	return (
		<form className="flex flex-col gap-3 w-72">
			<Input
				isRequired
				size="sm"
				label="Почта"
				type="email"
				onChange={e => setEmail(e.target.value)}
			/>
			<Input
				isRequired
				size="sm"
				label="Пароль"
				type="password"
				onChange={e => setPassword(e.target.value)}
			/>
			<Button color="primary" size="sm" className="w-full" onPress={btnFnc}>
				Войти
			</Button>
		</form>
	);
}

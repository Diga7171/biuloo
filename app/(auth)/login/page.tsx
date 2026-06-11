import { LoginForm } from "@/components/AuthForms";
import { Logo } from "@/components/Logo";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="reveal rounded-3xl border-2 border-secondary/10 bg-white p-8 sm:p-10">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-2xl font-extrabold">
          Вход в личный кабинет
        </h1>
        <p className="mt-2 text-center text-sm text-secondary/55">
          Отслеживайте статус заявок, договоров и доставки автомобиля.
        </p>
        <div className="mt-6">
          <LoginForm callbackUrl={callbackUrl || "/cabinet"} />
        </div>
      </div>
    </div>
  );
}

import { RegisterForm } from "@/components/AuthForms";
import { Logo } from "@/components/Logo";

export default async function RegisterPage({
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
          Регистрация
        </h1>
        <p className="mt-2 text-center text-sm text-secondary/55">
          Создайте аккаунт, чтобы отслеживать прогресс оформления договора и доставки.
        </p>
        <div className="mt-6">
          <RegisterForm callbackUrl={callbackUrl || "/cabinet"} />
        </div>
      </div>
    </div>
  );
}

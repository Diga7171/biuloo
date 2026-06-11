"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, registerAction, type AuthFormState } from "@/app/actions/auth";

const inputClass =
  "rounded-xl border-2 border-secondary/10 bg-bg px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-primary";

const submitClass =
  "mt-2 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-primary-dark)] active:translate-y-0 active:shadow-none disabled:opacity-60";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    loginAction,
    undefined
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      {state?.error && (
        <p className="rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
          {state.error}
        </p>
      )}

      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Email
        <input required name="email" type="email" placeholder="you@example.com" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Пароль
        <input required name="password" type="password" placeholder="••••••••" className={inputClass} />
      </label>

      <button type="submit" disabled={pending} className={submitClass}>
        {pending ? "Входим..." : "Войти"}
      </button>

      <p className="text-center text-sm text-secondary/55">
        Нет аккаунта?{" "}
        <Link href="/register" className="font-bold text-primary">
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
}

export function RegisterForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    registerAction,
    undefined
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      {state?.error && (
        <p className="rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
          {state.error}
        </p>
      )}

      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Ваше имя
        <input required name="name" type="text" placeholder="Иван Иванов" className={inputClass} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Email
          <input required name="email" type="email" placeholder="you@example.com" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Телефон
          <input name="phone" type="tel" placeholder="+375 29 000-00-00" className={inputClass} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        Пароль
        <input required name="password" type="password" placeholder="Не менее 6 символов" minLength={6} className={inputClass} />
      </label>

      <button type="submit" disabled={pending} className={submitClass}>
        {pending ? "Создаём аккаунт..." : "Зарегистрироваться"}
      </button>

      <p className="text-center text-sm text-secondary/55">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="font-bold text-primary">
          Войти
        </Link>
      </p>
    </form>
  );
}

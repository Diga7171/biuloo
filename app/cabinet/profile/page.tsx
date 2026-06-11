import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateProfile } from "@/app/actions/profile";

const inputClass =
  "rounded-xl border-2 border-secondary/10 bg-bg px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-primary";

export default async function ProfilePage() {
  const session = await auth();
  const user = await prisma.user.findUnique({ where: { id: session!.user!.id } });
  if (!user) return null;

  return (
    <div className="reveal max-w-xl rounded-3xl border-2 border-secondary/10 bg-white p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold">Личные данные</h2>
      <form action={updateProfile} className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Имя
          <input required name="name" type="text" defaultValue={user.name} className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Телефон
          <input name="phone" type="tel" defaultValue={user.phone ?? ""} placeholder="+375 29 000-00-00" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Email
          <input
            disabled
            type="email"
            value={user.email}
            className={`${inputClass} cursor-not-allowed opacity-60`}
          />
        </label>
        <button
          type="submit"
          className="mt-1 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_0_0_var(--color-primary-dark)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--color-primary-dark)] active:translate-y-0 active:shadow-none sm:w-auto sm:px-10"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

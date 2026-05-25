"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2, "Bitte Vor- und Nachname"),
  email: z.string().email("Bitte gültige E-Mail"),
  phone: z.string().optional(),
  message: z.string().min(10, "Bitte ein paar Worte"),
});

type FormValues = z.infer<typeof FormSchema>;

export function ContactForm({ propertyName: _propertyName }: { propertyName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (_data: FormValues) => {
    // Demo-Stub: kein Backend, keine echte Übermittlung.
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-[44ch]">
        <h4 className="font-display font-light text-cream-50 text-2xl leading-[1.2] mb-4">
          Wir melden uns persönlich.
        </h4>
        <p className="font-editorial italic text-cream-50/70 text-base leading-[1.55]">
          Ihre Anfrage ist bei uns. Anna meldet sich innerhalb von 24 Stunden.
        </p>
        <p className="mt-10 mono-caption text-cream-50/30 text-[10px] tracking-[0.25em]">
          DEMO · KEINE ECHTE ÜBERMITTLUNG
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-[800px]"
    >
      <div>
        <label className="mono-caption text-cream-200/60 block mb-3">NAME</label>
        <input
          {...register("name")}
          className="w-full bg-transparent border-b border-cream-50/20 pb-3 font-display text-cream-50 text-lg focus:outline-none focus:border-kupfer-500 transition-colors"
        />
        {errors.name && (
          <p className="mt-2 text-kupfer-400 text-xs font-body">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="mono-caption text-cream-200/60 block mb-3">
          E-MAIL
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full bg-transparent border-b border-cream-50/20 pb-3 font-display text-cream-50 text-lg focus:outline-none focus:border-kupfer-500 transition-colors"
        />
        {errors.email && (
          <p className="mt-2 text-kupfer-400 text-xs font-body">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="mono-caption text-cream-200/60 block mb-3">
          TELEFON (OPTIONAL)
        </label>
        <input
          {...register("phone")}
          className="w-full bg-transparent border-b border-cream-50/20 pb-3 font-display text-cream-50 text-lg focus:outline-none focus:border-kupfer-500 transition-colors"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mono-caption text-cream-200/60 block mb-3">
          IHRE NACHRICHT
        </label>
        <textarea
          {...register("message")}
          rows={4}
          className="w-full bg-transparent border-b border-cream-50/20 pb-3 font-display text-cream-50 text-lg focus:outline-none focus:border-kupfer-500 transition-colors resize-none"
        />
        {errors.message && (
          <p className="mt-2 text-kupfer-400 text-xs font-body">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="md:col-span-2 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-baseline gap-3 font-body text-[11px] tracking-[0.25em] uppercase text-cream-50 hover:text-kupfer-400 transition-colors duration-500 disabled:opacity-50"
        >
          <span className="border-b border-cream-50/30 group-hover:border-kupfer-400/60 pb-1 transition-colors duration-500">
            {isSubmitting ? "Wird gesendet..." : "Anfrage senden"}
          </span>
          <span className="transition-transform duration-500 group-hover:translate-x-1">
            ↗
          </span>
        </button>
      </div>
    </form>
  );
}

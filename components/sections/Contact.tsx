"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";

import { portfolioData } from "@/lib/data";

import { Toast, type ToastState } from "../ui/Toast";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateForm(values: FormValues) {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }

  if (!isValidEmail(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.subject.trim().length < 4) {
    errors.subject = "Please enter at least 4 characters.";
  }

  if (values.message.trim().length < 20) {
    errors.message = "Please enter at least 20 characters.";
  }

  return errors;
}

export function Contact() {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const prefersReducedMotion = useReducedMotion();

  const inputClassName =
    "w-full border border-bg-border/80 bg-bg-surface/65 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus-visible:outline-none";

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = event.target.name as keyof FormValues;
    const fieldValue = event.target.value;

    setFormValues((previousValues) => ({
      ...previousValues,
      [fieldName]: fieldValue
    }));

    if (formErrors[fieldName]) {
      setFormErrors((previousErrors) => ({
        ...previousErrors,
        [fieldName]: undefined
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setToast({
        variant: "error",
        title: "Form needs attention",
        message: "Fix the highlighted fields and try again."
      });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formValues)
      });

      const data = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to send your message right now.");
      }

      setFormValues(initialValues);
      setToast({
        variant: "success",
        title: "Message transmitted",
        message: "Thanks for reaching out. I’ll get back to you soon."
      });
    } catch (error) {
      setToast({
        variant: "error",
        title: "Transmission failed",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your message right now."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" data-section className="relative">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="editorial-panel p-6 sm:p-8"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <p className="section-kicker">05 / Contact</p>
            <h2 className="section-title mt-4">{portfolioData.contact.title}</h2>
            <p className="mt-6 max-w-xl text-sm leading-8 text-text-muted sm:text-base">
              {portfolioData.contact.intro}
            </p>

            <div className="mt-10 space-y-4 text-sm text-text-muted">
              <div className="flex items-center gap-3 border border-bg-border/80 bg-bg-void/35 px-4 py-3">
                <Mail size={16} className="text-accent-cyan" />
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="hover:text-accent-cyan"
                  data-cursor="hover"
                >
                  {portfolioData.email}
                </a>
              </div>
              <div className="flex items-center gap-3 border border-bg-border/80 bg-bg-void/35 px-4 py-3">
                <MapPin size={16} className="text-accent-blue" />
                <span>{portfolioData.contact.locationLabel}</span>
              </div>
              <div className="border border-bg-border/80 bg-bg-void/35 px-4 py-4 text-sm leading-7 text-text-muted">
                {portfolioData.contact.availability}
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="editorial-panel space-y-5 p-6 sm:p-8"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: prefersReducedMotion ? 0 : 0.08
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-text-muted">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="Your name"
                  aria-invalid={Boolean(formErrors.name)}
                />
                {formErrors.name ? (
                  <p className="mt-2 text-xs text-red-300">{formErrors.name}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-text-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(formErrors.email)}
                />
                {formErrors.email ? (
                  <p className="mt-2 text-xs text-red-300">{formErrors.email}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block text-sm text-text-muted">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formValues.subject}
                onChange={handleChange}
                className={inputClassName}
                placeholder="What are we building?"
                aria-invalid={Boolean(formErrors.subject)}
              />
              {formErrors.subject ? (
                <p className="mt-2 text-xs text-red-300">{formErrors.subject}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formValues.message}
                onChange={handleChange}
                className={`${inputClassName} resize-none`}
                placeholder="Tell me about the problem, the timeline, and what success looks like."
                aria-invalid={Boolean(formErrors.message)}
              />
              {formErrors.message ? (
                <p className="mt-2 text-xs text-red-300">{formErrors.message}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 border border-accent-cyan/30 bg-accent-cyan px-6 py-3 text-sm font-medium text-bg-void hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              data-cursor="hover"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Transmitting...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}

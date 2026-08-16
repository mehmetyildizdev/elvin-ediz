'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { HomePageData, ServiceData } from '@/sanity/lib/types';
import { defaultHomePage, defaultServices } from '@/sanity/lib/types';

export function Contact({
  homeData = defaultHomePage,
  services = defaultServices,
}: {
  homeData?: HomePageData;
  services?: ServiceData[];
}) {
  return (
    <section
      className="bg-bg-primary text-text-on-dark px-6 py-16 md:px-12 md:py-24"
      id="contact"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="flex flex-col justify-center lg:col-span-5">
          <p className="text-accent mb-4 text-xs font-bold tracking-widest uppercase">
            {homeData.contactEyebrow || 'READY WHEN YOU ARE'}
          </p>
          <h2 className="mb-6 font-serif text-4xl leading-tight text-white sm:text-5xl md:text-5xl whitespace-pre-line">
            {homeData.contactTitleMain || "Let's talk about\nwhat's"}{' '}
            <span className="text-accent font-serif font-normal italic">
              {homeData.contactTitleAccent || 'next.'}
            </span>
          </h2>
          <p className="text-text-on-dark-muted max-w-md text-base leading-relaxed">
            {homeData.contactDescription ||
              'Whether you have a clear plan or are just beginning to explore, reaching out for a free consultation is a good place to start.'}
          </p>
        </div>

        <div className="bg-bg-surface/10 border-border-on-dark rounded-sm border p-6 backdrop-blur-xs sm:p-10 lg:col-span-7">
          <ConsultationForm homeData={homeData} services={services} />
        </div>
      </div>
    </section>
  );
}

export function ConsultationForm({
  homeData = defaultHomePage,
  services = defaultServices,
}: {
  homeData?: HomePageData;
  services?: ServiceData[];
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Derive service dropdown options dynamically from the Services in Sanity
  const serviceList = (services?.length ? services : defaultServices)
    .map((s) => s.title)
    .filter((title): title is string => typeof title === 'string' && title.trim().length > 0);

  const serviceOptions = Array.from(new Set([...serviceList, 'Other']));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    try {
      const data = Object.fromEntries(new FormData(event.currentTarget).entries());
      const endpoint = process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT;
      if (!endpoint) throw new Error('Appointment endpoint is not configured');
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Request failed');
      event.currentTarget.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <label className="text-accent flex flex-col gap-1.5 text-xs font-bold tracking-widest uppercase">
        Your name
        <input
          name="name"
          required
          placeholder="How should we call you?"
          className="border-border-on-dark text-text-on-dark placeholder:text-text-on-dark-muted/50 block w-full rounded-none border-b bg-transparent py-2 font-sans text-sm transition-colors focus:border-accent focus:outline-none"
        />
      </label>

      <label className="text-accent flex flex-col gap-1.5 text-xs font-bold tracking-widest uppercase">
        Email address
        <input
          name="email"
          required
          type="email"
          placeholder="you@example.com"
          className="border-border-on-dark text-text-on-dark placeholder:text-text-on-dark-muted/50 block w-full rounded-none border-b bg-transparent py-2 font-sans text-sm transition-colors focus:border-accent focus:outline-none"
        />
      </label>

      <label className="text-accent flex flex-col gap-1.5 text-xs font-bold tracking-widest uppercase">
        Phone number{' '}
        <small className="text-text-on-dark-muted font-sans font-normal tracking-normal lowercase">
          (optional)
        </small>
        <input
          name="phone"
          type="tel"
          placeholder="Your preferred number"
          className="border-border-on-dark text-text-on-dark placeholder:text-text-on-dark-muted/50 block w-full rounded-none border-b bg-transparent py-2 font-sans text-sm transition-colors focus:border-accent focus:outline-none"
        />
      </label>

      <label className="text-accent flex flex-col gap-1.5 text-xs font-bold tracking-widest uppercase">
        What can we help with?
        <select
          name="service"
          required
          defaultValue=""
          className="border-border-on-dark text-text-on-dark block w-full cursor-pointer rounded-none border-b bg-transparent py-2.5 font-sans text-sm transition-colors focus:border-accent focus:outline-none"
        >
          <option value="" disabled className="bg-bg-primary text-text-on-dark">
            Select a service
          </option>
          {serviceOptions.map((service) => (
            <option
              key={service}
              value={service}
              className="bg-bg-primary text-text-on-dark"
            >
              {service}
            </option>
          ))}
        </select>
      </label>

      <label className="text-accent flex flex-col gap-1.5 text-xs font-bold tracking-widest uppercase">
        Tell us a little more{' '}
        <small className="text-text-on-dark-muted font-sans font-normal tracking-normal lowercase">
          (optional)
        </small>
        <textarea
          name="message"
          rows={3}
          placeholder="What would you like help with?"
          className="border-border-on-dark text-text-on-dark placeholder:text-text-on-dark-muted/50 block min-h-16 w-full resize-y rounded-none border-b bg-transparent py-2 font-sans text-sm transition-colors focus:border-accent focus:outline-none"
        />
      </label>

      <Button
        type="submit"
        variant="primary"
        disabled={status === 'sending'}
        className="mt-3 self-start"
      >
        {status === 'sending'
          ? 'Sending…'
          : homeData.contactSubmitButtonText || 'Free Consultation Request'}
        <span className="font-sans">↗</span>
      </Button>

      {status === 'success' && (
        <p className="text-text-on-dark mt-1 text-sm font-medium">
          Thank you — we&apos;ll be in touch soon.
        </p>
      )}
      {status === 'error' && (
        <p className="text-text-on-dark-muted mt-1 text-sm font-medium">
          Something went wrong. Please email us directly.
        </p>
      )}

      <small className="text-text-on-dark-muted/80 mt-2 text-xs leading-relaxed select-none">
        {homeData.contactDisclaimer ||
          'By submitting, you agree to be contacted by Elvin Ediz Immigration Services.'}
      </small>
    </form>
  );
}


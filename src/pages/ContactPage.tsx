import {AlertCircle, CheckCircle2, Mail, MessageSquare, Send} from 'lucide-react';
import React, {useState} from 'react';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {SeoHead} from '../components/SeoHead';
import {SITE_CONFIG} from '../config/site';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Tool Suggestion');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const hasEndpoint = Boolean(SITE_CONFIG.contactFormEndpoint);
  const hasEmail = Boolean(SITE_CONFIG.contactEmail);

  const validateFields = () => {
    if (name.trim().length < 2) {
      setError('Please enter your name (at least 2 characters).');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (message.trim().length < 10) {
      setError('Please include a brief message (at least 10 characters).');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Silent drop if hidden spam trap is filled
    if (honeypot.trim().length > 0) {
      return;
    }

    if (!validateFields()) return;

    if (!hasEndpoint) {
      setError(
        'Form delivery is not yet connected to a live endpoint. Set VITE_CONTACT_FORM_ENDPOINT in your build environment (e.g., Formspree or Web3Forms) to enable direct submissions.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(SITE_CONFIG.contactFormEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic,
          message: message.trim(),
          _subject: `[ToolNest] ${topic} from ${name.trim()}`,
        }),
      });

      if (!response.ok) {
        let serverMsg = `Submission failed (HTTP ${response.status}).`;
        try {
          const data = (await response.json()) as {
            error?: string;
            errors?: Array<{message?: string}>;
          };
          if (data.error) serverMsg = data.error;
          else if (data.errors?.[0]?.message) serverMsg = data.errors[0].message;
        } catch {
          // Keep default status message
        }
        throw new Error(serverMsg);
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Network error while sending your message. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const mailtoHref = hasEmail
    ? `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(
        `[ToolNest] ${topic}${name.trim() ? ` from ${name.trim()}` : ''}`
      )}&body=${encodeURIComponent(
        `${message.trim()}${email.trim() ? `\n\nReply to: ${email.trim()}` : ''}`
      )}`
    : '';

  return (
    <>
      <SeoHead
        title="Contact Us – ToolNest Free Online Tools"
        description="Contact ToolNest to report a bug, suggest a new online calculator or text tool, or ask a question about privacy and advertising."
        canonicalPath="/contact"
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
        <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: 'Contact Us'}]} />

        <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#1C1B19] sm:text-4xl dark:text-[#F5F2EB]">
          Contact Us
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
          Have a suggestion for a new calculator, spotted an edge case in a formula, or need to
          reach our team regarding partnerships or privacy? Send us a note below.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-5 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
                <Mail className="h-4 w-4 text-[#C2522B] dark:text-[#E06D4B]" aria-hidden="true" />
                <span>Direct Email</span>
              </div>
              {hasEmail ? (
                <>
                  <p className="mt-2 text-xs leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
                    For general support, press, or advertising inquiries:
                  </p>
                  <a
                    href={`mailto:${SITE_CONFIG.contactEmail}`}
                    className="mt-1 inline-block break-all text-sm font-medium text-[#C2522B] hover:underline dark:text-[#E06D4B]"
                  >
                    {SITE_CONFIG.contactEmail}
                  </a>
                </>
              ) : (
                <p className="mt-2 text-xs leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
                  Configure <code className="font-mono">VITE_CONTACT_EMAIL</code> in your site
                  environment to display a direct support email address here.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] p-5 dark:border-[#2E2A26] dark:bg-[#141312]">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#1C1B19] dark:text-[#F5F2EB]">
                <MessageSquare
                  className="h-4 w-4 text-[#C2522B] dark:text-[#E06D4B]"
                  aria-hidden="true"
                />
                <span>Response Window</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#57534E] dark:text-[#B8B2A6]">
                We review tool suggestions, formula corrections, and bug reports within 1–2 business
                days.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50/70 p-6 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                <div className="flex items-center gap-2.5 text-base font-bold text-emerald-900 dark:text-emerald-300">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  <span>Message Sent</span>
                </div>
                <p className="mt-2 text-sm text-emerald-900 dark:text-emerald-200">
                  Thank you, {name}. Your {topic.toLowerCase()} inquiry has been delivered. We will
                  reply to <span className="font-medium">{email}</span> as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="mt-4 min-h-10 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4 rounded-2xl border border-[#E7E2D8] bg-white p-6 dark:border-[#2E2A26] dark:bg-[#1D1B19]"
              >
                {!hasEndpoint && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <div>
                      <strong>Configuration Required:</strong> Live web form delivery requires
                      setting <code className="font-mono">VITE_CONTACT_FORM_ENDPOINT</code> (for
                      example, a free Formspree HTTPS form URL) in your environment configuration.
                      Messages cannot be sent until an endpoint is connected.
                    </div>
                  </div>
                )}

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-rose-300 bg-rose-50 p-3.5 text-xs font-medium text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200"
                  >
                    {error}
                  </div>
                )}

                {/* Honeypot anti-spam field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="c-website">Leave this field empty</label>
                  <input
                    id="c-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="c-name"
                      className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
                    >
                      Your Name
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      maxLength={120}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="c-email"
                      className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
                    >
                      Email Address
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      maxLength={160}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="c-topic"
                    className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
                  >
                    Inquiry Type
                  </label>
                  <select
                    id="c-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[#D6CFC2] bg-white px-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
                  >
                    <option value="Tool Suggestion">Suggest a New Tool</option>
                    <option value="Bug Report">Report a Calculation or UI Bug</option>
                    <option value="Advertising Inquiry">Advertising / Partnership</option>
                    <option value="Privacy Question">Privacy &amp; Data Question</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="c-msg"
                    className="mb-1.5 block text-xs font-semibold text-[#57534E] dark:text-[#B8B2A6]"
                  >
                    Message
                  </label>
                  <textarea
                    id="c-msg"
                    rows={5}
                    required
                    maxLength={4000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your request or feedback..."
                    className="w-full rounded-xl border border-[#D6CFC2] bg-white p-3.5 text-sm text-[#1C1B19] focus:border-[#C2522B] focus:outline-none dark:border-[#3A3530] dark:bg-[#141312] dark:text-[#F5F2EB]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#C2522B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#A6411E] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>

                  {hasEmail && (
                    <a
                      href={mailtoHref}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#E7E2D8] bg-[#FAF8F4] px-4 py-2.5 text-sm font-medium text-[#1C1B19] hover:border-[#C2522B]/50 dark:border-[#2E2A26] dark:bg-[#141312] dark:text-[#F5F2EB]"
                    >
                      <Mail className="h-4 w-4 text-[#C2522B]" aria-hidden="true" />
                      Open Email Draft
                    </a>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

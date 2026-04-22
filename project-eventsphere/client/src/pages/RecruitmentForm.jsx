import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const DOMAIN_OPTIONS = [
  "Marketing and Sponsorship",
  "Media (Photographer / Videographer / Video Editor)",
  "Content Writing",
  "Public Relations",
  "Technical",
  "Graphic Designing",
  "Public Speaking",
  "Human Resource",
  "Research and Development",
  "Fine Arts",
  "Event Management",
  "Influencers",
  "Models",
];

const HOSTEL_OPTIONS = [
  "Apartment",
  "GH-1",
  "GH-2",
  "GH-3",
  "GH-4",
  "GH-5",
  "GH-6",
  "GH-7",
  "GH-8",
  "GH-9",
  "BH-1",
  "BH-2",
  "BH-3",
  "BH-4",
  "BH-5",
  "BH-6",
  "BH-7",
  "BH-8",
  "BH-9",
  "BH-10",
];

const inputBase =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/35 outline-none transition focus:border-white/25 focus:bg-white/10";
const labelBase = "text-sm text-white/70";
const errorBase = "mt-2 text-xs text-red-300";

const sectionAnim = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06 },
  }),
};

function Pill({ children }) {
  return (
    <span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70'>
      { children }
    </span>
  );
}

function ProgressBar({ value }) {
  return (
    <div className='h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/5'>
      <div
        className='h-full rounded-full bg-white/70 transition-all duration-300'
        style={ { width: `${value}%` } }
      />
    </div>
  );
}

function Rating({ value, onChange, error }) {
  return (
    <div>
      <div className='flex items-center justify-between gap-4'>
        <label className={ labelBase }>
          Rate your skill on the chosen domain{ " " }
          <span className='text-red-300'>*</span>
        </label>
        <Pill>{ value ? `${value}/5` : "Not selected" }</Pill>
      </div>

      <div className='mt-3 grid grid-cols-5 gap-2'>
        { [1, 2, 3, 4, 5].map((n) => {
          const active = n <= (value || 0);
          return (
            <button
              key={ n }
              type='button'
              onClick={ () => onChange(n) }
              className={ [
                "group flex h-12 items-center justify-center rounded-2xl border text-sm font-semibold transition active:scale-[0.98]",
                active
                  ? "border-white/30 bg-white/15 text-white"
                  : "border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:bg-white/10",
              ].join(" ") }
              aria-label={ `Set rating ${n}` }
            >
              <span className={ active ? "opacity-100" : "opacity-70" }>★</span>
              <span className='ml-1'>{ n }</span>
            </button>
          );
        }) }
      </div>

      { error ? <p className={ errorBase }>{ error }</p> : null }
    </div>
  );
}

function RadioGroup({ label, value, onChange, options = [], error }) {
  return (
    <div>
      <label className={ labelBase }>
        { label } <span className='text-red-300'>*</span>
      </label>

      <div className='mt-3 grid gap-2 sm:grid-cols-3'>
        { options.map((opt) => {
          const checked = value === opt.value;
          return (
            <button
              key={ opt.value }
              type='button'
              onClick={ () => onChange(opt.value) }
              className={ [
                "flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition active:scale-[0.99]",
                checked
                  ? "border-white/30 bg-white/15"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
              ].join(" ") }
            >
              <span className='text-sm text-white/80'>{ opt.label }</span>
              <span
                className={ [
                  "h-4 w-4 rounded-full border transition",
                  checked
                    ? "border-white bg-white"
                    : "border-white/30 bg-transparent",
                ].join(" ") }
              />
            </button>
          );
        }) }
      </div>

      { error ? <p className={ errorBase }>{ error }</p> : null }
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
      <p className='text-xs text-white/55'>{ title }</p>
      <p className='mt-1 text-sm font-semibold text-white/90'>{ value }</p>
    </div>
  );
}

const initialForm = {
  name: "",
  regNo: "",
  email: "",
  contact: "",
  gender: "",
  course: "",
  accommodation: "",
  hostel: "",
  domain: "",
  rating: 0,
  experience: "",
  org: "",
};

export default function RecruitmentForm() {
  const domainOptions = useMemo(() => DOMAIN_OPTIONS, []);
  const hostelOptions = useMemo(() => HOSTEL_OPTIONS, []);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedAt, setSubmittedAt] = useState("");

  const setField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const requiredKeys = [
    "name",
    "regNo",
    "email",
    "contact",
    "gender",
    "course",
    "accommodation",
    "domain",
    "org",
    "experience",
  ];

  const completion = (() => {
    let total = requiredKeys.length + 1;
    let done = 0;

    requiredKeys.forEach((k) => {
      if (String(form[k] || "").trim()) done += 1;
    });

    if (form.rating) done += 1;

    if (form.accommodation === "Hosteller") {
      total += 1;
      if (String(form.hostel || "").trim()) done += 1;
    }

    return Math.round((done / total) * 100);
  })();

  const validate = () => {
    const next = {};

    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.regNo.trim()) next.regNo = "Registration number is required.";

    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email.";

    if (!form.contact.trim()) next.contact = "Contact number is required.";
    else if (!/^\d{10}$/.test(form.contact.replace(/\s/g, ""))) {
      next.contact = "Enter a valid 10-digit contact number.";
    }

    if (!form.gender) next.gender = "Select a gender.";
    if (!form.course.trim()) next.course = "Course is required.";

    if (!form.accommodation) next.accommodation = "Select accommodation type.";
    if (form.accommodation === "Hosteller" && !form.hostel)
      next.hostel = "Select hostel.";

    if (!form.domain) next.domain = "Select a domain.";
    if (!form.rating) next.rating = "Please rate your skill (1–5).";
    if (!form.experience) next.experience = "Select yes/no.";
    if (!form.org.trim())
      next.org = "This field is required (write N.A if none).";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);

    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/recruitment/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            regNo: form.regNo,
            email: form.email,
            contact: form.contact,
            gender: form.gender,
            course: form.course,
            accommodation: form.accommodation,
            hostel: form.accommodation === "Hosteller" ? form.hostel : "",
            domain: form.domain,
            rating: form.rating,
            experience: form.experience,
            org: form.org,
            submittedAt: new Date()
              .toLocaleString("en-CA", {
                timeZone: "Asia/Kolkata",
                hour12: false,
              })
              .replace(",", ""),
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || "Submission failed");
      }

      const now = new Date().toLocaleString();
      setSubmittedAt(now);
      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='min-h-[calc(100vh-1px)] bg-black text-white'>
      <div className='pointer-events-none fixed inset-0 overflow-hidden'>
        <div className='absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl' />
        <div className='absolute top-40 -right-24 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl' />
        <div className='absolute -bottom-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl' />
      </div>

      <main className='relative mx-auto w-[95vw] max-w-5xl pt-10 pb-16'>
        <motion.div
          variants={ sectionAnim }
          initial='hidden'
          animate='show'
          className='rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10'
        >
          <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
            <div>
              <p className='text-xs text-white/60'>We are hiring!</p>
              <h1 className='mt-1 text-2xl md:text-3xl font-semibold tracking-tight'>
                Step Up with Student Organization{ " " }
                <span className='text-white/80'>VIBRANTA</span>
              </h1>
              <p className='mt-3 max-w-2xl text-sm leading-relaxed text-white/60'>
                Join us to create events, build communities and grow your
                skills. Fill this form carefully — we’ll reach out if you’re
                shortlisted.
              </p>

              <div className='mt-4 flex flex-wrap gap-2'>
                <Pill>Single-page friendly</Pill>
                <Pill>Modern UI</Pill>
                <Pill>Scalable for backend</Pill>
              </div>
            </div>

            <div className='mt-6 grid w-full gap-3 md:mt-0 md:w-[360px]'>
              <StatCard title='Completion' value={ `${completion}%` } />
              <ProgressBar value={ completion } />
              <p className='text-xs text-white/45'>
                Tip: Complete required fields to enable smooth submission.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={ sectionAnim }
          initial='hidden'
          animate='show'
          custom={ 3 }
          className='mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10'
        >
          <form onSubmit={ handleSubmit } className='space-y-7'>
            <div className='grid gap-5 md:grid-cols-2'>
              <div>
                <label className={ labelBase }>
                  Name <span className='text-red-300'>*</span>
                </label>
                <input
                  className={ inputBase }
                  value={ form.name }
                  onChange={ (e) => setField("name", e.target.value) }
                  placeholder='Your full name'
                />
                { errors.name ? (
                  <p className={ errorBase }>{ errors.name }</p>
                ) : null }
              </div>

              <div>
                <label className={ labelBase }>
                  Registration Number <span className='text-red-300'>*</span>
                </label>
                <input
                  className={ inputBase }
                  value={ form.regNo }
                  onChange={ (e) => setField("regNo", e.target.value) }
                  placeholder='e.g., 23CSE123'
                />
                { errors.regNo ? (
                  <p className={ errorBase }>{ errors.regNo }</p>
                ) : null }
              </div>
            </div>

            <div className='grid gap-5 md:grid-cols-2'>
              <div>
                <label className={ labelBase }>
                  Email Id <span className='text-red-300'>*</span>
                </label>
                <input
                  className={ inputBase }
                  value={ form.email }
                  onChange={ (e) => setField("email", e.target.value) }
                  placeholder='you@example.com'
                />
                { errors.email ? (
                  <p className={ errorBase }>{ errors.email }</p>
                ) : null }
              </div>

              <div>
                <label className={ labelBase }>
                  Contact Number <span className='text-red-300'>*</span>
                </label>
                <input
                  className={ inputBase }
                  value={ form.contact }
                  onChange={ (e) => setField("contact", e.target.value) }
                  placeholder='10-digit number'
                  inputMode='numeric'
                />
                { errors.contact ? (
                  <p className={ errorBase }>{ errors.contact }</p>
                ) : null }
              </div>
            </div>

            <RadioGroup
              label='Gender'
              value={ form.gender }
              onChange={ (v) => setField("gender", v) }
              error={ errors.gender }
              options={ [
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Chakka", value: "Chakka" },
              ] }
            />

            <div>
              <label className={ labelBase }>
                Course you are enrolled in (Example: BTech, CSE, BBA, etc.){ " " }
                <span className='text-red-300'>*</span>
              </label>
              <input
                className={ inputBase }
                value={ form.course }
                onChange={ (e) => setField("course", e.target.value) }
                placeholder='e.g., BTech CSE'
              />
              { errors.course ? (
                <p className={ errorBase }>{ errors.course }</p>
              ) : null }
            </div>

            <RadioGroup
              label='Type of Accommodation'
              value={ form.accommodation }
              onChange={ (v) => {
                setField("accommodation", v);
                if (v !== "Hosteller") setField("hostel", "");
              } }
              error={ errors.accommodation }
              options={ [
                { label: "Hosteller", value: "Hosteller" },
                { label: "Day Scholar", value: "Day Scholar" },
              ] }
            />

            { form.accommodation === "Hosteller" && (
              <div>
                <label className={ labelBase }>
                  If it's Hosteller, which hostel is it?{ " " }
                  <span className='text-red-300'>*</span>
                </label>
                <select
                  className={ inputBase }
                  value={ form.hostel }
                  onChange={ (e) => setField("hostel", e.target.value) }
                >
                  <option value='' className='bg-black'>
                    Choose
                  </option>
                  { hostelOptions.map((h) => (
                    <option key={ h } value={ h } className='bg-black'>
                      { h }
                    </option>
                  )) }
                </select>
                { errors.hostel ? (
                  <p className={ errorBase }>{ errors.hostel }</p>
                ) : null }
              </div>
            ) }

            <div>
              <label className={ labelBase }>
                Domain you are interested in{ " " }
                <span className='text-red-300'>*</span>
              </label>
              <select
                className={ inputBase }
                value={ form.domain }
                onChange={ (e) => setField("domain", e.target.value) }
              >
                <option value='' className='bg-black'>
                  Select Domain
                </option>
                { domainOptions.map((d) => (
                  <option key={ d } value={ d } className='bg-black'>
                    { d }
                  </option>
                )) }
              </select>
              { errors.domain ? (
                <p className={ errorBase }>{ errors.domain }</p>
              ) : null }
            </div>

            <Rating
              value={ form.rating }
              onChange={ (n) => setField("rating", n) }
              error={ errors.rating }
            />

            <RadioGroup
              label='Do you have any previous experience?'
              value={ form.experience }
              onChange={ (v) => setField("experience", v) }
              error={ errors.experience }
              options={ [
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ] }
            />

            <div>
              <label className={ labelBase }>
                Are you a part of any other organization? If yes, mention the
                name else write N.A. <span className='text-red-300'>*</span>
              </label>
              <input
                className={ inputBase }
                value={ form.org }
                onChange={ (e) => setField("org", e.target.value) }
                placeholder='e.g., Coding Club / N.A.'
              />
              { errors.org ? <p className={ errorBase }>{ errors.org }</p> : null }
            </div>

            <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
              <p className='text-xs text-white/45'>
                Don’t share passwords. This form is only for recruitment
                communication.
              </p>

              <button
                type='submit'
                disabled={ submitting }
                className={ [
                  "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold transition active:scale-[0.99]",
                  submitting
                    ? "cursor-not-allowed bg-white/30 text-black/70"
                    : "bg-white text-black hover:opacity-90",
                ].join(" ") }
              >
                { submitting ? "Submitting..." : "Submit" }
              </button>
            </div>

            { submitted && (
              <div className='rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4'>
                <p className='font-semibold text-emerald-100'>
                  ✅ Submitted successfully!
                </p>
                <p className='mt-1 text-sm text-emerald-100/80'>
                  Submission time:{ " " }
                  <span className='font-semibold'>{ submittedAt }</span>
                </p>
              </div>
            ) }
          </form>
        </motion.div>
      </main>
    </div>
  );
}

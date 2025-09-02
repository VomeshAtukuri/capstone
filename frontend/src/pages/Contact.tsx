import type React from "react"
import { useState } from "react"

export default function ContactUsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submit
    setSubmitted(true)
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-gray-900">Contact Us</h1>
      <p className="mt-3 leading-7 text-gray-600">
        Send us a message and we’ll get back to you. This is a demo form—no backend required.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4">
        <label className="grid gap-1">
          <span className="text-sm font-medium text-gray-800">Name</span>
          <input
            className="h-10 rounded-md border border-gray-300 px-3 outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Jane Doe"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-gray-800">Email</span>
          <input
            type="email"
            className="h-10 rounded-md border border-gray-300 px-3 outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="jane@example.com"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-gray-800">Message</span>
          <textarea
            className="min-h-[120px] rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="How can we help?"
          />
        </label>

        <button
          type="submit"
          className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
        >
          Send Message
        </button>

        {submitted && <p className="text-green-600">Thanks! Your message has been sent (mock).</p>}
      </form>
    </main>
  )
}

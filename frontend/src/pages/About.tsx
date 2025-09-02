import { Link } from "react-router-dom";

export default function AboutUsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <section className="mb-10 rounded-xl border border-gray-200 bg-gray-50 p-6 md:p-8">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-gray-900">
              Built for a better shopping experience
            </h1>
            <p className="mt-3 leading-7 text-gray-600">
              We craft fast, accessible interfaces so customers can find what they love—without friction.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Shop products
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <img
                src="https://media.istockphoto.com/id/1405760376/vector/online-shopping-design-graphic-elements-signs-symbols-mobile-marketing-and-digital-marketing.jpg?s=612x612&w=0&k=20&c=2DSpkY9ktsAfzBOcZUMkZThW3B6kvGYG1cHQ3yeaPJg="
                alt="Illustration of an e‑commerce storefront UI"
                className="h-40 w-full object-cover md:h-48 md:w-[480px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-gray-900">About Us</h1>
        <p className="mt-3 leading-7 text-gray-600">
          We’re a small team focused on building a clean, accessible e‑commerce experience. This demo uses mock data and
          client-side state to showcase the full UI and flow—from browsing products to checking out—without any backend.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-medium text-gray-900">Our Mission</h2>
          <p className="mt-2 text-gray-600">Make shopping simple, fast, and delightful for everyone.</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-medium text-gray-900">Principles</h2>
          <ul className="mt-2 list-disc pl-5 text-gray-600">
            <li>Clarity over complexity</li>
            <li>Accessibility-first</li>
            <li>Performance and simplicity</li>
          </ul>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-medium text-gray-900">Contact</h2>
          <p className="mt-2 text-gray-600">
            Have feedback?{" "}
            <Link to ="/contact-us" className="text-blue-600 hover:underline">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-2 gap-4 rounded-xl border border-gray-200 bg-white p-6 md:grid-cols-4">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900">1k+</div>
          <div className="mt-1 text-sm text-gray-600">Products</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900">4.8/5</div>
          <div className="mt-1 text-sm text-gray-600">Avg. Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900">50+</div>
          <div className="mt-1 text-sm text-gray-600">Brands</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900">24/7</div>
          <div className="mt-1 text-sm text-gray-600">Support</div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-medium text-gray-900">Our Story</h2>
        <ol className="mt-4 space-y-6 border-l border-gray-200 pl-6">
          <li className="relative">
            <span className="absolute -left-[9px] top-1.5 h-3 w-3 rounded-full border border-white bg-blue-600" />
            <div>
              <p className="font-medium text-gray-900">2023 – Prototype</p>
              <p className="mt-1 text-gray-600">
                Started as a design exercise to rethink the buying experience—simple, accessible, and fast.
              </p>
            </div>
          </li>
          <li className="relative">
            <span className="absolute -left-[9px] top-1.5 h-3 w-3 rounded-full border border-white bg-blue-600" />
            <div>
              <p className="font-medium text-gray-900">2024 – Full UI flows</p>
              <p className="mt-1 text-gray-600">
                Added end‑to‑end mock flows: browse products, cart, checkout, orders, and an admin dashboard.
              </p>
            </div>
          </li>
          <li className="relative">
            <span className="absolute -left-[9px] top-1.5 h-3 w-3 rounded-full border border-white bg-emerald-600" />
            <div>
              <p className="font-medium text-gray-900">Today – Iterating</p>
              <p className="mt-1 text-gray-600">
                Continually refining usability, accessibility, and performance while keeping the UI approachable.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="mt-12 rounded-xl border border-blue-200 bg-blue-50 p-6 md:flex md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h3 className="text-pretty text-xl font-semibold text-gray-900">Ready to explore the experience?</h3>
          <p className="mt-2 text-gray-700">Browse our products or reach out—your feedback helps us improve.</p>
        </div>
        <div className="mt-4 flex gap-3 md:mt-0">
          <Link
            to="/products"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Explore products
          </Link>
          <Link
            to="/contact-us"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  )
}

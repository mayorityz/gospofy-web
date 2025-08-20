import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-[100px]">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">GOSPOFY PRIVACY POLICY</h1>
              <p className="text-gray-600">
                <strong>Effective Date:</strong> 18th Aug 2025
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Gospofy ("we," "our," or "us") values your trust. This Privacy Policy explains how
                we collect, use, store, and protect your information when you use the Gospofy mobile
                application and related services (the "App").
              </p>
            </div>

            {/* Section 1: Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 mb-4">
                We collect the following categories of information to provide and improve our
                services:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    a. Personal Information You Provide
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Account details (name, username, email address, password)</li>
                    <li>
                      Profile information (photo, bio, favorite artists, pastors, or ministries you
                      follow)
                    </li>
                    <li>
                      Payment and billing details (for subscriptions, donations, and purchases)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    b. Automatically Collected Information
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Device information (model, operating system, unique identifiers)</li>
                    <li>
                      App usage data (playlists created, sermons listened to, playback history,
                      bookmarks)
                    </li>
                    <li>Log data (IP address, browser type, session duration, crash reports)</li>
                    <li>
                      Location data (if enabled, to suggest localized content like nearby events or
                      concerts)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    c. User-Generated Content
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Uploaded podcasts, sermons, or music (if you are a creator)</li>
                    <li>Comments, likes, or other interactions with content</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4">We use collected data to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Deliver core features (streaming, downloads, playback, lyrics, bookmarks)</li>
                <li>Personalize your experience (recommendations, playlists, episode tracking)</li>
                <li>
                  Enable community features (follow/unfollow artists, pastors, and other users)
                </li>
                <li>Support monetization (subscriptions, in-app purchases, creator payouts)</li>
                <li>Improve performance and security of the App</li>
                <li>
                  Send updates, promotional offers, and relevant Gospel news (opt-in required)
                </li>
              </ul>
            </section>

            {/* Section 3: How We Share Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. How We Share Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We do not sell your personal information. However, we may share information with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Service Providers (payment processors, hosting services, analytics tools)</li>
                <li>
                  Content Partners (artists, pastors, labels, and podcast creators for royalty
                  reporting)
                </li>
                <li>
                  Legal Authorities (only if required by law, court order, or to protect rights)
                </li>
                <li>
                  Community Features (profile name, image, and follows may be visible to other
                  users)
                </li>
              </ul>
            </section>

            {/* Section 4: Data Storage & Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Data Storage & Security
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Your information is stored securely using encryption, firewalls, and access
                  controls
                </li>
                <li>Downloads for offline listening are stored in encrypted form</li>
                <li>Passwords are hashed and never stored in plain text</li>
                <li>We take reasonable steps to protect your data, but no method is 100% secure</li>
              </ul>
            </section>

            {/* Section 5: Your Privacy Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                <li>Access, correct, or delete your personal information</li>
                <li>Restrict or object to certain data processing</li>
                <li>Export your data in a portable format</li>
                <li>Withdraw consent for marketing communications at any time</li>
              </ul>
              <p className="text-gray-700">
                To exercise these rights, contact us at:{" "}
                <a href="mailto:contact@gospofy.com" className="text-blue-600 hover:underline">
                  contact@gospofy.com
                </a>
              </p>
            </section>

            {/* Section 6: Monetization & Payments */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Monetization & Payments
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>We collect payment details when you subscribe or donate</li>
                <li>
                  Transactions are processed securely via third-party providers (e.g., Stripe,
                  PayPal)
                </li>
                <li>We do not store full credit card details</li>
              </ul>
            </section>

            {/* Section 7: Cookies & Tracking Technologies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Cookies & Tracking Technologies
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  We may use cookies, pixels, and analytics tools to understand how you use the App
                </li>
                <li>
                  These help us improve recommendations, measure performance, and serve relevant
                  promotions
                </li>
              </ul>
            </section>

            {/* Section 8: Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Gospofy is not intended for children under 13 (or the minimum legal age in your
                  country)
                </li>
                <li>We do not knowingly collect data from minors without parental consent</li>
              </ul>
            </section>

            {/* Section 9: International Data Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. International Data Transfers
              </h2>
              <p className="text-gray-700">
                If you access Gospofy from outside Nigeria, your information may be transferred and
                processed in other jurisdictions with different data protection laws.
              </p>
            </section>

            {/* Section 10: Changes to This Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Changes to This Policy
              </h2>
              <p className="text-gray-700">
                We may update this Privacy Policy to reflect changes in our practices. If
                significant changes occur, we will notify users through the App or by email.
              </p>
            </section>

            {/* Section 11: Contact Us */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, contact us at:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium text-gray-800">Gospofy Support Team</p>
                <p className="text-gray-700">
                  Email:{" "}
                  <a href="mailto:info@gospofy.com" className="text-blue-600 hover:underline">
                    info@gospofy.com
                  </a>
                </p>
                <p className="text-gray-700">
                  Address: 2, Debo Aina Close Omole Phase 1, Lagos, Nigeria
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

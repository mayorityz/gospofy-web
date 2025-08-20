import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-[100px]">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                GOSPOFY TERMS AND CONDITIONS
              </h1>
              <div className="text-gray-600 space-y-1">
                <p>
                  <strong>Effective Date:</strong> 18th Aug 2025
                </p>
                <p>
                  <strong>Last Updated:</strong> 18th Aug 2025
                </p>
              </div>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Welcome to Gospofy, a gospel-focused streaming platform for music, podcasts, and
                sermons. These Terms and Conditions ("Terms") govern your use of the Gospofy mobile
                application, website, and related services (collectively, the "Service"). By using
                Gospofy, you agree to these Terms. Please read them carefully.
              </p>
            </div>

            {/* Section 1: Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Eligibility</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  You must be at least 13 years old (or the age of digital consent in your country)
                  to use Gospofy
                </li>
                <li>If you are under 18, you must have parental/guardian permission</li>
              </ul>
            </section>

            {/* Section 2: Account Registration */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Account Registration</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>To access certain features, you may need to create an account</li>
                <li>
                  You are responsible for maintaining the confidentiality of your login credentials
                </li>
                <li>You must provide accurate and complete information when registering</li>
              </ul>
            </section>

            {/* Section 3: Content and Usage */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Content and Usage</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Gospofy provides access to gospel music, podcasts, sermons, and news. Content is
                  provided by artists, pastors, creators, and other third parties.
                </p>
                <div>
                  <p className="text-gray-700 mb-2">You may not:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Copy, reproduce, or distribute content without permission</li>
                    <li>Use Gospofy for unlawful, harmful, or abusive purposes</li>
                    <li>
                      Upload or distribute content that infringes on copyright or intellectual
                      property rights
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: User-Generated Content */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. User-Generated Content
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Creators can upload podcasts, sermons, and other content</li>
                <li>
                  By uploading, you grant Gospofy a non-exclusive, worldwide, royalty-free license
                  to host, stream, promote, and distribute your content
                </li>
                <li>You remain the copyright owner of your content</li>
                <li>
                  Gospofy reserves the right to remove content that violates these Terms or
                  applicable laws
                </li>
              </ul>
            </section>

            {/* Section 5: Monetization and Payments */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Monetization and Payments
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Gospofy may provide monetization options (subscriptions, ads, donations, creator
                  payouts)
                </li>
                <li>
                  Payment terms will be outlined in creator agreements and subscription policies
                </li>
                <li>Gospofy is not responsible for external payment processing issues</li>
              </ul>
            </section>

            {/* Section 6: Subscriptions and Billing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Subscriptions and Billing
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Some features require a paid subscription</li>
                <li>
                  Fees, renewal dates, and billing cycles will be clearly displayed before purchase
                </li>
                <li>Subscriptions automatically renew unless canceled before the renewal date</li>
                <li>No refunds will be issued except where required by law</li>
              </ul>
            </section>

            {/* Section 7: Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Intellectual Property
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>All trademarks, logos, designs, and software belong to Gospofy</li>
                <li>Users may not reverse-engineer, copy, or modify the platform</li>
                <li>Respect the intellectual property rights of artists, pastors, and creators</li>
              </ul>
            </section>

            {/* Section 8: Offline Use and Restrictions */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Offline Use and Restrictions
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  You may download content for offline listening, subject to subscription level
                </li>
                <li>Offline downloads are for personal use only and may not be shared</li>
                <li>
                  Some features (lyrics, quality settings, episode tracking) may require internet
                  access
                </li>
              </ul>
            </section>

            {/* Section 9: Termination of Account */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Termination of Account
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Gospofy may suspend or terminate accounts that violate these Terms</li>
                <li>Users may delete their accounts at any time through account settings</li>
              </ul>
            </section>

            {/* Section 10: Disclaimers */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Disclaimers</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Gospofy provides content "as is" without warranties of accuracy, completeness, or
                  availability
                </li>
                <li>We do not guarantee uninterrupted or error-free service</li>
                <li>
                  Gospofy is not responsible for user reliance on sermons, news, or teachings for
                  personal, financial, or spiritual decisions
                </li>
              </ul>
            </section>

            {/* Section 11: Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Limitation of Liability
              </h2>
              <p className="text-gray-700 mb-2">
                To the fullest extent permitted by law, Gospofy is not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Loss of data or content</li>
                <li>Unauthorized account access</li>
                <li>Issues arising from third-party services (e.g., payment providers)</li>
              </ul>
            </section>

            {/* Section 12: Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Gospofy may update these Terms at any time</li>
                <li>Users will be notified of material changes through the app or email</li>
                <li>Continued use of the platform constitutes acceptance of updated Terms</li>
              </ul>
            </section>

            {/* Section 13: Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  These Terms are governed by the universal laws of the United States of America
                </li>
                <li>Any disputes will be resolved in the courts</li>
              </ul>
            </section>

            {/* Section 14: Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 mb-4">For questions, concerns, or legal inquiries:</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium text-gray-800">Gospofy Support Team</p>
                <p className="text-gray-700">
                  Email:{" "}
                  <a href="mailto:info@gospofy.com" className="text-blue-600 hover:underline">
                    info@gospofy.com
                  </a>
                </p>
                <p className="text-gray-700">
                  Phone:{" "}
                  <a href="tel:+2348121654760" className="text-blue-600 hover:underline">
                    +234 812 165 4760
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

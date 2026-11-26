// components/TermsOfService.jsx
import React, { useEffect } from 'react';
import './PrivacyPolicy.css'; // Reuse same styles

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-header">
        <div className="policy-header-content">
          <span className="policy-badge">Legal</span>
          <h1>Terms of Service</h1>
          <p className="policy-subtitle">
            Please read these terms carefully before using our website or making a donation.
          </p>
          <p className="policy-effective">
            <strong>Effective Date:</strong> November 26, 2024 &nbsp;|&nbsp;
            <strong>Last Updated:</strong> November 26, 2024
          </p>
        </div>
      </div>

      <div className="policy-container">
        <div className="policy-toc">
          <h3>Contents</h3>
          <ul>
            <li><a href="#acceptance">1. Acceptance of Terms</a></li>
            <li><a href="#about-us">2. About Speed Trust</a></li>
            <li><a href="#donations">3. Donations &amp; Payments</a></li>
            <li><a href="#tax-benefits">4. Tax Benefits (80G)</a></li>
            <li><a href="#refund-policy">5. Refund Policy</a></li>
            <li><a href="#use-of-site">6. Use of This Website</a></li>
            <li><a href="#intellectual-property">7. Intellectual Property</a></li>
            <li><a href="#third-party">8. Third-Party Links &amp; Services</a></li>
            <li><a href="#disclaimer">9. Disclaimer of Warranties</a></li>
            <li><a href="#liability">10. Limitation of Liability</a></li>
            <li><a href="#governing-law">11. Governing Law</a></li>
            <li><a href="#changes">12. Changes to These Terms</a></li>
            <li><a href="#contact">13. Contact Us</a></li>
          </ul>
        </div>

        <div className="policy-content">

          <section id="acceptance">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Speed Trust website (speedtrust.org) or making a donation
              through it, you agree to be bound by these Terms of Service ("Terms") and our
              Privacy Policy. If you do not agree with any part of these Terms, please do not use
              our website or submit any donation.
            </p>
            <p>
              These Terms apply to all visitors, donors, volunteers, and other users of the website.
            </p>
          </section>

          <section id="about-us">
            <h2>2. About Speed Trust</h2>
            <p>
              Speed Trust is a registered charitable trust under the Indian Trusts Act, operating
              since 2008. Our mission is to provide shelter, food, education, and care for orphaned,
              abandoned, and underprivileged children. We are:
            </p>
            <ul>
              <li>Registered as a Trust under the laws of Tamil Nadu, India.</li>
              <li>Certified under Section 80G of the Income Tax Act, 1961, making donations eligible for tax deduction.</li>
              <li>Headquartered at Ka.Mamananthal Village, Kallakurichi, Tamil Nadu – 606202.</li>
            </ul>
          </section>

          <section id="donations">
            <h2>3. Donations &amp; Payments</h2>

            <h3>3.1 Voluntary Nature</h3>
            <p>
              All donations made through this website are voluntary and non-compulsory. By donating,
              you confirm that you are making a free-will contribution to Speed Trust's charitable
              programs.
            </p>

            <h3>3.2 Payment Processing</h3>
            <p>
              Online donations are processed securely through <strong>Razorpay</strong>, a
              PCI-DSS Level 1 certified payment gateway. Speed Trust does not store your card,
              UPI, or net-banking credentials. By proceeding with payment, you also agree to
              Razorpay's Terms of Service.
            </p>

            <h3>3.3 Accepted Donation Types</h3>
            <ul>
              <li><strong>One-Time Donation:</strong> A single contribution of any amount.</li>
              <li><strong>Monthly Donation:</strong> A recurring monthly contribution (processed each month on the same date).</li>
              <li><strong>Yearly Donation:</strong> An annual recurring contribution.</li>
            </ul>

            <h3>3.4 Minimum Donation</h3>
            <p>
              The minimum donation amount accepted online is <strong>₹1</strong>. There is no
              maximum limit. All amounts are in Indian Rupees (INR) unless otherwise specified.
            </p>

            <h3>3.5 Use of Funds</h3>
            <p>
              Donated funds are used to support Speed Trust's core programs including but not
              limited to: child nutrition, education, healthcare, infrastructure, and community
              outreach. Speed Trust maintains transparent financial records and publishes expense
              details on this website.
            </p>
          </section>

          <section id="tax-benefits">
            <h2>4. Tax Benefits (80G)</h2>
            <p>
              Donations made to Speed Trust are eligible for income tax deductions under
              <strong> Section 80G of the Income Tax Act, 1961</strong>.
            </p>
            <ul>
              <li>An 80G tax receipt will be emailed to you after a successful donation.</li>
              <li>The receipt will include your name, PAN (if provided), donation amount, date, and our trust's 80G registration number.</li>
              <li>It is your responsibility to provide accurate details (including your name as it appears on PAN) for a valid receipt.</li>
              <li>Speed Trust cannot guarantee specific tax outcomes. We recommend consulting your tax advisor for guidance on claiming deductions.</li>
            </ul>
            <div className="policy-highlight">
              <strong>Note for Foreign Donors:</strong> Donations from outside India may be subject
              to FCRA (Foreign Contribution Regulation Act) regulations. Please contact us before
              donating from abroad to ensure compliance.
            </div>
          </section>

          <section id="refund-policy">
            <h2>5. Refund Policy</h2>
            <p>
              Donations to Speed Trust are generally <strong>non-refundable</strong>, as funds are
              typically deployed immediately into ongoing charitable programs. However, we understand
              that mistakes can occur.
            </p>

            <h3>5.1 When Refunds May Be Considered</h3>
            <ul>
              <li>Duplicate payment for the same donation (technical error).</li>
              <li>Incorrect amount charged due to a website or payment gateway error.</li>
              <li>Unauthorised transaction (reported within 7 days with supporting evidence).</li>
            </ul>

            <h3>5.2 Refund Process</h3>
            <ul>
              <li>Email us at <a href="mailto:speedtrustofficial@gmail.com">speedtrustofficial@gmail.com</a> with your donation reference ID, amount, and reason for the request.</li>
              <li>Refund requests must be made within <strong>7 days</strong> of the transaction date.</li>
              <li>Approved refunds will be processed to the original payment method within <strong>7–14 business days</strong>.</li>
              <li>Refunds for 80G-eligible donations may require cancellation of the tax receipt.</li>
            </ul>

            <h3>5.3 Recurring Donations</h3>
            <p>
              To cancel a recurring (monthly/yearly) donation mandate, email us at least
              <strong> 5 business days</strong> before the next scheduled debit. We will
              cancel the mandate and no further amounts will be deducted.
            </p>
          </section>

          <section id="use-of-site">
            <h2>6. Use of This Website</h2>
            <p>By using this website, you agree <strong>not</strong> to:</p>
            <ul>
              <li>Use the website for any unlawful purpose or in violation of these Terms.</li>
              <li>Attempt to gain unauthorised access to any part of the website or its backend systems.</li>
              <li>Transmit any harmful, offensive, or malicious code or content.</li>
              <li>Misrepresent your identity or affiliation with any person or organisation.</li>
              <li>Interfere with the proper functioning of the website.</li>
              <li>Scrape, crawl, or harvest data from the website without written permission.</li>
              <li>Use the website to impersonate Speed Trust or solicit donations on our behalf without authorisation.</li>
            </ul>
          </section>

          <section id="intellectual-property">
            <h2>7. Intellectual Property</h2>
            <p>
              All content on this website — including text, images, logos, graphics, videos,
              and design — is the property of <strong>Speed Trust</strong> or its content
              suppliers and is protected by Indian copyright law.
            </p>
            <ul>
              <li>You may share our content on social media for non-commercial purposes with proper attribution.</li>
              <li>You may not reproduce, distribute, or modify our content for commercial purposes without written permission.</li>
              <li>Gallery images of beneficiaries may not be downloaded or shared without Speed Trust's explicit consent.</li>
            </ul>
          </section>

          <section id="third-party">
            <h2>8. Third-Party Links &amp; Services</h2>
            <p>
              Our website may contain links to third-party websites (e.g., Razorpay, social media
              platforms). These links are provided for convenience only. Speed Trust is not responsible
              for the content, privacy practices, or terms of any third-party websites. We encourage
              you to read the terms and privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section id="disclaimer">
            <h2>9. Disclaimer of Warranties</h2>
            <p>
              This website and its content are provided on an <strong>"as is"</strong> and
              <strong>"as available"</strong> basis without any warranties of any kind, either
              express or implied, including but not limited to warranties of merchantability,
              fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              Speed Trust does not warrant that the website will be uninterrupted, error-free,
              or free of viruses or other harmful components.
            </p>
          </section>

          <section id="liability">
            <h2>10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Speed Trust and its trustees, employees, and
              volunteers shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages arising from your use of this website or any donation made through it.
            </p>
            <p>
              Speed Trust's total liability for any claim arising out of these Terms shall not
              exceed the amount of your most recent donation.
            </p>
          </section>

          <section id="governing-law">
            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of
              <strong> India</strong>. Any disputes arising out of or in connection with these
              Terms shall be subject to the exclusive jurisdiction of the courts located in
              <strong> Kallakurichi, Tamil Nadu, India</strong>.
            </p>
          </section>

          <section id="changes">
            <h2>12. Changes to These Terms</h2>
            <p>
              Speed Trust reserves the right to modify these Terms at any time. Changes will be
              posted on this page with an updated effective date. Your continued use of the website
              or making a donation after such changes constitutes your acceptance of the new Terms.
              We recommend reviewing these Terms periodically.
            </p>
          </section>

          <section id="contact">
            <h2>13. Contact Us</h2>
            <p>For any questions about these Terms of Service:</p>
            <div className="policy-contact-box">
              <div className="policy-contact-item">
                <span className="policy-contact-icon">🏛️</span>
                <div>
                  <strong>Speed Trust</strong><br />
                  Ka.Mamananthal Village, Kallakurichi Taluk – 606202<br />
                  Kallakurichi District, Tamil Nadu, India
                </div>
              </div>
              <div className="policy-contact-item">
                <span className="policy-contact-icon">📧</span>
                <div>
                  <a href="mailto:speedtrustofficial@gmail.com">speedtrustofficial@gmail.com</a>
                </div>
              </div>
              <div className="policy-contact-item">
                <span className="policy-contact-icon">📞</span>
                <div>
                  <a href="tel:9626056872">9626056872</a> / <a href="tel:9677979306">9677979306</a>
                </div>
              </div>
            </div>
          </section>

          <div className="policy-footer-note">
            <p>
              By using speedtrust.org or donating through it, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

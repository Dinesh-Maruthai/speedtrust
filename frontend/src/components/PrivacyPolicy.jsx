// components/PrivacyPolicy.jsx
import React, { useEffect } from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-header">
        <div className="policy-header-content">
          <span className="policy-badge">Legal</span>
          <h1>Privacy Policy</h1>
          <p className="policy-subtitle">
            Speed Trust is committed to protecting your privacy and the information you share with us.
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
            <li><a href="#who-we-are">1. Who We Are</a></li>
            <li><a href="#information-we-collect">2. Information We Collect</a></li>
            <li><a href="#how-we-use">3. How We Use Your Information</a></li>
            <li><a href="#payment-data">4. Payment &amp; Financial Data</a></li>
            <li><a href="#sharing">5. Sharing of Information</a></li>
            <li><a href="#cookies">6. Cookies &amp; Tracking</a></li>
            <li><a href="#data-retention">7. Data Retention</a></li>
            <li><a href="#your-rights">8. Your Rights</a></li>
            <li><a href="#children">9. Children's Privacy</a></li>
            <li><a href="#security">10. Security</a></li>
            <li><a href="#contact">11. Contact Us</a></li>
          </ul>
        </div>

        <div className="policy-content">

          <section id="who-we-are">
            <h2>1. Who We Are</h2>
            <p>
              <strong>Speed Trust</strong> ("we", "our", "us") is a registered charitable trust
              located at Ka.Mamananthal Village, Kallakurichi Taluk – 606202, Kallakurichi District,
              Tamil Nadu, India. We operate the website <strong>speedtrust.org</strong> (the
              "Website") to accept donations, share our work, and engage with supporters.
            </p>
            <p>
              Speed Trust is an 80G certified trust under the Income Tax Act, 1961. All donations
              made through our website are eligible for income tax deductions as permitted by law.
            </p>
          </section>

          <section id="information-we-collect">
            <h2>2. Information We Collect</h2>
            <p>We collect the following categories of information:</p>

            <h3>a) Information You Provide Directly</h3>
            <ul>
              <li><strong>Donor Details:</strong> Full name, email address, phone number when you make a donation.</li>
              <li><strong>Donation Preferences:</strong> Donation amount, type (one-time / monthly / yearly), and any personal message you include.</li>
              <li><strong>Anonymous Donations:</strong> If you opt for anonymity, your name will not be displayed publicly, though we still collect it for legal/tax compliance.</li>
              <li><strong>Contact Enquiries:</strong> Name, email, and message when you submit the Contact form.</li>
            </ul>

            <h3>b) Information Collected Automatically</h3>
            <ul>
              <li>IP address and browser/device information (for fraud prevention).</li>
              <li>Pages visited and interaction logs on our website.</li>
              <li>Cookies and session identifiers (see Section 6).</li>
            </ul>

            <h3>c) Payment Information</h3>
            <p>
              We use <strong>Razorpay</strong> as our payment gateway. We do <strong>not</strong>
              store your debit/credit card numbers or bank account details on our servers.
              Razorpay processes and stores payment credentials in accordance with PCI-DSS standards.
              We only receive a payment reference ID and verification signature from Razorpay.
            </p>
          </section>

          <section id="how-we-use">
            <h2>3. How We Use Your Information</h2>
            <div className="policy-table-wrapper">
              <table className="policy-table">
                <thead>
                  <tr>
                    <th>Purpose</th>
                    <th>Legal Basis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Processing your donation and issuing a receipt</td>
                    <td>Contractual necessity</td>
                  </tr>
                  <tr>
                    <td>Sending 80G tax donation receipts via email</td>
                    <td>Legal obligation (Income Tax Act)</td>
                  </tr>
                  <tr>
                    <td>Responding to your enquiries or messages</td>
                    <td>Legitimate interest</td>
                  </tr>
                  <tr>
                    <td>Fraud detection and payment verification</td>
                    <td>Legitimate interest / Legal obligation</td>
                  </tr>
                  <tr>
                    <td>Sending thank-you communications and impact updates</td>
                    <td>Consent (you can opt out anytime)</td>
                  </tr>
                  <tr>
                    <td>Improving our website and services</td>
                    <td>Legitimate interest</td>
                  </tr>
                  <tr>
                    <td>Complying with government / regulatory requirements</td>
                    <td>Legal obligation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="payment-data">
            <h2>4. Payment &amp; Financial Data</h2>
            <p>
              All online donations are processed through <strong>Razorpay Payment Solutions Pvt. Ltd.</strong>,
              which complies with the Payment Card Industry Data Security Standard (PCI-DSS).
            </p>
            <ul>
              <li>We store only the <em>Razorpay Order ID</em>, <em>Payment ID</em>, and <em>Signature</em> for verification and reconciliation.</li>
              <li>Your card/UPI/net-banking credentials never pass through or reside on Speed Trust servers.</li>
              <li>Donation records (amount, donor name, email) are retained to issue 80G certificates and comply with FCRA / Income Tax regulations.</li>
            </ul>
          </section>

          <section id="sharing">
            <h2>5. Sharing of Information</h2>
            <p>We <strong>do not sell, rent, or trade</strong> your personal information. We may share it only with:</p>
            <ul>
              <li>
                <strong>Razorpay</strong> — to process your payment securely.
              </li>
              <li>
                <strong>Email Service Providers</strong> — to send donation receipts and thank-you emails on our behalf.
              </li>
              <li>
                <strong>Government Authorities</strong> — if required by law, court order, or regulatory bodies (e.g., Income Tax Department, FCRA compliance).
              </li>
              <li>
                <strong>Auditors &amp; Chartered Accountants</strong> — strictly for trust audit and statutory compliance purposes.
              </li>
            </ul>
            <p>All third-party partners are required to handle your data securely and in accordance with applicable law.</p>
          </section>

          <section id="cookies">
            <h2>6. Cookies &amp; Tracking</h2>
            <p>We use minimal cookies to operate the website:</p>
            <ul>
              <li><strong>Session Cookies:</strong> To maintain your session while browsing (no personal data stored).</li>
              <li><strong>Authentication Cookies:</strong> For the admin portal login (admin users only).</li>
              <li><strong>Analytics (optional):</strong> We may use anonymous analytics to understand traffic patterns. No personally identifiable data is shared with analytics providers.</li>
            </ul>
            <p>
              You can disable cookies in your browser settings. Disabling cookies may affect some website functionality,
              particularly the donation checkout flow.
            </p>
          </section>

          <section id="data-retention">
            <h2>7. Data Retention</h2>
            <ul>
              <li>Donation records (name, email, amount, payment ID) are retained for <strong>7 years</strong> to meet Income Tax and FCRA statutory requirements.</li>
              <li>Contact form submissions are retained for <strong>1 year</strong> or until the query is resolved.</li>
              <li>Server logs (IP addresses) are retained for <strong>90 days</strong>.</li>
              <li>You may request deletion of your personal data where it is not required for legal compliance (see Section 8).</li>
            </ul>
          </section>

          <section id="your-rights">
            <h2>8. Your Rights</h2>
            <p>You have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Ask us to correct inaccurate or incomplete data.</li>
              <li><strong>Deletion:</strong> Request deletion of your data, subject to legal retention obligations.</li>
              <li><strong>Opt-out of communications:</strong> Unsubscribe from emails at any time by clicking "Unsubscribe" in any email we send, or by emailing us directly.</li>
              <li><strong>Data Portability:</strong> Request your donation history in a structured, readable format.</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:speedtrustofficial@gmail.com">speedtrustofficial@gmail.com</a> with
              the subject line <em>"Privacy Request"</em>. We will respond within 30 days.
            </p>
          </section>

          <section id="children">
            <h2>9. Children's Privacy</h2>
            <p>
              Our website is not directed at children under 18 years of age for the purpose of collecting
              personal data. We do not knowingly collect personal information from minors. If you believe
              a child has provided us with personal information without parental consent, please contact us
              and we will delete it promptly.
            </p>
            <p>
              <em>Note:</em> Images of children who benefit from our programs may appear on our website.
              These are shared only with appropriate guardian consent and to demonstrate the impact of your
              donations.
            </p>
          </section>

          <section id="security">
            <h2>10. Security</h2>
            <p>
              We take reasonable technical and organisational measures to protect your personal data, including:
            </p>
            <ul>
              <li>HTTPS encryption across the entire website.</li>
              <li>Secure server infrastructure on AWS Elastic Beanstalk.</li>
              <li>Role-based access controls for admin and staff.</li>
              <li>Payment processing exclusively through PCI-DSS compliant Razorpay.</li>
            </ul>
            <p>
              No data transmission over the internet is 100% secure. While we strive to protect your data,
              we cannot guarantee absolute security. Please contact us immediately if you suspect any
              unauthorised access to your information.
            </p>
          </section>

          <section id="contact">
            <h2>11. Contact Us</h2>
            <p>For any privacy-related questions, requests, or concerns:</p>
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
              Speed Trust reserves the right to update this Privacy Policy at any time. We will notify
              donors of material changes by posting the updated policy on this page with a revised
              effective date. Continued use of our website after any changes constitutes acceptance of
              the updated policy.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

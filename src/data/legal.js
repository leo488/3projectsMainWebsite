/* Copy for the legal pages linked from the footer. Written to describe
   what the site actually does today: no accounts, no analytics loaded,
   contact by email, consent kept in the browser. Have counsel review
   before launch, and update these when the site starts collecting
   anything new (a contact form, analytics, a mailing list provider). */

import { CONTACT_EMAIL } from './site.js'

export const LEGAL_UPDATED = '2026-10-24'

export const LEGAL_PAGES = {
  privacy: {
    title: 'Privacy Policy',
    intro:
      'This policy explains what information 3Projects LLP collects when you use this website or contact us, why we collect it, and the choices you have.',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'Information you send us. When you email us, subscribe to our briefing or apply for a role, we receive your name, email address and anything else you choose to include.',
          'Technical information. Our hosting provider records standard server logs, such as IP address, browser type and the pages requested, to keep the site secure and running. Fonts are served by Google Fonts, which receives your IP address when the page loads.',
          'Your cookie choice. We store your cookie preferences in your browser so we do not ask again. We do not load analytics or marketing tools unless you allow them.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'We use the information you send us to reply, to discuss a potential engagement, to send the briefing you asked for, or to consider your application. We use technical information only to operate and secure the site.',
          'We do not sell personal information, and we do not use it for automated decision-making.',
        ],
      },
      {
        heading: 'Legal basis',
        body: [
          'Where data protection law such as the UK or EU GDPR applies, we rely on your consent (for the briefing and optional cookies), on steps taken at your request before entering a contract, and on our legitimate interest in running and securing our website and responding to enquiries.',
        ],
      },
      {
        heading: 'Who we share it with',
        body: [
          'We share information only with service providers that help us run the business, such as our website host and email provider, under terms that require them to protect it, or where the law requires us to.',
          'Some of these providers are located outside your country. Where that happens we rely on appropriate safeguards, such as standard contractual clauses.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'We keep enquiry and correspondence records for as long as needed to respond and for a reasonable period afterwards. Briefing subscriptions last until you unsubscribe. Application records are kept while we consider the application and any suitable future roles, unless you ask us to delete them.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'Depending on where you live, you may have the right to access, correct, delete or export your information, to object to or restrict how we use it, and to withdraw consent at any time. You can change your cookie choices from the Cookies link in the footer.',
          `To exercise any of these rights, email ${CONTACT_EMAIL}. You also have the right to complain to your local data protection authority.`,
        ],
      },
      {
        heading: 'Changes',
        body: [
          'We will update this page when our practices change. The date at the top shows when it was last revised.',
        ],
      },
    ],
  },

  terms: {
    title: 'Terms of Use',
    intro:
      'These terms apply to your use of this website, operated by 3Projects LLP. By using the site you agree to them.',
    sections: [
      {
        heading: 'Use of the site',
        body: [
          'You may browse, read and share content from this site for your own information. You may not use it in a way that is unlawful, that interferes with its operation, or that attempts to gain unauthorised access to it or to the systems behind it.',
        ],
      },
      {
        heading: 'Content and intellectual property',
        body: [
          'The text, design, logos, graphics and other material on this site belong to 3Projects LLP or its licensors. You may quote short extracts with attribution. Any other reproduction needs our written permission. Brand assets offered for download may be used only as described on the Brand Assets page.',
        ],
      },
      {
        heading: 'No professional advice',
        body: [
          'Articles, case studies and other content on this site are for general information. They are not advice for your specific situation, and no client relationship is formed until we agree an engagement in writing.',
        ],
      },
      {
        heading: 'Accuracy and availability',
        body: [
          'We work to keep the site accurate and available, but we do not guarantee that it will be error-free or uninterrupted, and we may change or remove content at any time.',
        ],
      },
      {
        heading: 'Links to other sites',
        body: [
          'Links to third-party websites are provided for convenience. We are not responsible for their content or practices.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'To the extent the law allows, 3Projects LLP is not liable for any loss arising from your use of this site or reliance on its content. Nothing in these terms limits liability that cannot be limited by law.',
        ],
      },
      {
        heading: 'Changes and contact',
        body: [
          `We may update these terms from time to time; the date at the top shows the latest version. Questions about these terms can be sent to ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },

  accessibility: {
    title: 'Accessibility Statement',
    intro:
      'We want everyone to be able to use this website, whatever their device, ability or assistive technology.',
    sections: [
      {
        heading: 'Our approach',
        body: [
          'We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA. The site uses semantic headings and landmarks, keyboard-reachable controls, descriptive labels for interactive elements, and colour contrast chosen for legibility.',
          'Animations respect your operating system’s reduced-motion setting: when it is on, moving elements such as the cycling headline word and counters hold still.',
        ],
      },
      {
        heading: 'Known limitations',
        body: [
          'Some decorative imagery has no text alternative because it carries no information. If you find content that is hard to reach or understand, we would like to know.',
        ],
      },
      {
        heading: 'Feedback',
        body: [
          `If you have difficulty using any part of this site, email ${CONTACT_EMAIL} with the page address and a description of the problem. We will reply, and we can provide information in another format on request.`,
        ],
      },
    ],
  },
}

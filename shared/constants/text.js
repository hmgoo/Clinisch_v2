/**
 * 사이트 전체에서 사용하는 텍스트 상수
 */
export const SITE_TEXT = {
  TITLE: "Clinisch & Co.",
  FOOTER: {
    BRAND: 'Clinisch & Co.',
    NAV_COL1: ['Home', 'Approach', 'Korean'],
    NAV_COL2: ['Services', 'About', 'Contact'],
    LEGAL: [
      'Terms of Use',
      'Privacy Policy',
      'Accessibility Statement',
      'Prohibition of Unauthorized Email Collection'
    ],
    COPYRIGHT: '© 2020 - 2026 Clinisch & Co. All Rights Reserved.'
  },

  // 페이지별 컨텐츠
  PAGES: {
    HOME: {
      HERO_TITLE: "Where Clinical Communication Meets Data Science & Integration",
      HERO_DESC: "Clinical communication transformed into structured, actionable data—powering seamless integration across healthcare and research systems.",
      CONTENT_TITLE: "Clinical Intelligence and Life Science Advisory",
      CONTENT_DESC: "Integrated senior expertise in clinical consulting, data science, and life sciences to enable better decision-making in complex healthcare systems",
      INSIGHTS: [
        {
          TITLE: 'Expert-led Clinical Leadership',
          DESC: 'Consistently delivered by experienced clinical and scientific experts.',
          IMG: '0102_Expert.png',
          WIDE: true
        },
        {
          TITLE: 'Modular & Flexible Engagement',
          DESC: 'Flexible, modular support without full CRO replacement',
          IMG: '0103_modular.png'
        },
        {
          TITLE: 'Clinical First Technology-Enabled',
          DESC: 'Clinical first delivery enabled by data and technology',
          IMG: '0104_first.png'
        }
      ]
    },
    SERVICES: {
      HEROES: [
        {
          TITLE: "How we work with Life Science Companies",
          DESC: "Providing hands-on, senior-led support where experienced clinical leadership is needed.",
          IMG: "02_hero_service.png"
        },
        {
          TITLE: "Clinical Workflow Architecture",
          DESC: "From consultation to results reporting, Clinisch provides a step-by-step flow.",
          IMG: "0205_roadmap.png"
        }
      ],
      CONTENT_TITLE: "Clinical Project Management & Trial Execution",
      CONTENT_DESC: "Global and local study oversight",
      CONTENT2_TITLE: "Study Rescue & Operational Oversight",
      CONTENT2_DESC: "Senior intervention for delayed or complex studies",
      INSIGHTS: [
        {
          TITLE: 'Clinical Systems & Data Enablement',
          DESC: 'Systems optimization and operational insights',
          IMG: '0203_Data.png',
          WIDE: true
        },
        {
          TITLE: 'Life Science Advisory Services',
          DESC: 'Strategic guidance and senior oversight for delayed or complex studies',
          IMG: '0204_Advisory.png',
          WIDE: true
        },
        {}, // 인덱스 유지를 위한 빈 슬롯
        {}, // 인덱스 유지를 위한 빈 슬롯
        // 두 번째 그리드용 데이터 (01~04)
        { TITLE: '01 <br>Consultation & Strategy', DESC: '', IMG: '0206_consult.png' },
        { TITLE: '02 <br>Clinical Design', DESC: '', IMG: '0207_design.png' },
        { TITLE: '03 <br>Execution & Operations', DESC: '', IMG: '0208_excute.png' },
        { TITLE: '04 <br>Results Reporting', DESC: '', IMG: '0209_report.png' }
      ]
    },
    APPROACH: {
      HERO_TITLE: "Our Approach",
      HERO_DESC: "Trusted clinical and life science advisory through integrated clinical leadership and data science.",
      HERO_IMG: "03_hero_approach.png",
      CONTENT_TITLE: "Our Approach",
      CONTENT_DESC: "We operate through a fully integrated model that connects clinical expertise, data science, and life science strategy. This ensures continuity from insight to execution, enabling clear, data-driven decision-making in complex healthcare environments.",
      EXPERTISE: [
        { TITLE: "Clinical Expertise", DESC: "Deep domain knowledge supporting complex clinical decision-making" },
        { TITLE: "Data Science Integration", DESC: "Transforming clinical information into structured, actionable intelligence" },
        { TITLE: "Life Science Advisory", DESC: "Strategic guidance across research, development, and healthcare systems" }
      ],
      TAGLINE: "From Clinical Insight to Data-Driven Action",
      INSIGHTS: []
    },
    ABOUT: {
      HERO_TITLE: "About Clinisch & Co.",
      HERO_DESC: "Expert-led, execution-first clinical support",
      HERO_IMG: "04_hero_about.png",
      CONTENT_TITLE: "About Clinisch & Co.",
      CONTENT_DESC: "Clinisch & Co. is a clinical services company that connects clinical leadership with data science and integration, enabling sponsors and CROs to perform at their best.",
      DETAILS: [
        "Based in Korea, operations integrate clinical project management, life science advisory, and in-house technical leadership, with cross-regional expertise across APAC, EU, and the US.",
        "Delivery is structured through a lean, accountable, and technology-enabled model that ensures operational clarity and consistent execution across complex clinical programs.",
        "Engagements are designed to work alongside sponsors and CROs, enhancing existing team capabilities through seamless collaboration."
      ],
      INSIGHTS: []
    },
    CONTACT: {
      HERO_IMG: "05_hero_contact.png",
      HERO_TITLE: "Contact",
      HERO_DESC: "We welcome collaborations across clinical services, data science, and life sciences.\nReach out to discuss how Clinisch & Co. can support your organization.",
      CONTENT_TITLE: "Clinisch & Co. LLC.",
      CONTENT_DESC: "323 Incheon Tower-daero, Yeonsu-gu\nIncheon, South Korea 22007\n\nSupport: <a href='mailto:support@clinisch.com'>support@clinisch.com</a>",
      INSIGHTS: []
    },
    PRIVACY: {
      HERO_TITLE: "Privacy Policy",
      HERO_DESC: "",
      CONTENT_TITLE: "Privacy Policy",
      CONTENT_DESC: "Clinisch & Co. (\"Company\") values your privacy. This Privacy Policy outlines how information is handled in relation to your use of this website (\"Site\").",
      DETAILS: [
        "<strong class='article-title'>Article 1 (Collection and Use of Personal Data)</strong>\nThis Site is for informational purposes only and does not require user registration. We do not directly collect, store, or process any personal identifiable information (PII) such as names or contact details from our visitors.",
        "<strong class='article-title'>Article 2 (Use of Cookies)</strong>\nWe do not use cookies to store or retrieve user information, nor do we employ any tracking or marketing tools to monitor visitor behavior.",
        "<strong class='article-title'>Article 3 (Technical Data Collection - GitHub Hosting)</strong>\nThis Site is hosted and operated via the GitHub, Inc. platform. For the purposes of maintaining security and operational stability, GitHub may automatically collect certain technical information, including but not limited to IP addresses, access logs, and browser types. The processing of such data is governed by the GitHub Privacy Statement.",
        "<strong class='article-title'>Article 4 (Information We Use)</strong>\nWe may use generative artificial intelligence (AI) tools to create synthetic images and visuals for illustrative purposes. These images are AI-generated and do not depict real people or events unless otherwise noted.",
        "<strong class='article-title'>Article 5 (External Links)</strong>\nThis Site may contain links to third-party websites. Clinisch & Co. is not responsible for the privacy practices of such external sites. We encourage you to review the privacy policies of any third-party site you visit.",
        "<strong class='article-title'>Article 6 (Contact Information)</strong>\nIf you have any questions regarding this Privacy Policy or our Site, please contact us at: <a href='mailto:support@clinisch.com'>support@clinisch.com</a>",
        "Posted: Jan 1, 2026"
      ],
      INSIGHTS: []
    },
    TERMS: {
      HERO_TITLE: "Terms of Use",
      CONTENT_TITLE: "Terms of Use",
      CONTENT_DESC: "These Terms of Use (\"Terms\") govern your access to and use of the website (\"Site\") provided by Clinisch & Co. (\"Company\"). By accessing or using the Site, you acknowledge that you have read, understood, and agree to be bound by these Terms.",
      DETAILS: [
        "<strong class='article-title'>Article 1 (Copyright and Intellectual Property)</strong>\nAll content on this Site, including but not limited to text, graphics, logos, icons, images, and video clips, as well as the arrangement thereof, and the underlying algorithms, data analysis models, and technologies, are the exclusive property of Clinisch & Co. or its licensors. Any reproduction, modification, distribution, or reverse engineering of the Site's content without prior written consent from the Company is strictly prohibited.",
        "<strong class='article-title'>Article 2 (Trademarks)</strong>\nThe name \"Clinisch & Co.\", the logo, and related service marks displayed on this Site are registered or unregistered trademarks of the Company. You may not use the Company's trademarks for promotional or advertising purposes, nor in any manner that falsely implies a formal relationship with the Company or disparages the Company's reputation.",
        "<strong class='article-title'>Article 3 (User Registration and Security)</strong>\nIf you create an account to use specific services on the Site, you must provide accurate and complete information. You are responsible for maintaining the security of your account and password and are liable for all activities that occur under your account. You must notify the Company immediately of any suspected breach of security.",
        "<strong class='article-title'>Article 4 (Prohibited Activities)</strong>\nUsers shall not engage in the following activities:\n\n• Attempting to bypass or disable the security measures of the Site.\n• Distributing malicious code or viruses through the Site.\n• Imposing an unreasonable load on the Company's servers or networks.\n• Infringing upon the intellectual property rights or privacy of others.",
        "<strong class='article-title'>Article 5 (Governing Law and Jurisdiction)</strong>\nThese Terms shall be governed by and construed in accordance with the laws of the Republic of Korea. Any disputes arising from the use of this Site shall be subject to the exclusive jurisdiction of the courts located in the district of the Company's headquarters.",
        "Posted: Jan 1, 2026"
      ],
      INSIGHTS: []
    },
    ACCESSIBILITY: {
      HERO_TITLE: "Accessibility Statement",
      CONTENT_TITLE: "Accessibility Statement",
      CONTENT_DESC: "Clinisch & Co. is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards, aiming for WCAG 2.2 Level AA.\n\nThis website is currently partially conformant with WCAG 2.2 Level AA.",
      DETAILS: [
        "<strong class='article-title'>1. Key Features</strong>\n• High Contrast: Text and background contrast ratio is maintained well above the 4.5:1 requirement (currently ~13:1).\n• Semantic HTML: Proper use of HTML5 elements (header, main, footer, etc.) to ensure clear document structure.\n• Language Attributes: Correct lang attributes are applied to each page to ensure proper processing by assistive technologies.\n• Responsive Design: Layout is optimized for access across various devices and screen sizes.",
        "<strong class='article-title'>2. Known Limitations</strong>\n• Skip Links: A mechanism to skip repetitive header content has not been implemented yet.\n• Icon Labels: Some icon-only buttons (e.g., hamburger menu) may lack descriptive text labels for screen readers.",
        "<strong class='article-title'>3. Feedback and Contact</strong>\nWe welcome your feedback on the accessibility of our website. Please contact us at the following if you encounter accessibility barriers: <a href='mailto:support@clinisch.com'>support@clinisch.com</a>",
        "Posted: Jan 1, 2026"
      ],
      INSIGHTS: []
    },
    EMAIL_POLICY: {
      HERO_TITLE: "Email Collection Policy",
      CONTENT_TITLE: "Prohibition of Unauthorized Email Collection",
      CONTENT_DESC: "We strictly prohibit the unauthorized collection of e-mail addresses posted on this website through the use of automated e-mail collection programs or other technical devices. Any violation may lead to legal penalties under the \"Information and Communications Network Act.\"",
      DETAILS: [
        "<strong class='article-title'>Article 50 of the Information and Communications Network Act (Restriction on Transmission of Advertising Information for Profit)</strong>\n(5) No person who transmits advertising information for profit using electronic transmission media shall engage in any of the following acts: [Amended Jan. 23, 2024]\n\n1. Acts of evading or interfering with a recipient's refusal to receive advertising information or withdrawal of consent to receive it;\n2. Acts of automatically generating contact information of recipients, such as phone numbers or e-mail addresses, by combining numbers, codes, or characters;\n3. Acts of automatically registering phone numbers or e-mail addresses for the purpose of transmitting advertising information for profit;\n4. Various acts to conceal the identity of the transmitter of advertising information or the source of advertisement transmission;\n5. Various acts of inducing a reply by deceiving a recipient for the purpose of transmitting advertising information for profit.",
        "Posted: Jan 1, 2026"
      ],
      INSIGHTS: []
    }
  }
};


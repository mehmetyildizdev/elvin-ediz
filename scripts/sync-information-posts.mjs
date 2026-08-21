import { createClient } from '@sanity/client';
import fs from 'fs';

if (fs.existsSync('.env.local')) {
  const envConfig = fs.readFileSync('.env.local', 'utf8');
  for (const line of envConfig.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...valueParts] = trimmed.split('=');
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_EDITOR_TOKEN || process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing projectId or SANITY_EDITOR_TOKEN in environment');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-07-14',
  useCdn: false,
});

const informationGuides = [
  {
    _id: 'post-info-questions-before-application',
    _type: 'post',
    title:
      'Three Critical Questions to Evaluate Before Beginning Your Canadian Immigration Application',
    slug: {
      _type: 'slug',
      current: 'questions-before-your-application',
    },
    kind: 'information',
    iconName: 'book-open',
    checklistIcon: 'file-check',
    checklistTitle: 'Pre-Filing Readiness & Eligibility Checklist',
    checklistDescription:
      'Review these primary parameters before initiating formal filings to ensure full documentation readiness and eliminate common IRCC procedural delays.',
    checklistItems: [
      'Verify Primary Applicant NOC TEER Classification & Minimum Education Equivalence',
      'Conduct Comprehensive Bank Account & Unencumbered Settlement Funds Audit',
      'Secure Valid Police Clearance Certificates (PCC) from all 6+ Month Residences',
      'Ensure Certified Translations & Affidavits for all Non-English/Non-French Records',
    ],
    infoCtaTitle: 'Need a complete pre-application document audit?',
    infoCtaSubtitle:
      'Our RCIC legal team verifies all eligibility criteria and supporting documentation.',
    infoCtaButtonText: 'Schedule Document Audit',
    excerpt:
      'Clarity at the outset prevents costly refusals: timeline expectations, proof-of-funds readiness, and verifiable principal applicant credentials.',
    publishedAt: '2026-08-15T10:00:00.000Z',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c1',
            _type: 'span',
            marks: [],
            text: 'Preparation is the single most decisive factor in achieving a seamless Canadian permanent residence or temporary permit outcome. Taking a rigorous pre-assessment approach minimizes administrative delays and procedural fairness letters.',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c2',
            _type: 'span',
            marks: [],
            text: 'First, confirm whether your occupation falls under the appropriate Training, Education, Experience and Responsibilities (TEER) tier. Next, ensure your settlement funds are liquid, unencumbered by loans, and backed by verifiable historical banking records. Finally, assemble vital statistics and international police certificates well ahead of submission deadlines.',
          },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c3',
            _type: 'span',
            marks: [],
            text: 'Under the oversight of Nazly Sunguroglu, RCIC, every client dossier is evaluated through a comprehensive multi-point audit before submission to IRCC.',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-info-express-entry-crs-optimization',
    _type: 'post',
    title:
      'A Strategic Guide to Maximizing Your Express Entry Comprehensive Ranking System (CRS) Score',
    slug: {
      _type: 'slug',
      current: 'complete-guide-to-express-entry-crs-optimization',
    },
    kind: 'information',
    iconName: 'sparkles',
    checklistIcon: 'award',
    checklistTitle: 'CRS Score Maximization & Profile Optimization Checklist',
    checklistDescription:
      'Systematic strategies to increase your Comprehensive Ranking System (CRS) point totals across human capital, language, and provincial nomination factors.',
    checklistItems: [
      'Target Canadian Language Benchmark (CLB) Level 9/10 in All Four Language Abilities',
      'Obtain Dual-Credential Educational Credential Assessments (ECA) for Additional Points',
      'Document Secondary Official Language Proficiency (French NCLC 7+) for up to 50 Bonus Points',
      'Evaluate Provincial Nominee Program (PNP) Alignments for an Immediate 600-Point Boost',
    ],
    infoCtaTitle: 'Want to optimize your Express Entry CRS ranking?',
    infoCtaSubtitle:
      'We analyze your qualifications to identify hidden point opportunities and PNP streams.',
    infoCtaButtonText: 'Book CRS Strategy Session',
    excerpt:
      'Learn how strategic language retakes, spouse credentials, and provincial nominee alignments can elevate your profile above competitive draw cut-offs.',
    publishedAt: '2026-08-12T14:30:00.000Z',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c1',
            _type: 'span',
            marks: [],
            text: 'In today’s competitive Express Entry pool, understanding the exact mathematical triggers of the Comprehensive Ranking System (CRS) is essential.',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c2',
            _type: 'span',
            marks: [],
            text: 'Achieving CLB 9 across all four test components unlocks critical skill transferability point combinations that can elevate your profile by 50 to 100 points. Additionally, pairing primary credentials with a recognized second degree, diploma, or French proficiency creates substantial competitive separation.',
          },
        ],
      },
      {
        _key: 'b3',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c3',
            _type: 'span',
            marks: [],
            text: 'Our advisory firm assists candidates with targeted profile calibrations, category-based selection NOC alignments, and provincial nominee matching.',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-info-study-permit-blueprint-sop',
    _type: 'post',
    title:
      'Study Permit Blueprint: Document Checklist, Proof of Funds, and Statement of Purpose (SOP)',
    slug: {
      _type: 'slug',
      current: 'study-permit-document-checklist-and-statement-of-purpose',
    },
    kind: 'information',
    iconName: 'graduation-cap',
    checklistIcon: 'file-text',
    checklistTitle: 'Study Permit & SOP Preparation Checklist',
    checklistDescription:
      'Essential guidelines for securing a Canadian study permit, drafting a persuasive Statement of Purpose, and satisfying visa officer bona fide student criteria.',
    checklistItems: [
      'Obtain Official Letter of Acceptance (LOA) & Provincial Attestation Letter (PAL/TAL)',
      'Provide 4–6 Months of Detailed Financial Documentation Covering Tuition & Living Expenses',
      'Draft a Logical, Cohesive Statement of Purpose Demonstrating Career Progression',
      'Demonstrate Strong Economic, Social, and Familial Ties to Your Home Country',
    ],
    infoCtaTitle: 'Planning to study at a Canadian institution?',
    infoCtaSubtitle:
      'We guide you through LOA verifications, financial proofs, and comprehensive SOP drafting.',
    infoCtaButtonText: 'Consult Study Permit Specialist',
    excerpt:
      'A structured guide covering acceptance letters, provincial attestations (PAL), cost-of-living proof, and building a compelling dual-intent narrative.',
    publishedAt: '2026-08-08T11:15:00.000Z',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c1',
            _type: 'span',
            marks: [],
            text: 'Navigating a Canadian study permit application requires meeting strict IRCC regulatory requirements under section 216 of the IRPR.',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c2',
            _type: 'span',
            marks: [],
            text: 'Beyond securing an official acceptance and provincial attestation letter, your Statement of Purpose (SOP) must clearly articulate how the chosen Canadian academic credential directly complements your prior education and accelerates your career opportunities in your country of citizenship.',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-info-work-permit-transitions-maintained-status',
    _type: 'post',
    title:
      'Navigating In-Canada Work Permit Transitions: LMIA, Maintained Status, and Bridging Visas',
    slug: {
      _type: 'slug',
      current: 'in-canada-work-permit-transition-guide',
    },
    kind: 'information',
    iconName: 'briefcase',
    checklistIcon: 'check-circle-2',
    checklistTitle: 'Work Permit Transition & Compliance Checklist',
    checklistDescription:
      'Step-by-step procedures to preserve legal employment authorization, utilize maintained status, and bridge to permanent residence without disruption.',
    checklistItems: [
      'Submit Extension / Transition Applications Prior to the Expiry of Current Work Authorization',
      'Confirm Eligibility Under Section 186(u) IRPR for Maintained Full-Time Working Rights',
      'Obtain Acknowledgement of Receipt (AOR) for Bridging Open Work Permit (BOWP) Filing',
      'Ensure Provincial Healthcare and Social Insurance Number (SIN) Continuations',
    ],
    infoCtaTitle: 'Facing an upcoming work permit expiration date?',
    infoCtaSubtitle:
      'Our licensed practitioners protect your lawful status and structure smooth employer transitions.',
    infoCtaButtonText: 'Review Work Permit Options',
    excerpt:
      'How to maintain continuous legal authorization to work in Canada while transitioning between employer-specific, open, or bridging work permits.',
    publishedAt: '2026-08-03T16:00:00.000Z',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c1',
            _type: 'span',
            marks: [],
            text: 'Maintaining lawful employment authorization in Canada requires precise calendar management and knowledge of Section 186(u) of the IRPR.',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c2',
            _type: 'span',
            marks: [],
            text: 'When you apply to extend your work permit before your existing permit expires, you benefit from maintained status. Candidates with submitted permanent residence applications under Express Entry or PNPs can leverage the Bridging Open Work Permit (BOWP) to remain employed indefinitely during PR processing.',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-info-spousal-sponsorship-relationship-proof',
    _type: 'post',
    title: 'Spousal & Common-Law Sponsorship: Genuine Relationship Documentation Guide',
    slug: {
      _type: 'slug',
      current: 'spousal-sponsorship-relationship-proof-checklist',
    },
    kind: 'information',
    iconName: 'heart',
    checklistIcon: 'shield',
    checklistTitle: 'Spousal & Common-Law Evidence Checklist',
    checklistDescription:
      'Comprehensive evidentiary requirements to satisfy IRCC Section 4 bona fide relationship standards for inland and outland spousal sponsorship.',
    checklistItems: [
      'Provide 12 Continuous Months of Cohabitation Proof for Common-Law Partnerships (Joint Lease, Utilities)',
      'Assemble Shared Financial Evidence (Joint Bank Accounts, Beneficiary Designations, Insurance)',
      'Compile Chronological Relationship Narrative, Photographic History, and Travel Records',
      'Include Statutory Declarations and Letters of Support from Family Members and Close Friends',
    ],
    infoCtaTitle: 'Sponsoring your spouse or common-law partner to Canada?',
    infoCtaSubtitle:
      'We assemble structured, compelling relationship portfolios that satisfy IRCC scrutiny.',
    infoCtaButtonText: 'Schedule Sponsorship Review',
    excerpt:
      'Detailed guidance on compiling financial, cohabitation, and social evidence to demonstrate a genuine relationship free of immigration convenience concerns.',
    publishedAt: '2026-07-28T09:45:00.000Z',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c1',
            _type: 'span',
            marks: [],
            text: 'Family reunification is a cornerstone of Canada’s immigration program, yet spousal and common-law applications receive rigorous scrutiny from immigration officers.',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c2',
            _type: 'span',
            marks: [],
            text: 'Under Section 4 of the IRPR, an officer must be satisfied that the marriage or common-law relationship is genuine and was not entered into primarily for the purpose of acquiring immigration status. Presenting an organized, chronological dossier of shared life commitments ensures a smooth review process.',
          },
        ],
      },
    ],
  },
  {
    _id: 'post-info-canadian-citizenship-physical-presence',
    _type: 'post',
    title:
      'Canadian Citizenship Application Roadmap: Physical Presence, Tax Filing, and Test Preparation',
    slug: {
      _type: 'slug',
      current: 'canadian-citizenship-application-physical-presence-guide',
    },
    kind: 'information',
    iconName: 'landmark',
    checklistIcon: 'calendar',
    checklistTitle: 'Canadian Citizenship Eligibility & Filing Checklist',
    checklistDescription:
      'Detailed statutory checklist to ensure flawless physical presence calculations, tax filing compliance, and test readiness before applying for Canadian citizenship.',
    checklistItems: [
      'Audit the 1,095-Day Physical Presence Calculation (including temporary resident credits up to 365 days)',
      'Obtain Canada Revenue Agency (CRA) Notices of Assessment (NOA) for Required Tax Years',
      'Verify Language Benchmark Compliance (CLB 4+ in Speaking and Listening for Ages 18–54)',
      'Prepare for the Canadian Citizenship Knowledge Test with Official Discover Canada Material',
    ],
    infoCtaTitle: 'Ready to become a Canadian citizen?',
    infoCtaSubtitle:
      'We audit your physical presence calculations, file submissions, and guide you to oath of citizenship.',
    infoCtaButtonText: 'Start Citizenship Assessment',
    excerpt:
      'A step-by-step roadmap detailing the 1,095-day rule, temporary resident credit calculations, CRA tax requirements, and study tips for the citizenship exam.',
    publishedAt: '2026-07-22T13:00:00.000Z',
    content: [
      {
        _key: 'b1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c1',
            _type: 'span',
            marks: [],
            text: 'Achieving Canadian citizenship represents the final milestone of your immigration journey. To qualify under Section 5(1) of the Citizenship Act, permanent residents must meet specific physical presence, tax filing, and language criteria.',
          },
        ],
      },
      {
        _key: 'b2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'c2',
            _type: 'span',
            marks: [],
            text: 'You must have been physically present in Canada for at least 1,095 days within the 5 years immediately preceding your application date. Time spent in Canada as a temporary resident (visitor, student, or worker) prior to receiving PR can count as half-days, up to a maximum credit of 365 days.',
          },
        ],
      },
    ],
  },
];

async function syncInformationPosts() {
  console.log(`Connecting to Sanity (${dataset})...`);

  // 1. Find Nazly staff ID
  let staffId = 'staff-nazly';
  try {
    const staffDoc = await client.fetch(
      `*[_type == "staffMember" && (name match "*Nazly*" || _id == "staff-nazly")][0]{ _id, name }`
    );
    if (staffDoc?._id) {
      staffId = staffDoc._id;
      console.log(`Resolved staff author: ${staffDoc.name} (${staffId})`);
    }
  } catch (err) {
    console.warn('Could not query staff document, using fallback ID:', staffId);
  }

  // 2. Fetch existing information posts in Sanity to delete/overwrite old ones
  const existingInfo = await client.fetch(
    `*[_type == "post" && (kind == "information" || kind == "info")]{ _id, title }`
  );
  console.log(`Found ${existingInfo.length} existing information posts in Sanity.`);

  for (const item of existingInfo) {
    console.log(`Deleting old information post: "${item.title}" (${item._id})...`);
    await client.delete(item._id);
  }

  // 3. Write information posts to data/information-posts.json
  const formattedPosts = informationGuides.map((p) => ({
    ...p,
    author: {
      _type: 'reference',
      _ref: staffId,
    },
  }));

  fs.writeFileSync('data/information-posts.json', JSON.stringify(formattedPosts, null, 2));
  console.log(`Saved ${formattedPosts.length} information posts to data/information-posts.json.`);

  // 4. Create new information posts in Sanity
  console.log(`Pushing ${formattedPosts.length} information posts to Sanity...`);
  for (const post of formattedPosts) {
    const res = await client.create(post);
    console.log(`✓ Created guide: "${res.title}"`);
  }

  console.log(
    `\nAll ${formattedPosts.length} practical information guides successfully synced to Sanity!`
  );
}

syncInformationPosts().catch((err) => {
  console.error('Error syncing information posts:', err);
  process.exit(1);
});

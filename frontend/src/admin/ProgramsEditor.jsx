import React from 'react';
import CollectionEditor from './CollectionEditor';

const schema = [
  // Core
  { key: 'slug', label: 'Slug (URL id)', help: 'e.g. applied-ai-ml' },
  { key: 'title', label: 'Full Title' },
  { key: 'subtitle', label: 'Short title (Subtitle)' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'level', label: 'Level key', help: 'mid / senior' },
  { key: 'levelLabel', label: 'Level label' },
  { key: 'weeks', label: 'Weeks', type: 'number' },
  { key: 'audience', label: 'Audience' },
  { key: 'fee', label: 'Fee' },
  { key: 'nextCohort', label: 'Next cohort' },
  { key: 'image', label: 'Hero image', type: 'image' },
  { key: 'short', label: 'Short description', type: 'textarea' },
  { key: 'long', label: 'Long description (hero paragraph)', type: 'textarea' },
  { key: 'outcomes', label: 'Outcomes (list)', type: 'list-lines' },
  { key: 'curriculum', label: 'Week-by-Week Curriculum', type: 'curriculum' },
  { key: 'modules', label: 'Modules (detailed cards)', type: 'modules' },
  { key: 'faqs', label: 'FAQs', type: 'faqs' },

  // Page sections — copy customisation per program
  { key: 'outcomesEyebrow', label: '› Outcomes section · Eyebrow', help: 'Default: "What you leave with"' },
  { key: 'outcomesTitle', label: '› Outcomes · Title' },
  { key: 'outcomesTitleAccent', label: '› Outcomes · Title (italic gold accent)' },

  { key: 'modulesEyebrow', label: '› Modules section · Eyebrow', help: 'Default: "Modules"' },
  { key: 'modulesTitle', label: '› Modules · Title' },
  { key: 'modulesTitleAccent', label: '› Modules · Title (italic gold accent)' },

  { key: 'curriculumEyebrow', label: '› Curriculum section · Eyebrow' },
  { key: 'curriculumTitle', label: '› Curriculum · Title' },

  { key: 'faqEyebrow', label: '› FAQ section · Eyebrow' },
  { key: 'faqTitle', label: '› FAQ · Title' },
  { key: 'faqTitleAccent', label: '› FAQ · Title (italic gold accent)' },

  { key: 'ctaTitle', label: '› Final CTA · Title (before italic gold)' },
  { key: 'ctaTitleAccent', label: '› Final CTA · Italic gold accent' },
  { key: 'ctaSubtitle', label: '› Final CTA · Subtitle', type: 'textarea' },
  { key: 'ctaPrimaryText', label: '› Final CTA · Primary button text' },
  { key: 'ctaSecondaryText', label: '› Final CTA · Secondary button text' },

  // Certificate section
  { key: 'certificateEnabled', label: 'Show "Certificate" section', type: 'boolean' },
  { key: 'certificateEyebrow', label: '› Certificate · Eyebrow', help: 'Default: "Certificate"' },
  { key: 'certificateTitle', label: '› Certificate · Title' },
  { key: 'certificateTitleAccent', label: '› Certificate · Title (italic gold accent)' },
  { key: 'certificateDescription', label: '› Certificate · Description', type: 'textarea' },
  { key: 'certificateBullets', label: '› Certificate · Bullets (one per line)', type: 'list-lines' },
  { key: 'certificateNote', label: '› Certificate · Footnote', type: 'textarea' },
  { key: 'certificateImage', label: '› Certificate · Side image (optional)', type: 'image' },

  // Experience section
  { key: 'experienceEnabled', label: 'Show "Experience" section', type: 'boolean' },
  { key: 'experienceEyebrow', label: '› Experience · Eyebrow' },
  { key: 'experienceTitle', label: '› Experience · Title' },
  { key: 'experienceTitleAccent', label: '› Experience · Title (italic gold accent)' },
  { key: 'experienceItems', label: '› Experience items', type: 'experience-items' },

  // Contact section
  { key: 'contactEnabled', label: 'Show "Contact us" form on this page', type: 'boolean' },
  { key: 'contactEyebrow', label: '› Contact · Eyebrow' },
  { key: 'contactTitle', label: '› Contact · Title' },
  { key: 'contactTitleAccent', label: '› Contact · Title (italic gold accent)' },
  { key: 'contactSubtitle', label: '› Contact · Subtitle', type: 'textarea' },

  // Visibility toggles
  { key: 'showOutcomes', label: 'Show "Outcomes" section', type: 'boolean' },
  { key: 'showModules', label: 'Show "Modules" section', type: 'boolean' },
  { key: 'showCurriculum', label: 'Show "Curriculum" section', type: 'boolean' },
  { key: 'showFaq', label: 'Show "FAQ" section', type: 'boolean' },

  // Listing
  { key: 'featured', label: 'Featured on home', type: 'boolean' },
  { key: 'order', label: 'Order', type: 'number' },
];

export default function ProgramsEditor() {
  return (
    <CollectionEditor
      title="Programs"
      path="programs"
      schema={schema}
      displayKey="subtitle"
      newItemDefaults={{
        slug: '', title: '', subtitle: '', tagline: '', level: 'mid', levelLabel: 'Mid Career',
        weeks: 12, audience: '', fee: '', nextCohort: '', image: '', short: '', long: '',
        outcomes: [], curriculum: [], modules: [], faqs: [],
        outcomesEyebrow: '', outcomesTitle: '', outcomesTitleAccent: '',
        modulesEyebrow: '', modulesTitle: '', modulesTitleAccent: '',
        curriculumEyebrow: '', curriculumTitle: '',
        faqEyebrow: '', faqTitle: '', faqTitleAccent: '',
        ctaTitle: '', ctaTitleAccent: '', ctaSubtitle: '',
        ctaPrimaryText: '', ctaSecondaryText: '',
        certificateEnabled: true, certificateEyebrow: '', certificateTitle: '',
        certificateTitleAccent: '', certificateDescription: '',
        certificateBullets: [], certificateNote: '', certificateImage: '',
        experienceEnabled: true, experienceEyebrow: '', experienceTitle: '',
        experienceTitleAccent: '', experienceItems: [],
        contactEnabled: true, contactEyebrow: '', contactTitle: '',
        contactTitleAccent: '', contactSubtitle: '',
        showOutcomes: true, showModules: true, showCurriculum: true, showFaq: true,
        featured: false, order: 999,
      }}
    />
  );
}

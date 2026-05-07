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
        showOutcomes: true, showModules: true, showCurriculum: true, showFaq: true,
        featured: false, order: 999,
      }}
    />
  );
}

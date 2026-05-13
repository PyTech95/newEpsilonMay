import React, { useMemo } from 'react';
import { useEditMode } from './EditModeContext';

/** Map of supported style keys -> CSS property. */
const STYLE_MAP = {
  color: 'color',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  textAlign: 'text-align',
  fontStyle: 'font-style',
  letterSpacing: 'letter-spacing',
  lineHeight: 'line-height',
  backgroundColor: 'background-color',
};

function escapeCss(value) {
  return String(value).replace(/"/g, '\\"');
}

function ruleFor(path, style) {
  const decls = Object.entries(style || {})
    .map(([k, v]) => {
      const css = STYLE_MAP[k];
      if (!css || v == null || v === '') return null;
      return `${css}: ${v} !important;`;
    })
    .filter(Boolean)
    .join(' ');
  if (!decls) return '';
  return `[data-cms-path="${escapeCss(path)}"] { ${decls} }`;
}

/**
 * Injects a <style> tag that applies all saved per-element styles via
 * the [data-cms-path="..."] attribute selector. Mounted globally.
 * Also hides sections marked as hidden when NOT in edit mode.
 */
export default function StyleInjector() {
  const { styles, hiddenSections, editMode } = useEditMode();
  const css = useMemo(() => {
    const rules = Object.entries(styles || {})
      .map(([path, style]) => ruleFor(path, style))
      .filter(Boolean);
    // Hidden sections: completely removed from layout when not editing;
    // dimmed + striped overlay when editing so admin can find & restore them.
    const hidden = Object.keys(hiddenSections || {});
    if (hidden.length) {
      const sel = hidden.map((s) => `[data-cms-section="${escapeCss(s)}"]`).join(', ');
      if (editMode) {
        rules.push(`${sel} { opacity: 0.35 !important; filter: grayscale(1) !important; outline: 2px dashed rgba(201,162,39,0.7) !important; outline-offset: -4px !important; }`);
      } else {
        rules.push(`${sel} { display: none !important; }`);
      }
    }
    return rules.join('\n');
  }, [styles, hiddenSections, editMode]);
  if (!css) return null;
  return <style data-cms-styles="1">{css}</style>;
}

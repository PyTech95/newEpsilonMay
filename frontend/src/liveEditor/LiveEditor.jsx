import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useEditMode } from './EditModeContext';
import EditToolbar from './EditToolbar';

/**
 * DOM-based live editor overlay.
 *  - Active only when editMode is ON.
 *  - Scans live DOM for [data-cms-path] elements.
 *  - Adds hover outline + click selection.
 *  - Renders <EditToolbar> next to the active element.
 */
export default function LiveEditor() {
  const { editMode, styles, hiddenSections, setSectionHidden } = useEditMode();
  const [active, setActive] = useState(null); // { el, path, type, rect }
  const [hoverRect, setHoverRect] = useState(null);
  const [sectionRects, setSectionRects] = useState([]); // [{id, rect, hidden}]
  const rafRef = useRef(0);

  const computeRect = (el) => {
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, left: r.left + window.scrollX, width: r.width, height: r.height };
  };

  const guessType = (el) => {
    if (el.dataset.cmsType) return el.dataset.cmsType;
    if (el.tagName === 'IMG') return 'image';
    return 'text';
  };

  // Re-position rectangles on scroll/resize; also re-scan when DOM mutates
  // (sections that depend on async data appear after initial mount).
  useEffect(() => {
    if (!editMode) return;
    const scan = () => {
      const nodes = document.querySelectorAll('[data-cms-section]');
      setSectionRects(Array.from(nodes).map((el) => ({
        id: el.dataset.cmsSection,
        rect: computeRect(el),
        hidden: !!(hiddenSections && hiddenSections[el.dataset.cmsSection]),
      })));
    };
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setActive((a) => a ? { ...a, rect: computeRect(a.el) } : a);
        scan();
      });
    };
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    onScroll();
    // Watch for new sections appearing (async-loaded content)
    const mo = new MutationObserver(() => onScroll());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
      mo.disconnect();
    };
  }, [editMode, hiddenSections]);

  // Attach DOM-wide hover + click handlers
  useEffect(() => {
    if (!editMode) {
      setActive(null);
      setHoverRect(null);
      return;
    }

    const findEditable = (target) => {
      let el = target;
      while (el && el !== document.body) {
        if (el.dataset && el.dataset.cmsPath) return el;
        el = el.parentElement;
      }
      return null;
    };

    const onMove = (e) => {
      const el = findEditable(e.target);
      if (!el) { setHoverRect(null); return; }
      if (active && el === active.el) { setHoverRect(null); return; }
      setHoverRect(computeRect(el));
    };

    const onClick = (e) => {
      // Allow clicks inside toolbar to pass through
      if (e.target.closest('[data-live-editor-ui="1"]')) return;
      const el = findEditable(e.target);
      if (!el) { setActive(null); return; }
      // Prevent navigation only when clicking actual editable
      e.preventDefault();
      e.stopPropagation();
      setActive({ el, path: el.dataset.cmsPath, type: guessType(el), rect: computeRect(el) });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClick, true);
    };
  }, [editMode, active]);

  // Close on Esc
  useEffect(() => {
    if (!editMode) return;
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [editMode]);

  if (!editMode) return null;

  const currentStyle = active ? (styles[active.path] || {}) : {};

  return (
    <>
      {/* Hover halo */}
      {hoverRect && (
        <div
          data-live-editor-ui="1"
          style={{
            position: 'absolute',
            top: hoverRect.top, left: hoverRect.left,
            width: hoverRect.width, height: hoverRect.height,
            border: '2px dashed rgba(201,162,39,0.85)',
            background: 'rgba(201,162,39,0.06)',
            zIndex: 9990, pointerEvents: 'none',
            transition: 'all 0.08s linear',
          }}
        />
      )}

      {/* Active selection halo */}
      {active && (
        <div
          data-live-editor-ui="1"
          style={{
            position: 'absolute',
            top: active.rect.top - 2, left: active.rect.left - 2,
            width: active.rect.width + 4, height: active.rect.height + 4,
            outline: '2px solid #c9a227',
            outlineOffset: '0px',
            background: 'transparent',
            zIndex: 9991, pointerEvents: 'none',
          }}
        />
      )}

      {active && (
        <EditToolbar
          key={active.path + (active.el === active.el ? '' : '')}
          target={active}
          currentStyle={currentStyle}
          onClose={() => setActive(null)}
        />
      )}

      {/* Section hide/show badges */}
      {sectionRects.map((sr) => {
        // Keep the badge clear of the fixed navbar at the top of the viewport.
        const minVpTop = 120;
        const vpTop = sr.rect.top - window.scrollY;
        const offsetTop = vpTop < minVpTop ? (window.scrollY + minVpTop) : (sr.rect.top + 14);
        return (
          <div
            key={sr.id}
            data-live-editor-ui="1"
            style={{
              position: 'absolute',
              top: offsetTop,
              left: Math.max(12, sr.rect.left + sr.rect.width - 192),
              zIndex: 999990,
            }}
          >
            <button
              type="button"
              data-testid={`section-toggle-${sr.id}`}
              onClick={(e) => {
                e.stopPropagation();
                setSectionHidden(sr.id, !sr.hidden);
              }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px',
                borderRadius: '999px',
                background: sr.hidden ? '#c9a227' : 'rgba(11,23,51,0.92)',
                color: sr.hidden ? '#0b1733' : '#f5efe6',
                border: '1px solid ' + (sr.hidden ? '#c9a227' : 'rgba(201,162,39,0.55)'),
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                boxShadow: '0 6px 14px rgba(0,0,0,0.18)',
                backdropFilter: 'blur(4px)',
              }}
              title={sr.hidden ? 'Restore this section' : 'Hide this section from the live site'}
            >
              {sr.hidden ? <Eye size={12} /> : <EyeOff size={12} />}
              {sr.hidden ? `Show ${sr.id}` : `Hide ${sr.id}`}
            </button>
          </div>
        );
      })}
    </>
  );
}

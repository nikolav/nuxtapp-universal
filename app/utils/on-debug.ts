import each from "lodash/each";

interface IDebugMessages {
  [event: string]: unknown;
}

const DEBUG_PREFIX = "@@DEBUG";

const styles = {
  prefix: `
    background:#6366f1;
    color:white;
    font-weight:700;
    padding:2px 8px;
    border-radius:6px;
  `,
  title: `
    color:#0f172a;
    font-weight:700;
    font-size:13px;
  `,
  label: `
    color:#64748b;
    font-size:12px;
    font-weight:600;
  `,
  value: `
    color:#334155;
    font-weight:500;
  `,
  timestamp: `
    color:#94a3b8;
    font-size:11px;
    font-style:italic;
  `,
};

export const onDebug = <T extends IDebugMessages = IDebugMessages>(
  events: T,
) => {
  const timestamp = new Date().toISOString();

  each(events, (value, eventName) => {
    console.groupCollapsed(
      `%c${DEBUG_PREFIX}%c ${eventName}`,
      styles.prefix,
      styles.title,
    );

    // ───────────────────────────────
    // Main payload
    // ───────────────────────────────
    if (typeof value === "object" && value !== null) {
      console.log(`%cPayload:`, styles.label);
      console.table(value);
      console.log(value); // expandable object view
    } else {
      console.log(`%cValue:%c`, styles.label, styles.value, value);
    }

    // ───────────────────────────────
    // Meta
    // ───────────────────────────────
    console.log(`%cTimestamp: ${timestamp}`, styles.timestamp);

    console.groupEnd();
  });
};

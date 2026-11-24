"use client";

import { useEditState, useFormValue, type ObjectInputProps } from "sanity";

/**
 * Sits at the top of every document and says, in plain words, whether what
 * Kathy is looking at is already on the live website or still waiting.
 */
export function StatusInput(props: ObjectInputProps) {
  const id = (useFormValue(["_id"]) as string | undefined) ?? "";
  const publishedId = id.replace(/^drafts\./, "");
  const { draft, published } = useEditState(publishedId, props.schemaType.name);

  const waiting = Boolean(draft);
  const isNew = waiting && !published;

  const box = {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
    padding: "10px 12px",
    margin: "0 0 18px",
    borderRadius: 10,
    fontSize: 13,
    lineHeight: 1.45,
    border: `1px solid ${waiting ? "#e6c07a" : "#b9d8c9"}`,
    background: waiting ? "#fff6e3" : "#eaf6ef",
    color: waiting ? "#6b4a0f" : "#1f5b3f",
  } as const;

  return (
    <>
      <div style={box} role="status">
        <span
          aria-hidden
          style={{ width: 10, height: 10, borderRadius: 999, marginTop: 4, flex: "none", background: waiting ? "#d99a1f" : "#2f9a64" }}
        />
        <span>
          {waiting ? (
            <>
              <strong>{isNew ? "Not on your website yet." : "Your changes are saved, but not on your live website yet."}</strong>{" "}
              Press <strong>Save to live site</strong> (bottom right) when you are ready.
            </>
          ) : (
            <>
              <strong>Live.</strong> This is exactly what your website shows. Nothing to save.
            </>
          )}
        </span>
      </div>
      {props.renderDefault(props)}
    </>
  );
}

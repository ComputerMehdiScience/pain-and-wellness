"use client";

import { useEffect, useRef } from "react";
import { set, useEditState, useFormValue, type SlugInputProps } from "sanity";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

// Fills the web address from the title while the post is still a draft,
// so Kathy never has to touch it. Once published, the address is left alone
// (changing it would break links people already have).
export function AutoSlugInput(props: SlugInputProps) {
  const title = useFormValue(["title"]) as string | undefined;
  const id = (useFormValue(["_id"]) as string | undefined) ?? "";
  const publishedId = id.replace(/^drafts\./, "");
  const { published } = useEditState(publishedId, "post");
  const current = props.value?.current;
  const lastTitle = useRef("");

  useEffect(() => {
    const previousAuto = slugify(lastTitle.current);
    lastTitle.current = title ?? "";
    if (published || props.readOnly || !title) return;
    if (!current || current === previousAuto) {
      const next = slugify(title);
      if (next && next !== current) props.onChange(set({ _type: "slug", current: next }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return props.renderDefault(props);
}

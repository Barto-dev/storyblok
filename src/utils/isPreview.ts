export default function isPreview() {
  // @ts-ignore
  return import.meta.env.STORYBLOK_IS_PREVIEW === 'yes';
}

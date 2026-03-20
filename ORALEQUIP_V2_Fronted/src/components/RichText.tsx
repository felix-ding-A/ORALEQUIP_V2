import { PortableText } from '@portabletext/react';
import { urlFor } from '../utils/sanity';

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          src={urlFor(value).width(800).auto('format').url()}
          alt={value.alt || 'Blog inline image'}
          loading="lazy"
          style={{ borderRadius: '0.75rem', width: '100%', marginTop: '2rem', marginBottom: '2rem' }}
        />
      );
    },
  },
};

export default function RichText({ value }: { value: any }) {
  return <PortableText value={value} components={portableTextComponents} />;
}

import type { BlogPost } from '../types';

const IMGS = {
    medical: 'https://images.unsplash.com/photo-1652787542567-f86c0b4c0269?w=800&q=80',
    clinic: 'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?w=800&q=80',
    equipment: 'https://images.unsplash.com/photo-1643386106343-18d5d3c64d47?w=800&q=80',
    abstract: 'https://images.unsplash.com/photo-1729870992116-5f1f59feb4ae?w=800&q=80',
};

function block(text: string, key: string) {
    return {
        _type: 'block' as const,
        _key: key,
        style: 'normal' as const,
        children: [{ _type: 'span' as const, text }],
    };
}

export const blogPosts: BlogPost[] = [
    {
        _id: '1',
        title: 'The Future of Digital Dentistry: Trends to Watch in 2026',
        slug: { current: 'future-of-digital-dentistry-2026' },
        excerpt: 'From AI-powered diagnostics to 3D-printed restorations, discover the technologies reshaping modern dental practice.',
        image: { url: IMGS.medical, alt: 'Digital dentistry trends 2026' },
        author: 'Dr. Sarah Chen',
        clinic: 'HI SMILE DENTAL',
        date: 'March 5, 2026',
        readTime: '8 min read',
        featured: true,
        body: [
            block('The landscape of dental technology is evolving at an unprecedented pace. In our clinic at HI SMILE DENTAL, we have been at the forefront of adopting transformative technologies, and 2026 promises even more exciting developments for the profession.', 'b1'),
            block('Artificial intelligence is rapidly moving from the research lab into everyday clinical use. Machine learning algorithms trained on millions of radiographs can now detect proximal caries with accuracy comparable to experienced clinicians, and flag subtle periapical lesions that might be missed on a busy schedule. We have been trialling one such system for six months, and it has already prompted us to reconsider several ambiguous cases.', 'b2'),
            block('3D printing, once a novelty, has become a practical chairside tool for many practices. Same-day surgical guides, temporary crowns, and study models can now be produced in-house at a fraction of the outsourcing cost. The material science continues to mature, with new resins offering mechanical properties approaching those of conventional PMMA and interim ceramic materials.', 'b3'),
            block('Intraoral scanning technology has reached a level of accuracy and ease-of-use that makes it genuinely superior to conventional impressions for most indications. The elimination of impression material, reduced patient gag-reflex challenges, and instant digital model availability in the cloud have convinced even the most skeptical clinicians in our team to make the switch permanently.', 'b4'),
        ],
    },
    {
        _id: '2',
        title: 'Choosing the Right Composite Resin: A Clinical Guide',
        slug: { current: 'choosing-right-composite-resin' },
        excerpt: 'A comprehensive comparison of nanofilled, microhybrid, and flowable composites for everyday restorative procedures.',
        image: { url: IMGS.clinic, alt: 'Composite resin clinical guide' },
        author: 'Dr. James Park',
        clinic: 'HI SMILE DENTAL',
        date: 'February 28, 2026',
        readTime: '6 min read',
        body: [
            block('Selecting the right composite resin for each clinical situation is one of the most impactful decisions a restorative dentist makes daily. With dozens of products on the market, the choice can be overwhelming. Based on our clinical experience at HI SMILE DENTAL, here is a practical framework.', 'b1'),
            block('For anterior restorations where aesthetics are paramount, nanofilled composites are the gold standard. Their submicron filler particles allow for a mirror-like polish that persists long-term, and their inherent translucency mimics natural enamel effectively. The trade-off is slightly lower wear resistance — acceptable for anterior use, but not ideal for load-bearing posterior contacts.', 'b2'),
            block('For posterior restorations, microhybrid composites strike the best balance of strength, wear resistance, and acceptable aesthetics. Their larger mean particle size provides the mechanical reinforcement needed to withstand occlusal forces, while still offering reasonable polishability.', 'b3'),
        ],
    },
    {
        _id: '3',
        title: 'Ergonomics in Dentistry: Preventing Occupational Injuries',
        slug: { current: 'ergonomics-in-dentistry' },
        excerpt: 'Learn practical strategies for reducing musculoskeletal strain and improving work posture during dental procedures.',
        image: { url: IMGS.equipment, alt: 'Dental ergonomics' },
        author: 'Dr. Maria Lopez',
        clinic: 'HI SMILE DENTAL',
        date: 'February 20, 2026',
        readTime: '5 min read',
        body: [
            block('Musculoskeletal disorders (MSDs) affect up to 62% of dentists at some point in their career. Back pain, neck strain, and repetitive stress injuries of the hand and wrist are occupational hazards that accumulate silently over years of practice. Prevention is far more effective than treatment, and the good news is that most risk factors are addressable with the right equipment choices and conscious technique adjustments.', 'b1'),
            block('The single most impactful change most dentists can make is adjusting their working position and stool height. The ideal position keeps forearms roughly parallel to the floor, elbows close to the body, and the patient head at elbow height. A properly adjustable saddle stool can help maintain the lumbar curve and reduce disc compression during long procedures.', 'b2'),
        ],
    },
    {
        _id: '4',
        title: 'Infection Control Best Practices for Modern Dental Clinics',
        slug: { current: 'infection-control-dental-clinics' },
        excerpt: 'Updated protocols and equipment recommendations for maintaining the highest sterilization standards.',
        image: { url: IMGS.abstract, alt: 'Dental infection control' },
        author: 'Dr. Ahmed Hassan',
        clinic: 'HI SMILE DENTAL',
        date: 'February 15, 2026',
        readTime: '7 min read',
        body: [
            block('Infection control is non-negotiable in dental practice. Proper protocols protect both patients and the clinical team. Since the COVID-19 pandemic, many clinics have overhauled their infection control procedures, and the updated standards are here to stay.', 'b1'),
            block('The transition to fully automated washer-disinfectors for instrument reprocessing has been one of the most significant quality improvements we implemented at HI SMILE DENTAL. Compared to manual cleaning, validated washer-disinfectors deliver reproducible cleaning cycles that are documented, traceable, and far less dependent on operator compliance.', 'b2'),
        ],
    },
    {
        _id: '5',
        title: 'Understanding Dental Adhesives: 7th Generation Systems',
        slug: { current: 'dental-adhesives-7th-generation' },
        excerpt: 'An evidence-based review of modern bonding agents and their clinical performance across different substrates.',
        image: { url: IMGS.medical, alt: 'Dental adhesive systems' },
        author: 'Dr. Sarah Chen',
        clinic: 'HI SMILE DENTAL',
        date: 'February 10, 2026',
        readTime: '9 min read',
        body: [
            block("7th generation universal adhesives have transformed bonding protocols in modern dentistry. The \"universal\" designation means a single bottle can be used in self-etch, selective-etch, or total-etch mode, across enamel, dentin, metal, zirconia, glass-ceramic, and composite substrates.", 'b1'),
            block("From a clinical perspective, the simplified inventory is a major practical advantage: instead of stocking separate generations of adhesive for different indications, one universal product handles all cases. The evidence base, now accumulated over a decade of clinical trials, supports their use with confidence.", 'b2'),
        ],
    },
    {
        _id: '6',
        title: 'Sustainable Dentistry: Eco-Friendly Supplies and Practices',
        slug: { current: 'sustainable-dentistry-eco-friendly' },
        excerpt: 'How dental clinics can reduce their environmental footprint without compromising patient care quality.',
        image: { url: IMGS.clinic, alt: 'Sustainable dental practice' },
        author: 'Dr. James Park',
        clinic: 'HI SMILE DENTAL',
        date: 'February 3, 2026',
        readTime: '4 min read',
        body: [
            block("Dentistry generates a surprising amount of waste — from single-use plastic barriers and disposable prophy angles to expired medications and amalgam. As an industry directly involved in health, we have both an opportunity and a responsibility to reduce our environmental impact.", 'b1'),
            block("At HI SMILE DENTAL, we began our sustainability journey by conducting a waste audit — simply cataloguing every category of waste by volume over one month. The results were eye-opening. Single-use barriers accounted for the largest volume, followed by impression materials and sterilisation pouches.", 'b2'),
        ],
    },
];

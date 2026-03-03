import { notFound } from 'next/navigation';
import PortfolioPage from '@/components/portfolio/portfolioPage';
import dbConnect from '@/lib/mongodb';
import CaseStudy from '@/models/CaseStudy';

export async function generateMetadata({ params }) {
  await dbConnect();
   const slugToFind = params.slug.startsWith('/') ? params.slug : `/${params.slug}`;
    const caseStudy = await CaseStudy.findOne({ 
      $or: [
        { slug: params.slug },
        { slug: slugToFind }
      ]
    }).lean();
  
  if (!caseStudy) return {};

  return {
    title: {
      absolute: caseStudy.metaTitle || caseStudy.name,
    },
    description: caseStudy.metaDescription || '',
    keywords: caseStudy.metaKeywords || '',
  };
}

export default async function CaseStudyDynamicPage({ params }) {
  await dbConnect();
  const slugToFind = params.slug.startsWith('/') ? params.slug : `/${params.slug}`;
  const caseStudy = await CaseStudy.findOne({ 
    $or: [
      { slug: params.slug },
      { slug: slugToFind }
    ]
  }).lean();

  if (!caseStudy) {
    notFound();
  }

  // Ensure the data structure matches what PortfolioPage expects
  // The PortfolioPage expects props that match the model fields
  return (
    <div className="bg-black text-white min-h-screen">
      <PortfolioPage {...caseStudy} />
    </div>
  );
}

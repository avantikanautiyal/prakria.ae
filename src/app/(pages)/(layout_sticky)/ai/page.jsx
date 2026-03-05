import dbConnect from '../../../../lib/mongodb';
import CaseStudy from '../../../../models/CaseStudy';
import SubService from '../../../../models/SubService';
import OurWorkSection from '../../../../components/service/ourWorkSection';
import WhyChoose from '../../../../components/service/whyChoose';
import HowWeWork from '../../../../components/service/howWeWork';
import ServiceFAQSection from '../../../../components/service/faqSection';
import AiCoreServicesGrid from '../../../../components/service/AiCoreServicesGrid';
import HeroSection from '../../../../components/service/heroSectionNew';
import StartageySection from '@/components/portfolio/startagySection';
import ExecutionSection from '@/components/portfolio/executionSection';

export const metadata = {
  title: "AI Services & Solutions | PRAKRIA TECH",
  description: "Leverage AI-powered content creation, video, and music generation to scale your creative production. PRAKRIA TECH blends advanced AI models with human expertise.",
  keywords: "AI services, AI content creation, AI video production, generative AI for brands, PRAKRIA TECH",
};

async function getAiDynamicData() {
  await dbConnect();
  const caseStudies = await CaseStudy.find({
    name: { $regex: /ai/i }
  }).sort({ createdAt: -1 }).lean();
  const subServices = await SubService.find({}).sort({ createdAt: -1 }).lean();
  return { caseStudies, subServices };
}

export default async function AiServicePage() {
  const { caseStudies, subServices } = await getAiDynamicData();

  const heroProps = {
    title: "AI Services That Drive Growth",
    description: "In today's fast-evolving digital ecosystem, differentiation is no longer optional, it is structural. Brands, from early-stage startups to large enterprises, are under constant pressure to produce more content, more media, and more experiences at scale. This is where PRAKRIA TECH steps in.\n\nWith over 20 years of creative and production experience, we integrate AI-powered content creation, AI video creation, and AI music generation into practical, scalable workflows. Our approach blends advanced AI models with human oversight to deliver reliable, brand-safe outputs that improve speed, efficiency, and consistency across creative production.\n\nOur AI services are designed to help businesses produce more without compromising quality, enabling faster go-to-market and better utilization of creative resources.",
    buttonText: "Enquire Now",
    buttonLink: "#",
  };

  const workProps = {
    title: "Our Work",
    description: "Witness the practical application of AI in real-world creative production. Our portfolio reflects how we've partnered with brands across industries to deploy AI for content, video, and audio creation at scale, without losing strategic or creative control.",
    list: caseStudies.map((item) => ({
      src: item.herosection?.list?.[0]?.src || "/images/placeholder.jpg",
      alt: item.herosection?.list?.[0]?.alt || item.name,
      link: `/case-study${item.slug}`,
      type: item.herosection?.list?.[0]?.type || "image",
    })),
  };

  const whyProps = {
    title: "Why Choose PRAKRIA as Your AI Services Company?",
    description: "Choosing the right AI service provider determines whether AI becomes a growth enabler or an operational risk. At PRAKRIA TECH, we do not treat AI as a standalone toolset; we design AI-powered creative systems aligned to business objectives.",
    list: [
      {
        src: "/icon/service/proven-expertise.png",
        title: "Proven Expertise",
        description: "With decades of experience in creative production, we understand where AI adds value, and where human judgment remains critical.",
      },
      {
        src: "/icon/service/end-to-end.png",
        title: "End-to-End Services",
        description: "From AI content creation to AI video production and AI-generated music, our solutions cover the full creative pipeline.",
      },
      {
        src: "/icon/service/consultative.png",
        title: "Consultative Approach",
        description: "We operate as strategic partners, helping clients decide how and where to deploy AI effectively, not just executing outputs.",
      },
      {
        src: "/icon/service/focus-roi.png",
        title: "Focus on ROI",
        description: "Every AI implementation is evaluated against efficiency gains, cost reduction, and output quality; nothing is deployed without measurable benefit.",
      },
    ],
  };

  const coreServicesProps = {
    title: "Our Core AI Services",
    description: "Explore our cutting-edge AI-powered services designed to revolutionize your creative production and business growth.",
  };

  const howWorkProps = {
    title: "How We Work",
    description: "Our structured approach ensures that AI is integrated seamlessly into your existing creative workflows.",
    list: [
      { count: "01", title: "Discovery", description: "We analyze your creative needs and identify the best AI models for your specific requirements." },
      { count: "02", title: "Strategy", description: "Developing a tailored AI adoption roadmap aligned with your brand's voice and goals." },
      { count: "03", title: "Implementation", description: "Executing AI-powered production workflows with rigorous human oversight." },
      { count: "04", title: "Optimization", description: "Continuously refining models and workflows to improve output quality and efficiency." },
    ],
  };

  const benefitProps = {
    title: "Benefits of Partnering with PRAKRIA",
    description: "When you work with PRAKRIA TECH, you are not just outsourcing AI execution, you are building sustainable creative infrastructure.",
    list: [
      { src: "/icon/service/benefit-1.png", title: "Faster production cycles across content, video, and audio" },
      { src: "/icon/service/benefit-2.png", title: "Reduced operational and creative costs" },
      { src: "/icon/service/benefit-3.png", title: "Consistent brand output at scale" },
      { src: "/icon/service/benefit-4.png", title: "Improved speed-to-market" },
      { src: "/icon/service/benefit-5.png", title: "Controlled and responsible AI adoption" },
    ],
  };

  const faqProps = {
    title: "Frequently Asked Questions",
    description: "Got questions? We've got answers. Transparency is central to how we implement AI for our clients.",
    list: [
      {
        question: "What makes PRAKRIA different from other AI service providers?",
        answer: "We combine AI with decades of creative and production experience. Unlike tool-first vendors, we design AI workflows around real business use cases.",
      },
      {
        question: "How reliable is AI-generated content and media?",
        answer: "Our human-in-the-loop approach ensures every AI output meets brand standards and maintains creative integrity.",
      },
      {
        question: "Is AI suitable for all brands?",
        answer: "Yes, we tailor AI solutions to fit brands of all sizes, ensuring that the technology serves the brand's unique needs.",
      },
      {
        question: "Do I need all AI services at once?",
        answer: "No, we recommend a phased approach, starting with the services that offer the highest immediate impact for your brand.",
      },
    ],
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      <div className="space-y-[48px] container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <HeroSection {...heroProps} />
        <OurWorkSection {...workProps} />
        <ExecutionSection {...whyProps} />
        <AiCoreServicesGrid
          subServices={JSON.parse(JSON.stringify(subServices))}
          title={coreServicesProps.title}
          description={coreServicesProps.description}
        />
        <ExecutionSection {...benefitProps} title={benefitProps.title} />
        <ServiceFAQSection {...faqProps} />
      </div>
    </div>
  );
}

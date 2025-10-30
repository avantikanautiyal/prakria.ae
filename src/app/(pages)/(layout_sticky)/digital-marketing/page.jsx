// "use client";
// import React, { useState } from "react";
// import GridMasonry from "@/components/ui/GridMasonry";
// import data_service from "@/data/data_service.json";
// import CardsSection from "@/components/service/CardsSection";
// import HeroseSection from "@/components/service/herosSection";
// import Home1Blog from "@/components/home/blogCard";
// import EnquireBtn from "@/components/global/enquirenow";
// import { Faq } from "@/components/global/faq";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// export const metadata = {
//   title: {
//     absolute: "Digital Marketing - Lead the Era of DIGITAL DOMINATION",
//   },
//   description:
//     "In the era that’s growing more &amp; more digital by the day, lead the way with PRAKRIA’s 20+ years of expertise in the creative industry.",
// };
// function Page() {
//   const data = data_service["/digital-marketing"];
//   console.log(" ====== , digital-marketing");
//   return <></>
//   return (
//     <div>
//       <div className="service-page-hero">
//         <div className="container text-center">
//           <div className="banner-wrapper">
//             <div className="banner-content">
//               <h1>Lead the Era of DIGITAL DOMINATION</h1>
//               <p>
//                 In the era that’s growing more & more digital by the day, lead
//                 the way with PRAKRIA’s 20+ years of expertise in the creative
//                 industry. Our digital marketing services are meticulously
//                 crafted to reshape your brand&apos;s online landscape. From
//                 captivating content strategies to cutting-edge campaigns, we
//                 unlock the full potential of your brand in the digital realm.
//                 Trust our insights to catapult your brand to new heights.
//               </p>
//               <EnquireBtn />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <img src=""/> */}
//       <div className="container-fluid">
//         <GridMasonry random={false} data={data?.content} />
//       </div>
//       <CardsSection data={data?.CardsSection} />

import Servicepage from "@/components/service/Servicepage";
import serviceData from "@/data/service_page.json";

//       <HeroseSection data={data?.sub} />
//       <div className="container">
//         <div className="text-center">
//           <h2>
//             Looking for specific Digital Marketing Services to kickstart your
//             Digital plans?
//           </h2>
//           <p>
//             Explore the cornucopia of digital marketing services best suited for
//             your business.
//           </p>
//         </div>
//         <div className="row mb-5">
//           {data?.cardsSection.cards.map((card, index) => {
//             return <ContentCard {...card} key={index} />;
//           })}
//         </div>
//       </div>
//       <Home1Blog />

//       <Faq data={data?.faq} />
//     </div>
//   );
// }

// const SeoIcon = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
//     <path d="M13 13l6 6" />
//   </svg>
// );

// const SocialMediaIcon = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//     <circle cx="9" cy="7" r="4" />
//     <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//     <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//   </svg>
// );

// const PpcIcon = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M12 20V10" />
//     <path d="M18 20V4" />
//     <path d="M6 20v-4" />
//   </svg>
// );

// const EmailIcon = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <rect width="20" height="16" x="2" y="4" rx="2" />
//     <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//   </svg>
// );

// const ContentIcon = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
//     <path d="m15 5 4 4" />
//   </svg>
// );

// const OrmIcon = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
//     <path d="m9 12 2 2 4-4" />
//   </svg>
// );

// const InfluencerIcon = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M7 7h10v10" />
//     <path d="M7 17 17 7" />
//     <path d="M17 17H7V7" />
//   </svg>
// );

// const portfolioImages = [
//   {
//     src: "/assets_main/services/digital_marketing/1.webp",
//     alt: "Maggi project screenshot",
//   },
//   {
//     src: "/assets_main/services/digital_marketing/2.webp",
//     alt: "Mobile app design screenshot",
//   },
//   {
//     src: "/assets_main/services/digital_marketing/3.gif",
//     alt: "E-commerce app screenshot",
//   },
//   {
//     src: "/assets_main/services/digital_marketing/4.gif",
//     alt: "Dove product page design",
//   },
//   {
//     src: "/assets_main/services/digital_marketing/5.gif",
//     alt: "Cosmetics brand website design",
//   },
//   {
//     src: "/assets_main/services/digital_marketing/dm1.gif",
//     alt: "Social media post for Valentine's Day",
//   },
//   {
//     src: "/assets_main/services/digital_marketing/dm2.gif",
//     alt: "Instagram post design for a brand",
//   },
//   {
//     src: "/assets_main/services/digital_marketing/dm3.webp",
//     alt: "Website design mockup on multiple devices",
//   },
// ];
// const features = [
//   {
//     icon: "⚡", // Using unicode characters as placeholders for icons
//     title: "Proven Expertise",
//     description:
//       "With FMCG heritage and creative roots, we stand in a unique place to design campaigns that marry creativity with measurable performance.",
//   },
//   {
//     icon: "🔗",
//     title: "End-to-End Services",
//     description:
//       "From awareness to conversion, our integrated solutions cover every touchpoint of the digital journey.",
//   },
//   {
//     icon: "👥",
//     title: "Consultative Approach",
//     description:
//       "Sometimes we really act like strategic partners, and sometimes we feel like digital marketing consultants who just give insight.",
//   },
//   {
//     icon: "✨",
//     title: "Focus on ROI",
//     description:
//       "Everything must come back to what really matters: more traffic, more leads, and more revenue.",
//   },
// ];
// // --- Data for Services ---
// const servicesData = [
//   {
//     id: "seo",
//     name: "SEO (Search Engine Optimization)",
//     icon: SeoIcon,
//     title: "SEO (Search Engine Optimization)",
//     description:
//       "Seo search engine optimization Visibility on search engines is the pillar of digital success. Our SEO services make sure your website ranks at the top, produces quality traffic, and enjoys long-term visibility. As an SEO-focused agency, we focus on:",
//     focusAreas: [
//       "In-depth keyword research",
//       "On-page and technical optimization",
//       "High-quality backlink building",
//       "Local SEO for location-based businesses",
//       "Analytics and performance tracking",
//     ],
//     closingNote:
//       "With the right SEO strategy, your brand doesn't just appear online – it dominates the search results.",
//   },
//   {
//     id: "social",
//     name: "Social Media Marketing",
//     icon: SocialMediaIcon,
//     title: "Social Media Marketing",
//     description:
//       "Harness the power of social platforms to build a community and engage your audience. We create compelling content and targeted ad campaigns that drive conversations and conversions.",
//     focusAreas: [
//       "Content strategy and creation",
//       "Community management",
//       "Paid social advertising",
//       "Social listening and analytics",
//       "Platform-specific campaigns",
//     ],
//     closingNote: "We turn followers into fans, and fans into loyal customers.",
//   },
//   {
//     id: "ppc",
//     name: "PPC & Performance Marketing",
//     icon: PpcIcon,
//     title: "PPC & Performance Marketing",
//     description:
//       "Get instant, measurable results with data-driven PPC campaigns. We optimize every click to ensure maximum return on ad spend (ROAS) across Google, Bing, and social platforms.",
//     focusAreas: [
//       "Search & Display Ads (Google/Bing)",
//       "Shopping & P-Max campaigns",
//       "Social media PPC (Meta, LinkedIn)",
//       "Landing page optimization",
//       "Conversion rate optimization (CRO)",
//     ],
//     closingNote:
//       "We don't just buy traffic; we buy conversions that fuel your growth.",
//   },
//   {
//     id: "email",
//     name: "Email Marketing",
//     icon: EmailIcon,
//     title: "Email Marketing",
//     description:
//       "Nurture leads and build lasting customer relationships with sophisticated email marketing. From automation flows to engaging newsletters, we deliver the right message at the right time.",
//     focusAreas: [
//       "Automation & drip campaigns",
//       "Newsletter strategy & design",
//       "List segmentation & management",
//       "A/B testing & optimization",
//       "Compliance & deliverability",
//     ],
//     closingNote:
//       "We make your brand the one email your customers look forward to opening.",
//   },
//   {
//     id: "content",
//     name: "Content Marketing & Blogging",
//     icon: ContentIcon,
//     title: "Content Marketing & Blogging",
//     description:
//       "Become an authority in your industry with high-quality, relevant content. We create blogs, articles, whitepapers, and videos that attract, educate, and convert your target audience.",
//     focusAreas: [
//       "Blog & article writing",
//       "Video production & scripting",
//       "E-books & whitepapers",
//       "Infographic design",
//       "Content distribution & promotion",
//     ],
//     closingNote:
//       "Great content doesn't just rank; it builds trust and drives action.",
//   },
//   {
//     id: "orm",
//     name: "Online Reputation Management (ORM)",
//     icon: OrmIcon,
//     title: "Online Reputation Management (ORM)",
//     description:
//       "Control your digital narrative. We monitor, protect, and enhance your online reputation, ensuring that positive feedback shines and negative comments are handled professionally.",
//     focusAreas: [
//       "Brand monitoring & sentiment analysis",
//       "Review generation strategies",
//       "Negative review response",
//       "Search result suppression",
//       "Crisis management",
//     ],
//     closingNote: "Your reputation is your most valuable asset. We protect it.",
//   },
//   {
//     id: "influencer",
//     name: "Influencer & Affiliate Marketing",
//     icon: InfluencerIcon,
//     title: "Influencer & Affiliate Marketing",
//     description:
//       "Amplify your reach by partnering with trusted voices. We identify, vet, and manage relationships with influencers and affiliates who align with your brand and speak to your audience.",
//     focusAreas: [
//       "Influencer identification & outreach",
//       "Campaign strategy & execution",
//       "Affiliate program management",
//       "Performance tracking & ROI",
//       "Contract negotiation",
//     ],
//     closingNote:
//       "We connect your brand with the voices your customers already trust.",
//   },
// ];
// // Data for the "How We Work" section
// const approachSteps = [
//   {
//     number: "01",
//     title: "Discovery & Research",
//     description:
//       "The start is always with us trying to comprehend your brand, intended clientele, and aims. By doing research and audits, we come up with the ideas that you make stand out from the rest of the competition.",
//   },
//   {
//     number: "02",
//     title: "Strategic Planning",
//     description:
//       "The team of our company will provide you with a very detailed plan of how to be successful in the digital world - starting from SEO services and social media marketing and going through to performance marketing and PPC campaigns, all this will be done in such a way that your objectives will be met, and the ROI will be maximized.",
//   },
//   {
//     number: "03",
//     title: "Creative Execution",
//     description:
//       "Good ideas turn to reality through great design, the creation of good content, and targeted campaigns. It may be digital marketing services, website development, or social media marketing; in any case, we deliver with creativity and accuracy.",
//   },
// ];

// // Data for the FAQ section
// const faqData = [
//   {
//     question:
//       "What makes PRAKRIA different from other digital marketing agencies?",
//     answer:
//       "We execute a combination of more than 20 years of creative work with data-driven implementation. Contrary to many PPC or SEO companies, we do not treat each digital marketing aspect as an independent one but rather create an integrated strategy that fits your brand.",
//   },
//   {
//     question: "How long does it take to see results from SEO?",
//     answer:
//       "SEO is a long-term strategy, and results typically start appearing within 3-6 months, with significant improvements often seen after 6-12 months. Factors like competition, current website health, and industry play a role.",
//   },
//   {
//     question: "Is PPC marketing expensive?",
//     answer:
//       "PPC costs vary widely based on industry, keywords, and competition. However, it offers immediate visibility and measurable ROI, allowing for precise budget control and optimization to ensure cost-effectiveness.",
//   },
//   {
//     question: "Can social media really help my business?",
//     answer:
//       "Absolutely! Social media is crucial for brand awareness, customer engagement, lead generation, and driving traffic to your website. A well-executed social media strategy can significantly boost your brand's online presence and sales.",
//   },
// ];

// function Page() {
//   const [selectedService, setSelectedService] = useState("seo");
//   const activeService = servicesData.find((s) => s.id === selectedService);

//   return (
//     <div className="bg-black text-white min-h-screen font-sans antialiased">
//       {/* Main content container with responsive padding and max-width */}
//       <div className="space-y-[48px] container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
//         {/* --- Hero Section --- */}
//         <section className="flex px-0 py-4  md:p-4 flex-col gap-4 text-center mb-20 sm:mb-32">
//           <h1 className="text-balance text-4xl md:text-5xl font-bold tracking-tight mb-6">
//             Digital Marketing Services That Drive Growth
//           </h1>
//           <p className="text-left md:text-center  text-balance mx-auto text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
//             In this ever-changing digital world, being differentiated is
//             considered vital. Any brand, from startups to big enterprises, must
//             have a winning online presence that draws attention and drives
//             sales. This is where your digital marketing agency, PRAKRIA, comes
//             in. With more than 20 years of creative experience and exposure to
//             various industries, we blend data-driven strategies with creative
//             storytelling to offer end-to-end digital marketing solutions. We
//             intend for your business to dominate in digital marketing; hence,
//             our marketing services include SEO, social media marketing, PPC (pay
//             per click) campaigns, and email marketing.
//           </p>
//           <div className="flex justify-center items-center ">
//             <button className="bg-[#363636] text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300 shadow-lg">
//               Enquire Now
//             </button>
//           </div>
//         </section>

//         {/* --- "Our Work" Section --- */}
//         <section className="mb-20  sm:mb-32">
//           {/* Section Header */}
//           <div className="text-center mb-12 sm:mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
//               Our Work
//             </h2>
//             <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
//               Witness the brilliance of our previous projects. Our portfolio
//               showcases the successful collaborations we've had with diverse
//               clients across various industries. Let our work speak for itself.
//             </p>
//           </div>

//           {/* Portfolio Image Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[10px]">
//             {portfolioImages.map((image, index) => (
//               <div
//                 key={index}
//                 className="rounded-lg overflow-hidden shadow-2xl bg-gray-900 transition-transform duration-300 hover:scale-105 aspect-square flex items-center justify-center"
//               >
//                 <img
//                   src={image.src}
//                   alt={image.alt}
//                   className="w-full h-full object-cover aspect-square"
//                 />
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* --- "Why Choose PRAKRIA" Section --- */}
//         <section className="text-center">
//           {/* Section Header */}
//           <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
//               Why Choose PRAKRIA as Your Digital Marketing Company?
//             </h2>
//             <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
//               A right digital marketing service provider can make the difference
//               between mediocre online visibility and stratospheric success. At
//               PRAKRIA we do not just run campaigns; we create digital
//               experiences wherein a brand interacts with an audience.
//             </p>
//           </div>

//           {/* New Features Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-center p-6  rounded-lg     transition-all duration-300"
//               >
//                 <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 border border-gray-700">
//                   {/* Using a large emoji for the icon, you might replace this with SVG/image icons */}
//                   <span
//                     className="text-4xl"
//                     role="img"
//                     aria-label={feature.title}
//                   >
//                     {feature.icon}
//                   </span>
//                 </div>
//                 <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
//                   {feature.title}
//                 </h3>
//                 <p className="text-base text-gray-400 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* --- NEW: "Our Core Digital Marketing Services" Section --- */}
//         <section className="mb-20 sm:mb-32">
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-12 sm:mb-16 text-center">
//             Our Core Digital Marketing Services
//           </h2>

//           <div className="flex flex-col lg:flex-row gap-12">
//             {/* Left Column: Navigation */}
//             <div className="flex-none lg:w-1/3 space-y-2">
//               {servicesData.map((service) => (
//                 <button
//                   key={service.id}
//                   onClick={() => setSelectedService(service.id)}
//                   className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 text-left ${
//                     selectedService === service.id
//                       ? "bg-gray-800 text-white"
//                       : "text-gray-400 hover:bg-gray-900 hover:text-white"
//                   }`}
//                 >
//                   <service.icon className="w-6 h-6 flex-shrink-0" />
//                   <span className="font-medium">{service.name}</span>
//                 </button>
//               ))}
//             </div>

//             {/* Right Column: Content */}
//             {activeService && (
//               <div className="flex-1 lg:pl-8">
//                 <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-white">
//                   {activeService.title}
//                 </h3>
//                 <p className="text-lg text-gray-300 leading-relaxed mb-8">
//                   {activeService.description}
//                 </p>

//                 {/* Focus Area Box */}
//                 <div className="border border-gray-700 rounded-lg p-6 sm:p-8 mb-8">
//                   <h4 className="text-xl sm:text-2xl font-semibold mb-6">
//                     As a dedicated {activeService.id.toUpperCase()} agency, we
//                     focus on:
//                   </h4>
//                   <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
//                     {activeService.focusAreas.map((area, index) => (
//                       <li key={index} className="text-gray-300">
//                         {area}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Closing Note Box */}
//                 <div className="border border-gray-700 rounded-lg p-6 sm:p-8">
//                   <p className="text-lg text-gray-300 italic">
//                     {activeService.closingNote}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* --- NEW: "How We Work" Section --- */}
//         <section className="mb-20 sm:mb-32">
//           {/* Section Header */}
//           <div className="text-center mb-12 sm:mb-16">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
//               How We Work – The PRAKRIA Approach
//             </h2>
//             <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed">
//               Our belief at PRAKRIA is that every brand is entitled to a
//               personalized road map for the digital world. Our methodology is a
//               combination of creativity, strategy, and performance, so you don't
//               only get campaigns – you get results.
//             </p>
//           </div>

//           {/* Steps List */}
//           <div className="space-y-4 container mx-auto">
//             {approachSteps.map((step) => (
//               <div
//                 key={step.number}
//                 className="p-4 flex flex-col md:flex-row items-start gap-6 md:gap-10"
//               >
//                 {/* Number */}
//                 <div className="text-7xl lg:text-8xl font-bold  w-24 flex-shrink-0 leading-none pt-1">
//                   {step.number}
//                 </div>
//                 {/* Content */}
//                 <div className="flex-1">
//                   <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-white">
//                     {step.title}
//                   </h3>
//                   <div className="bg-[#0F0F0F] border-2 border-[#2b2b2b] rounded-lg p-6 sm:p-8 shadow-xl">
//                     <p className="text-sm text-gray-300 leading-relaxed">
//                       {step.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* --- "Why Choose PRAKRIA" Section --- */}
//         <section className="text-center">
//           {/* Section Header */}
//           <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
//               Why Choose PRAKRIA as Your Digital Marketing Company?
//             </h2>
//             <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
//               A right digital marketing service provider can make the difference
//               between mediocre online visibility and stratospheric success. At
//               PRAKRIA we do not just run campaigns; we create digital
//               experiences wherein a brand interacts with an audience.
//             </p>
//           </div>

//           {/* New Features Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-center p-6 rounded-lg transition-all duration-300"
//               >
//                 <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 border border-gray-700">
//                   {/* Using a large emoji for the icon, you might replace this with SVG/image icons */}
//                   <span
//                     className="text-4xl"
//                     role="img"
//                     aria-label={feature.title}
//                   >
//                     {feature.icon}
//                   </span>
//                 </div>

//                 <p className="text-base text-gray-400 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="mb-20 sm:mb-32">
//           {/* Section Header */}

//           <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
//               Frequently Asked Questions
//             </h2>
//             <p className="mx-auto max-w-4xl text-sm md:text-sm sm:text-sm text-gray-300 mb-10 leading-relaxed">
//               Got questions? We've got answers. Check out our frequently asked
//               questions section to find valuable insights into our processes,
//               pricing, and more. Transparency is at the core of our client
//               interactions.
//             </p>
//           </div>

//           {/* FAQ Accordion */}
//           <div className="container mx-auto space-y-6">
//             {faqData.map((item, index) => (
//               <Accordion
//                 key={index}
//                 type="single"
//                 collapsible
//                 className="w-full"
//               >
//                 <AccordionItem value="item-1" className="border-[#2b2b2b]">
//                   <AccordionTrigger className="text-start text-lg">
//                     {item.question}
//                   </AccordionTrigger>
//                   <AccordionContent>{item.answer}</AccordionContent>
//                 </AccordionItem>
//               </Accordion>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// function ContentCard({ title, description }) {
//   return (
//     <div
//       className="col-lg-6 mb-4 col-md-6 wow animate fadeInDown"
//       data-wow-delay="200ms"
//       data-wow-duration="1500ms"
//       style={{
//         visibility: "visible",
//         animationDuration: "1500ms",
//         animationDelay: "200ms",
//       }}
//     >
//       <div className="about-feature-card d-flex p-4">
//         <div className="content">
//           <h4 className="mb-2">{title}</h4>
//           <p className="text-sm">{description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

function Page() {
  const data = serviceData["/digital-marketing"];

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      {/* Main content container with responsive padding and max-width */}
      <div className="space-y-[48px] container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Servicepage {...data} />
      </div>
    </div>
  );
}

export default Page;

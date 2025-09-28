const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create sample templates
  const landingPageTemplate = await prisma.template.create({
    data: {
      name: 'Landing Page',
      description: 'Professional landing page with hero, features, and CTA',
      category: 'landing',
      components: [
        {
          id: 'navbar-template',
          label: 'Navbar',
          type: 'navbar',
          uniqueId: 'navbar-template-1',
          props: {
            siteName: 'Your Brand',
            menuItems: ['Home', 'Features', 'Pricing', 'Contact'],
            backgroundColor: 'bg-blue-600',
            textColor: 'text-white',
          },
        },
        {
          id: 'hero-template',
          label: 'Hero Section',
          type: 'hero',
          uniqueId: 'hero-template-1',
          props: {
            title: 'Transform Your Business Today',
            subtitle: 'Discover the power of our innovative solutions that help businesses grow and succeed in the digital age.',
            buttonText: 'Get Started Free',
            backgroundColor: 'bg-gradient-to-r from-indigo-500 to-purple-600',
          },
        },
        {
          id: 'content-template',
          label: 'Content Block',
          type: 'content',
          uniqueId: 'content-template-1',
          props: {
            title: 'Why Choose Our Platform?',
            leftTitle: 'Powerful Features',
            leftContent: 'Our platform provides everything you need to build, deploy, and scale your applications with confidence.',
            rightTitle: 'Key Benefits',
            rightList: [
              'Lightning-fast performance',
              'Enterprise-grade security',
              'Seamless integrations',
              '24/7 expert support',
            ],
          },
        },
        {
          id: 'cta-template',
          label: 'Call to Action',
          type: 'cta',
          uniqueId: 'cta-template-1',
          props: {
            title: 'Ready to Get Started?',
            subtitle: 'Join thousands of satisfied customers who have transformed their business with our platform.',
            primaryButton: 'Start Free Trial',
            secondaryButton: 'Schedule Demo',
            backgroundColor: 'bg-orange-500',
          },
        },
        {
          id: 'footer-template',
          label: 'Footer',
          type: 'footer',
          uniqueId: 'footer-template-1',
          props: {
            siteName: 'Your Brand',
            description: 'Building the future of digital solutions, one innovation at a time.',
            links: ['Privacy Policy', 'Terms of Service', 'Support'],
            copyright: '© 2025 Your Brand. All rights reserved.',
          },
        },
      ],
    },
  });

  const portfolioTemplate = await prisma.template.create({
    data: {
      name: 'Portfolio',
      description: 'Showcase your work with this elegant portfolio template',
      category: 'portfolio',
      components: [
        {
          id: 'navbar-portfolio',
          label: 'Navbar',
          type: 'navbar',
          uniqueId: 'navbar-portfolio-1',
          props: {
            siteName: 'John Doe',
            menuItems: ['About', 'Portfolio', 'Services', 'Contact'],
            backgroundColor: 'bg-gray-800',
            textColor: 'text-white',
          },
        },
        {
          id: 'hero-portfolio',
          label: 'Hero Section',
          type: 'hero',
          uniqueId: 'hero-portfolio-1',
          props: {
            title: 'Creative Designer & Developer',
            subtitle: 'I create beautiful, functional, and user-friendly digital experiences that make a lasting impact.',
            buttonText: 'View My Work',
            backgroundColor: 'bg-gradient-to-r from-blue-500 to-teal-500',
          },
        },
        {
          id: 'content-portfolio',
          label: 'Content Block',
          type: 'content',
          uniqueId: 'content-portfolio-1',
          props: {
            title: 'About Me',
            leftTitle: 'My Expertise',
            leftContent: 'With over 5 years of experience in design and development, I specialize in creating digital solutions that combine aesthetics with functionality.',
            rightTitle: 'Services',
            rightList: [
              'Web Design & Development',
              'Mobile App Development',
              'Brand Identity Design',
              'UI/UX Consulting',
            ],
          },
        },
      ],
    },
  });

  console.log('✅ Templates created:', {
    landingPage: landingPageTemplate.id,
    portfolio: portfolioTemplate.id,
  });

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
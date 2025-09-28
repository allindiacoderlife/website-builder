export default function CTA({ props = {} }) {
  const {
    title = "Ready to Get Started?",
    subtitle = "Join thousands of satisfied customers and transform your business today.",
    primaryButton = "Start Free Trial",
    secondaryButton = "Learn More",
    backgroundColor = "bg-orange-500"
  } = props;

  return (
    <section className={`p-8 ${backgroundColor} text-white rounded text-center`}>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-xl mb-6 opacity-90">
        {subtitle}
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          {primaryButton}
        </button>
        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors">
          {secondaryButton}
        </button>
      </div>
    </section>
  );
}
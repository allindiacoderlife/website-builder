export default function Content({ props = {} }) {
  const {
    title = "About Our Services",
    leftTitle = "What We Do",
    leftContent = "We provide cutting-edge solutions that help businesses grow and succeed in the digital world. Our team of experts works tirelessly to deliver exceptional results.",
    rightTitle = "Why Choose Us",
    rightList = [
      "Expert team with years of experience",
      "Cutting-edge technology solutions",
      "24/7 customer support",
      "Proven track record of success"
    ]
  } = props;

  return (
    <section className="p-8 bg-white rounded shadow-sm">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">{leftTitle}</h3>
            <p className="text-gray-600 leading-relaxed">
              {leftContent}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">{rightTitle}</h3>
            <ul className="text-gray-600 space-y-2">
              {rightList.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
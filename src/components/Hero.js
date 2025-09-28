export default function Hero({ props = {} }) {
  const {
    title = "Welcome to Our Amazing Website!",
    subtitle = "Build beautiful websites with our drag-and-drop builder",
    buttonText = "Get Started",
    backgroundColor = "bg-gradient-to-r from-indigo-500 to-purple-600"
  } = props;

  return (
    <section className={`p-12 ${backgroundColor} text-white rounded text-center`}>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl mb-6 opacity-90">
        {subtitle}
      </p>
      <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
        {buttonText}
      </button>
    </section>
  );
}
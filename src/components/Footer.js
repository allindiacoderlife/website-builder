export default function Footer({ props = {} }) {
  const {
    siteName = "My Website",
    description = "Building the future, one component at a time.",
    links = ["Privacy", "Terms", "Support"],
    copyright = "© 2025 My Website. All rights reserved."
  } = props;

  return (
    <footer className="p-6 bg-gray-800 text-white rounded">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg mb-2">{siteName}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
        <div className="flex gap-4">
          {links.map((link, index) => (
            <a key={index} href="#" className="text-gray-400 hover:text-white">
              {link}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700 text-center text-gray-400">
        <p>{copyright}</p>
      </div>
    </footer>
  );
}
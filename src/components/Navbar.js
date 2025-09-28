export default function Navbar({ props = {} }) {
  const {
    siteName = "My Website",
    menuItems = ["Home", "About", "Services", "Contact"],
    backgroundColor = "bg-blue-600",
    textColor = "text-white"
  } = props;

  return (
    <nav className={`flex justify-between items-center p-4 ${backgroundColor} ${textColor} rounded`}>
      <h1 className="font-bold text-xl">{siteName}</h1>
      <ul className="flex gap-6">
        {menuItems.map((item, index) => (
          <li key={index} className="hover:opacity-75 cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}
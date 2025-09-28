export default function Testimonials({ props = {} }) {
  const {
    title = "What Our Clients Say",
    testimonials = [
      {
        name: "Sarah Johnson",
        role: "CEO, Tech Corp",
        text: "This platform transformed our business operations. Highly recommended!",
        rating: 5
      },
      {
        name: "Mike Chen",
        role: "Founder, StartupXYZ",
        text: "Outstanding service and support. The team went above and beyond.",
        rating: 5
      },
      {
        name: "Emily Davis",
        role: "Marketing Director",
        text: "Easy to use and incredibly effective. Results exceeded our expectations.",
        rating: 5
      }
    ],
    backgroundColor = "bg-gray-50"
  } = props;

  return (
    <section className={`p-12 ${backgroundColor} rounded`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">{title}</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
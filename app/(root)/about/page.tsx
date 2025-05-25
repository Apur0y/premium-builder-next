import dbConnect from "@/lib/dbConnect";
import Link from "next/link";

const About = async () => {
  const serviceCollection = dbConnect("services");
  const serviceData = await serviceCollection.find({}).toArray();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {serviceData.map((service: any) => (
        <div
          key={service._id}
          className="card group relative max-w-md rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden m-4 border border-gray-100"
        >
          {/* Image with hover zoom effect */}
          <div className="overflow-hidden h-48 w-full">
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Content with gradient overlay on hover */}
          <div className="p-6 space-y-3">
            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
              {service.title}
            </h2>

            <p className="text-gray-600 line-clamp-3">{service.description}</p>

            {/* CTA button that appears on hover */}
            <Link href={`/about/${service._id}`}>
               <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg">
              Learn More
            </button>
            </Link>
         
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      ))}
    </div>
  );
};

export default About;

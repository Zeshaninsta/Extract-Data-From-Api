'use client';

import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Simplify Your API Workflow
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            API Tool helps you extract and visualize API data with ease. 
            Streamline your development process and gain valuable insights.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <Card
            title="Extract API Data"
            description="Effortlessly extract data from various APIs. Support for RESTful, GraphQL, and more."
            link="/ApiExtractor"
            features={['Multiple API support', 'Custom headers', 'Authentication']}
          />
          <Card
            title="Display API Data"
            description="Visualize and analyze your API data with interactive charts and tables."
            link="/display-data"
            features={['Real-time updates', 'Customizable views', 'Export options']}
          />
        </div>
      </main>
    </div>
  );
}

function Card({ title, description, link, features }) {
  return (
    <Link href={link}>
      <div className="bg-gray-50 rounded-xl shadow-sm p-8 transition duration-300 ease-in-out hover:shadow-md hover:bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <span className="inline-flex items-center text-blue-600 font-semibold">
          Get Started <FaArrowRight className="w-4 h-4 ml-2" />
        </span>
      </div>
    </Link>
  );
}

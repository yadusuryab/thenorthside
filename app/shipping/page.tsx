"use client";

import { useState } from 'react';

export default function ShippingInfoPage() {
  const [activeTab, setActiveTab] = useState('domestic');

  const shippingData = {
    domestic: {
      title: "Domestic Shipping (Within India)",
      areas: ["Kerala", "All Other Indian States"],
      methods: [
        {
          name: "Standard Shipping",
          delivery: "4-7 business days",
          cost: "₹49",
          description: "Free on orders above ₹999"
        },
        {
          name: "Express Shipping",
          delivery: "2-3 business days",
          cost: "₹99",
          description: "Free on orders above ₹1999"
        },
        {
          name: "Next Day Delivery",
          delivery: "1 business day",
          cost: "₹149",
          description: "Available for select pin codes"
        }
      ],
      notes: [
        "Orders placed before 2 PM IST are processed same day",
        "Weekends and holidays are not considered business days",
        "Free shipping applies to all prepaid orders",
        "Cash on delivery available for all shipping methods"
      ]
    },
    international: {
      title: "International Shipping",
      areas: ["Middle East", "Europe", "North America", "Asia Pacific"],
      methods: [
        {
          name: "Standard International",
          delivery: "10-15 business days",
          cost: "₹499",
          description: "Tracked shipping"
        },
        {
          name: "Express International",
          delivery: "5-7 business days",
          cost: "₹899",
          description: "DHL/FedEx express service"
        }
      ],
      notes: [
        "Customs duties and taxes are responsibility of the customer",
        "International returns are not accepted",
        "Shipping costs vary by destination",
        "Delivery times may vary due to customs clearance"
      ]
    }
  };

  const faqs = [
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via SMS and email. You can track your order using our Order Tracking page or directly on the courier partner's website."
    },
    {
      question: "Do you ship to all Indian cities?",
      answer: "Yes, we ship to all major cities and towns across India. For remote locations, delivery might take 1-2 additional days."
    },
    {
      question: "What is your return policy?",
      answer: "We offer 7-day easy returns for all domestic orders. Items must be unused, with original tags and packaging. International returns are not accepted."
    },
    {
      question: "How do I change my shipping address?",
      answer: "You can change your shipping address within 1 hour of placing the order by contacting our customer support. After that, changes may not be possible as the order enters processing."
    },
    {
      question: "What if I'm not available during delivery?",
      answer: "Our delivery partner will attempt delivery 3 times. After that, the package will be returned to our warehouse and a restocking fee may apply for refunds."
    }
  ];

  const currentData = shippingData[activeTab as keyof typeof shippingData];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shipping Information
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fast, reliable shipping across India and worldwide. 
            Check out our shipping methods and delivery timelines below.
          </p>
        </div>

        {/* Shipping Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('domestic')}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'domestic'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Domestic Shipping
              </button>
              <button
                onClick={() => setActiveTab('international')}
                className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'international'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                International Shipping
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Shipping Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentData.title}
            </h2>

            {/* Service Areas */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Service Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentData.areas.map((area, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Shipping Methods */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Shipping Methods & Costs
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {currentData.methods.map((method, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {method.name}
                      </h4>
                      <span className="text-lg font-bold text-black">
                        {method.cost}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Delivery: {method.delivery}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      {method.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Important Notes
              </h3>
              <ul className="space-y-2">
                {currentData.notes.map((note, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Processing Timeline */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Order Processing Timeline
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {[
              { step: "1", title: "Order Placed", time: "Instant" },
              { step: "2", title: "Order Processing", time: "1-2 hours" },
              { step: "3", title: "Quality Check", time: "30 minutes" },
              { step: "4", title: "Handed to Courier", time: "Same day" },
              { step: "5", title: "Out for Delivery", time: "1-3 days" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Support CTA */}
        <div className="mt-8 bg-black rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Need Help With Shipping?
          </h2>
          <p className="text-gray-200 mb-4">
            Our customer support team is here to help you with any shipping questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_PHONE || '6238424799'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors"
            >
              Chat on WhatsApp
            </a>
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'thenorthsidetns@gmail.com'}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-gray-800 transition-colors"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
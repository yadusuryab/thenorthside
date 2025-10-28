"use client";

import { useState } from 'react';

export default function ReturnsPage() {
  const [activeSection, setActiveSection] = useState('returns');

  const returnPolicy = {
    domestic: {
      period: "7 days from delivery date",
      conditions: [
        "Items must be unused, unwashed, and in original condition",
        "Original tags and packaging must be intact",
        "Return request must be initiated within 7 days of delivery",
        "Free returns for domestic orders",
        "Refund will be processed within 5-7 business days after we receive the item"
      ],
      nonReturnable: [
        "Innerwear and socks for hygiene reasons",
        "Personalized or customized items",
        "Items without original tags or packaging",
        "Used or damaged items",
        "Items purchased during clearance sales"
      ]
    },
    international: {
      period: "Returns not accepted",
      conditions: [
        "Due to customs and shipping complexities, we do not accept international returns",
        "Please ensure you check size charts carefully before ordering",
        "We offer detailed product descriptions and size guidance to help you choose the right fit"
      ],
      nonReturnable: [
        "All international orders are final sale",
        "No returns or exchanges for international shipments"
      ]
    }
  };

  const exchangePolicy = {
    period: "7 days from delivery date",
    conditions: [
      "Exchanges are subject to product availability",
      "Item must be in original condition with tags attached",
      "Size exchanges are free of charge",
      "Color exchanges depend on stock availability",
      "If the desired exchange item is unavailable, we'll issue store credit or refund"
    ],
    process: [
      "Initiate exchange request within 7 days of delivery",
      "We'll provide a return shipping label",
      "Ship the item back to us within 2 days",
      "We'll dispatch the exchange item once we receive your return",
      "You'll receive tracking information for your exchange order"
    ]
  };

  const refundPolicy = {
    methods: [
      {
        type: "Original Payment Method",
        time: "5-7 business days",
        description: "Refund will be credited back to your original payment method"
      },
      {
        type: "Store Credit",
        time: "Instant",
        description: "Receive instant store credit with 10% bonus for future purchases"
      },
      {
        type: "Wallet Refund",
        time: "24-48 hours",
        description: "Refund to your THE NORTH SIDE wallet for faster checkout"
      }
    ],
    deductions: [
      "No deductions for returns due to manufacturing defects",
      "Shipping charges are non-refundable unless return is due to our error",
      "₹99 processing fee for returns without quality issues (waived for store credit)"
    ]
  };

  const returnProcess = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Go to 'My Orders' and select the item you want to return",
      time: "2 minutes"
    },
    {
      step: 2,
      title: "Select Reason",
      description: "Choose return reason and preferred resolution (refund/exchange)",
      time: "1 minute"
    },
    {
      step: 3,
      title: "Print Label",
      description: "Download and print the return shipping label we provide",
      time: "Instant"
    },
    {
      step: 4,
      title: "Pack & Ship",
      description: "Pack item securely with original tags and drop at nearest courier",
      time: "1 day"
    },
    {
      step: 5,
      title: "Receive Refund",
      description: "Get refund once we receive and inspect the returned item",
      time: "5-7 days"
    }
  ];

  const faqs = [
    {
      question: "How do I start a return?",
      answer: "Login to your account, go to 'My Orders', select the order you want to return, and click 'Return Item'. Follow the prompts to complete the return request."
    },
    {
      question: "What if I received a damaged or wrong item?",
      answer: "Contact us within 24 hours of delivery with photos of the damaged/wrong item. We'll arrange a free pickup and send a replacement immediately at no extra cost."
    },
    {
      question: "Can I exchange an item for a different size?",
      answer: "Yes! We offer free size exchanges within 7 days of delivery. The exchange is subject to availability of the desired size."
    },
    {
      question: "How long does it take to receive my refund?",
      answer: "Refunds are processed within 5-7 business days after we receive the returned item. It may take additional 2-3 days for the amount to reflect in your account."
    },
    {
      question: "Do I have to pay for return shipping?",
      answer: "Returns within India are free. We provide a prepaid return label for all domestic returns. For international orders, returns are not accepted."
    },
    {
      question: "What is your store credit policy?",
      answer: "Store credit is valid for 1 year and comes with 10% bonus value. For example, if your refund amount is ₹1000, you'll receive ₹1100 in store credit."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Returns & Exchanges
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Easy returns and exchanges within 7 days. We make the process simple and hassle-free.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'returns', label: 'Return Policy' },
                { id: 'exchanges', label: 'Exchanges' },
                { id: 'refunds', label: 'Refunds' },
                { id: 'process', label: 'Return Process' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeSection === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Return Policy Section */}
            {activeSection === 'returns' && (
              <div className="space-y-8">
                {/* Domestic Returns */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Domestic Returns (Within India)
                  </h2>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                          Return Period: {returnPolicy.domestic.period}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Return Conditions
                      </h3>
                      <ul className="space-y-3">
                        {returnPolicy.domestic.conditions.map((condition, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-gray-600">{condition}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Non-Returnable Items
                      </h3>
                      <ul className="space-y-3">
                        {returnPolicy.domestic.nonReturnable.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* International Returns */}
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    International Returns
                  </h2>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          {returnPolicy.international.period}
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{returnPolicy.international.conditions[0]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Exchanges Section */}
            {activeSection === 'exchanges' && (
              <div className="space-y-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        Exchange Period: {exchangePolicy.period}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Exchange Conditions
                    </h3>
                    <ul className="space-y-3">
                      {exchangePolicy.conditions.map((condition, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-gray-600">{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Exchange Process
                    </h3>
                    <ul className="space-y-3">
                      {exchangePolicy.process.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-600">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Refunds Section */}
            {activeSection === 'refunds' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Refund Methods & Timeline
                </h2>

                <div className="grid gap-6 md:grid-cols-3">
                  {refundPolicy.methods.map((method, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
                      <h3 className="font-semibold text-gray-900 mb-2">{method.type}</h3>
                      <div className="text-2xl font-bold text-black mb-2">{method.time}</div>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                    Important Refund Notes
                  </h3>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    {refundPolicy.deductions.map((note, index) => (
                      <li key={index}>• {note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Return Process Section */}
            {activeSection === 'process' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Easy 5-Step Return Process
                </h2>

                <div className="space-y-6">
                  {returnProcess.map((step) => (
                    <div key={step.step} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{step.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                          </svg>
                          Time: {step.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
        <div className="bg-black rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Need Help With Returns?
          </h2>
          <p className="text-gray-200 mb-4">
            Our support team is here to help you with returns, exchanges, or any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_PHONE || '6238424799'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              WhatsApp Support
            </a>
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'thenorthsidetns@gmail.com'}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
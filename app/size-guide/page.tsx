"use client";

import { useState } from 'react';

export default function SizeGuidePage() {
  const [activeCategory, setActiveCategory] = useState('mens');
  const [activeRegion, setActiveRegion] = useState('india');

  // Size chart data
  const sizeCharts = {
    mens: {
      tops: {
        india: [
          { size: "S", chest: "34-36", waist: "30-32", length: "26-27" },
          { size: "M", chest: "36-38", waist: "32-34", length: "27-28" },
          { size: "L", chest: "38-40", waist: "34-36", length: "28-29" },
          { size: "XL", chest: "40-42", waist: "36-38", length: "29-30" },
          { size: "XXL", chest: "42-44", waist: "38-40", length: "30-31" }
        ],
        international: [
          { size: "S", chest: "36-38", waist: "30-32", length: "28" },
          { size: "M", chest: "38-40", waist: "32-34", length: "29" },
          { size: "L", chest: "40-42", waist: "34-36", length: "30" },
          { size: "XL", chest: "42-44", waist: "36-38", length: "31" },
          { size: "XXL", chest: "44-46", waist: "38-40", length: "32" }
        ]
      },
      bottoms: {
        india: [
          { size: "28", waist: "28", hip: "36-38", inseam: "32" },
          { size: "30", waist: "30", hip: "38-40", inseam: "32" },
          { size: "32", waist: "32", hip: "40-42", inseam: "32" },
          { size: "34", waist: "34", hip: "42-44", inseam: "32" },
          { size: "36", waist: "36", hip: "44-46", inseam: "32" }
        ],
        international: [
          { size: "S", waist: "28-30", hip: "36-38", inseam: "32" },
          { size: "M", waist: "30-32", hip: "38-40", inseam: "32" },
          { size: "L", waist: "32-34", hip: "40-42", inseam: "32" },
          { size: "XL", waist: "34-36", hip: "42-44", inseam: "32" },
          { size: "XXL", waist: "36-38", hip: "44-46", inseam: "32" }
        ]
      }
    },
    womens: {
      tops: {
        india: [
          { size: "XS", bust: "30-32", waist: "24-26", hip: "34-36", length: "24-25" },
          { size: "S", bust: "32-34", waist: "26-28", hip: "36-38", length: "25-26" },
          { size: "M", bust: "34-36", waist: "28-30", hip: "38-40", length: "26-27" },
          { size: "L", bust: "36-38", waist: "30-32", hip: "40-42", length: "27-28" },
          { size: "XL", bust: "38-40", waist: "32-34", hip: "42-44", length: "28-29" }
        ],
        international: [
          { size: "XS", bust: "32", waist: "24", hip: "34", length: "25" },
          { size: "S", bust: "34", waist: "26", hip: "36", length: "26" },
          { size: "M", bust: "36", waist: "28", hip: "38", length: "27" },
          { size: "L", bust: "38", waist: "30", hip: "40", length: "28" },
          { size: "XL", bust: "40", waist: "32", hip: "42", length: "29" }
        ]
      },
      bottoms: {
        india: [
          { size: "XS", waist: "24-26", hip: "34-36", inseam: "30" },
          { size: "S", waist: "26-28", hip: "36-38", inseam: "30" },
          { size: "M", waist: "28-30", hip: "38-40", inseam: "30" },
          { size: "L", waist: "30-32", hip: "40-42", inseam: "30" },
          { size: "XL", waist: "32-34", hip: "42-44", inseam: "30" }
        ],
        international: [
          { size: "XS", waist: "24-26", hip: "34-36", inseam: "32" },
          { size: "S", waist: "26-28", hip: "36-38", inseam: "32" },
          { size: "M", waist: "28-30", hip: "38-40", inseam: "32" },
          { size: "L", waist: "30-32", hip: "40-42", inseam: "32" },
          { size: "XL", waist: "32-34", hip: "42-44", inseam: "32" }
        ]
      }
    },
    kids: {
      tops: {
        india: [
          { age: "2-3Y", chest: "20-21", waist: "19-20", length: "12-13" },
          { age: "4-5Y", chest: "22-23", waist: "20-21", length: "13-14" },
          { age: "6-7Y", chest: "24-25", waist: "21-22", length: "14-15" },
          { age: "8-9Y", chest: "26-27", waist: "22-23", length: "15-16" },
          { age: "10-12Y", chest: "28-30", waist: "23-24", length: "16-17" }
        ],
        international: [
          { age: "2-3Y", chest: "21", waist: "20", length: "13" },
          { age: "4-5Y", chest: "23", waist: "21", length: "14" },
          { age: "6-7Y", chest: "25", waist: "22", length: "15" },
          { age: "8-9Y", chest: "27", waist: "23", length: "16" },
          { age: "10-12Y", chest: "30", waist: "24", length: "17" }
        ]
      },
      bottoms: {
        india: [
          { age: "2-3Y", waist: "19-20", hip: "20-21", inseam: "10-11" },
          { age: "4-5Y", waist: "20-21", hip: "21-22", inseam: "11-12" },
          { age: "6-7Y", waist: "21-22", hip: "22-23", inseam: "12-13" },
          { age: "8-9Y", waist: "22-23", hip: "23-24", inseam: "13-14" },
          { age: "10-12Y", waist: "23-24", hip: "24-25", inseam: "14-15" }
        ],
        international: [
          { age: "2-3Y", waist: "20", hip: "21", inseam: "11" },
          { age: "4-5Y", waist: "21", hip: "22", inseam: "12" },
          { age: "6-7Y", waist: "22", hip: "23", inseam: "13" },
          { age: "8-9Y", waist: "23", hip: "24", inseam: "14" },
          { age: "10-12Y", waist: "24", hip: "25", inseam: "15" }
        ]
      }
    }
  };

  const measurementGuide = [
    {
      step: 1,
      title: "Chest/Bust",
      description: "Measure around the fullest part of your chest, keeping the tape horizontal and under your arms.",
      image: "📏",
      tip: "Wear a well-fitted shirt for accurate measurement"
    },
    {
      step: 2,
      title: "Waist",
      description: "Measure around your natural waistline, which is the narrowest part of your torso.",
      image: "📐",
      tip: "Keep the tape snug but not tight"
    },
    {
      step: 3,
      title: "Hip",
      description: "Measure around the fullest part of your hips, about 8 inches below your waist.",
      image: "📊",
      tip: "Stand with feet together for consistent measurement"
    },
    {
      step: 4,
      title: "Length/Inseam",
      description: "For tops: measure from shoulder to hem. For bottoms: measure from crotch to ankle.",
      image: "📏",
      tip: "Use a well-fitting garment as reference"
    }
  ];

  const fitTips = [
    {
      category: "Tops",
      tips: [
        "For a relaxed fit, add 2-4 inches to your chest measurement",
        "For slim fit, choose your exact chest measurement",
        "Consider shoulder width for proper fit"
      ]
    },
    {
      category: "Bottoms",
      tips: [
        "Jeans may feel tight initially but will stretch with wear",
        "For comfort, add 1-2 inches to your waist measurement",
        "Check rise measurement for comfortable waist positioning"
      ]
    },
    {
      category: "General",
      tips: [
        "All measurements are in inches",
        "Size charts may vary between styles",
        "When in doubt, choose the larger size",
        "Check product-specific size notes"
      ]
    }
  ];

  const currentCategory = sizeCharts[activeCategory as keyof typeof sizeCharts];
  const currentRegion = activeRegion as keyof typeof currentCategory.tops;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Size Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect fit with our comprehensive size charts and measurement guide.
            All measurements are in inches.
          </p>
        </div>

        {/* Category Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Select Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'mens', label: "Men's Clothing", icon: "👔" },
              { id: 'womens', label: "Women's Clothing", icon: "👗" },
              { id: 'kids', label: "Kids Clothing", icon: "👶" }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-semibold">{category.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Region Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Select Size Standard
            </h2>
            <div className="flex gap-2">
              {[
                { id: 'india', label: 'Indian Sizes' },
                { id: 'international', label: 'International Sizes' }
              ].map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    activeRegion === region.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Size Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Tops Size Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {activeCategory === 'kids' ? 'Tops Size Chart' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Tops`}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {activeCategory === 'kids' ? (
                      <>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Age</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Chest</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Waist</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Length</th>
                      </>
                    ) : activeCategory === 'womens' ? (
                      <>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Size</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Bust</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Waist</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Hip</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Length</th>
                      </>
                    ) : (
                      <>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Size</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Chest</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Waist</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Length</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentCategory.tops[currentRegion].map((row:any, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {activeCategory === 'kids' ? (
                        <>
                          <td className="border border-gray-300 px-3 py-2 font-medium">{row.age}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.chest}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.waist}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.length}</td>
                        </>
                      ) : activeCategory === 'womens' ? (
                        <>
                          <td className="border border-gray-300 px-3 py-2 font-medium">{row.size}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.bust}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.waist}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.hip}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.length}</td>
                        </>
                      ) : (
                        <>
                          <td className="border border-gray-300 px-3 py-2 font-medium">{row.size}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.chest}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.waist}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.length}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottoms Size Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {activeCategory === 'kids' ? 'Bottoms Size Chart' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Bottoms`}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {activeCategory === 'kids' ? (
                      <>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Age</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Waist</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Hip</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Inseam</th>
                      </>
                    ) : (
                      <>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Size</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Waist</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Hip</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Inseam</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentCategory.bottoms[currentRegion].map((row:any, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {activeCategory === 'kids' ? (
                        <>
                          <td className="border border-gray-300 px-3 py-2 font-medium">{row.age}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.waist}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.hip}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.inseam}</td>
                        </>
                      ) : (
                        <>
                          <td className="border border-gray-300 px-3 py-2 font-medium">{row.size}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.waist}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.hip}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.inseam}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Measurement Guide */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Measure Yourself
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {measurementGuide.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  {step.image}
                </div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2">
                  <p className="text-xs text-yellow-800 font-medium">💡 {step.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fit Tips */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Fit Tips & Recommendations
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {fitTips.map((category, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">{category.category}</h3>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                      <span className="text-green-500 mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-black rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Still Unsure About Your Size?
          </h2>
          <p className="text-gray-200 mb-4">
            Our style experts are here to help you find the perfect fit.
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
              Chat on WhatsApp
            </a>
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'thenorthsidetns@gmail.com'}`}
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              Email for Help
            </a>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📝 Important Notes
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• All measurements are in inches</li>
            <li>• Size charts may vary between different styles and collections</li>
            <li>• For personalized fit advice, contact our customer support</li>
            <li>• Check individual product pages for specific size recommendations</li>
            <li>• When between sizes, we recommend choosing the larger size</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
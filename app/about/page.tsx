"use client";

import { useState } from 'react';

export default function AboutUsPage() {
  const [activeStory, setActiveStory] = useState('mission');

  const companyStats = [
    { number: "2018", label: "Founded In", icon: "🎯" },
    { number: "10K+", label: "Happy Customers", icon: "😊" },
    { number: "50+", label: "Cities Served", icon: "🏙️" },
    { number: "100%", label: "Quality Promise", icon: "⭐" }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Our Mission",
      description: "To redefine urban fashion by blending contemporary styles with timeless elegance, making premium quality accessible to everyone."
    },
    {
      icon: "👁️",
      title: "Our Vision",
      description: "To become India's most loved fashion brand, inspiring confidence and self-expression through thoughtfully designed apparel."
    },
    {
      icon: "❤️",
      title: "Our Philosophy",
      description: "We believe fashion should be authentic, sustainable, and empowering. Every stitch tells a story of craftsmanship and passion."
    }
  ];

  const teamMembers = [
    {
      name: "Aryan Sharma",
      role: "Founder & Creative Director",
      image: "👨‍💼",
      description: "With over 8 years in fashion industry, Aryan leads our creative vision and brand direction.",
      quote: "Fashion is the armor to survive the reality of everyday life."
    },
    {
      name: "Priya Patel",
      role: "Head of Design",
      image: "👩‍🎨",
      description: "Priya brings innovative designs that blend traditional craftsmanship with modern aesthetics.",
      quote: "Every design should tell a story and evoke emotion."
    },
    {
      name: "Rohan Mehta",
      role: "Operations Head",
      image: "👨‍💻",
      description: "Rohan ensures seamless operations and exceptional customer experiences across all touchpoints.",
      quote: "Excellence is in the details that customers never see but always feel."
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "The Beginning",
      description: "THE NORTH SIDE was born in Kerala with a small collection of premium t-shirts and casual wear."
    },
    {
      year: "2019",
      title: "First Milestone",
      description: "Reached 1,000 customers and expanded our product line to include complete urban wear collections."
    },
    {
      year: "2020",
      title: "Digital Expansion",
      description: "Launched nationwide shipping and established our online presence during the pandemic."
    },
    {
      year: "2021",
      title: "Growth Phase",
      description: "Introduced sustainable collections and partnered with ethical manufacturing units."
    },
    {
      year: "2022",
      title: "Community Building",
      description: "Built a community of 10,000+ fashion enthusiasts and expanded our design team."
    },
    {
      year: "2023",
      title: "Innovation Era",
      description: "Launched tech-enabled sizing solutions and AI-powered style recommendations for customers."
    }
  ];

  const sustainability = [
    {
      icon: "🌱",
      title: "Eco-Friendly Materials",
      description: "We use organic cotton, recycled fabrics, and sustainable materials in all our collections."
    },
    {
      icon: "⚡",
      title: "Ethical Manufacturing",
      description: "Our manufacturing partners follow fair labor practices and maintain safe working conditions."
    },
    {
      icon: "📦",
      title: "Sustainable Packaging",
      description: "100% recyclable and biodegradable packaging to minimize our environmental footprint."
    },
    {
      icon: "💧",
      title: "Water Conservation",
      description: "Implementing water-saving techniques in our production processes and fabric treatments."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            THE NORTH SIDE
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Redefining Urban Fashion with Authenticity, Quality, and Style
          </p>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Born in the vibrant landscapes of Kerala, we've grown from a local passion project 
            to a nationally recognized brand, serving fashion enthusiasts across India.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Tabs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Story
          </h2>
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'mission', label: 'Mission & Vision' },
                { id: 'journey', label: 'Our Journey' },
                { id: 'team', label: 'Our Team' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveStory(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeStory === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {/* Mission & Vision */}
            {activeStory === 'mission' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-8">
                  {values.map((value, index) => (
                    <div key={index} className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                      <div className="text-4xl mb-4">{value.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-8 mt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
                    What Makes Us Different
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        Premium quality fabrics sourced ethically
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        Attention to detail in every stitch
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        Customer-first approach in everything we do
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        Innovative designs that stand the test of time
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        Sustainable and responsible fashion practices
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-3">✓</span>
                        Affordable luxury without compromising quality
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Journey */}
            {activeStory === 'journey' && (
              <div className="relative">
                {/* Timeline */}
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex">
                      <div className="flex flex-col items-center mr-6">
                        <div className="w-4 h-4 bg-black rounded-full"></div>
                        {index < milestones.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-12">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center mb-3">
                            <span className="text-2xl font-bold text-black mr-4">
                              {milestone.year}
                            </span>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {milestone.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team */}
            {activeStory === 'team' && (
              <div>
                <div className="text-center mb-12">
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Meet the passionate individuals behind THE NORTH SIDE. 
                    Our team combines creative vision with operational excellence 
                    to deliver exceptional fashion experiences.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="text-center">
                      <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                        {member.image}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <div className="text-black font-medium mb-3">
                        {member.role}
                      </div>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {member.description}
                      </p>
                      <blockquote className="text-gray-500 text-sm italic border-l-4 border-gray-300 pl-4 py-2">
                        "{member.quote}"
                      </blockquote>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-8 mt-12 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Join Our Team
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    We're always looking for talented individuals who share our passion 
                    for fashion and commitment to excellence.
                  </p>
                  <a
                    href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || 'thenorthsidetns@gmail.com'}`}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
                  >
                    Send Your CV
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Our Commitment to Sustainability
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We believe fashion should be beautiful inside and out. That's why we're committed 
            to sustainable practices that protect our planet and empower our communities.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainability.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Beyond Fashion
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We're more than just a clothing brand. We're a community of fashion enthusiasts, 
            creatives, and individuals who believe in expressing their authentic selves.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6">
              <div className="text-3xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Craftsmanship</h3>
              <p className="text-gray-600">
                Every garment is crafted with precision and attention to detail
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl mb-4">💝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Love</h3>
              <p className="text-gray-600">
                Building lasting relationships with our community of customers
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Constantly evolving to bring you the latest in fashion and technology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join THE NORTH SIDE Family
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the difference of authentic, quality fashion crafted with passion and purpose.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors"
            >
              Shop Collection
            </a>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_PHONE || '6238424799'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-gray-800 transition-colors"
            >
              Connect With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
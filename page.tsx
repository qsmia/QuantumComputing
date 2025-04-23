'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover the Quantum World</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Explore the fascinating realm of quantum computing through interactive visualizations and hands-on learning experiences.
          </p>
          <Link href="/modules">
            <Button className="bg-white text-purple-900 hover:bg-purple-100 text-lg px-8 py-6 rounded-lg font-semibold">
              Start Learning
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Learn Quantum Computing With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              title="Interactive Learning" 
              description="Engage with interactive visualizations and simulations that make quantum concepts tangible."
              icon="🔍"
            />
            <FeatureCard 
              title="Structured Curriculum" 
              description="Follow a carefully designed learning path from basic concepts to advanced applications."
              icon="📚"
            />
            <FeatureCard 
              title="Visual Approach" 
              description="Understand complex quantum phenomena through intuitive visual representations."
              icon="👁️"
            />
            <FeatureCard 
              title="No Prerequisites" 
              description="Start your quantum journey regardless of your background in physics or mathematics."
              icon="🚀"
            />
          </div>
        </div>
      </section>

      {/* Learning Path Preview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Your Learning Journey</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ModuleCard 
              number="1"
              title="Introduction to Quantum Computing" 
              description="Discover the fundamental differences between classical and quantum computing."
              duration="30 min"
            />
            <ModuleCard 
              number="2"
              title="Quantum Bits (Qubits)" 
              description="Explore the building blocks of quantum information and their unique properties."
              duration="45 min"
            />
            <ModuleCard 
              number="3"
              title="Quantum Principles" 
              description="Understand superposition, entanglement, and other key quantum phenomena."
              duration="60 min"
            />
            <ModuleCard 
              number="4"
              title="Quantum Gates and Circuits" 
              description="Learn how to manipulate qubits using quantum gates and build simple circuits."
              duration="75 min"
            />
            <ModuleCard 
              number="5"
              title="Quantum Algorithms" 
              description="Discover how quantum algorithms provide advantages over classical approaches."
              duration="90 min"
            />
            <ModuleCard 
              number="6"
              title="Practical Quantum Programming" 
              description="Apply your knowledge by programming quantum circuits and running simulations."
              duration="120 min"
            />
          </div>
          <div className="text-center mt-12">
            <Link href="/modules">
              <Button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg">
                Explore All Modules
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Quantum Journey?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Start exploring the fascinating world of quantum computing today with our interactive learning platform.
          </p>
          <Link href="/interactive-lab">
            <Button className="bg-white text-indigo-900 hover:bg-indigo-100 text-lg px-8 py-4 rounded-lg font-semibold">
              Try Interactive Lab
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  )
}

function ModuleCard({ number, title, description, duration }: { number: string; title: string; description: string; duration: string }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow border-t-4 border-purple-500">
      <div className="flex items-center mb-4">
        <span className="bg-purple-100 text-purple-800 text-lg font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3">
          {number}
        </span>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="text-sm text-gray-500">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {duration}
        </span>
      </div>
    </Card>
  )
}

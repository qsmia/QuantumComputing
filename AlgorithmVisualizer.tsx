'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'

export default function AlgorithmVisualizer() {
  const [algorithm, setAlgorithm] = useState('deutsch-jozsa')
  const [step, setStep] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [inputSize, setInputSize] = useState(2)

  // Algorithm definitions
  const algorithms = {
    'deutsch-jozsa': {
      name: 'Deutsch-Jozsa Algorithm',
      description: 'Determines whether a function is constant or balanced with a single query.',
      totalSteps: 5,
      steps: [
        {
          title: 'Initialize Qubits',
          description: 'Start with n+1 qubits in the |0⟩ state, where n is the input size.'
        },
        {
          title: 'Apply Hadamard Gates',
          description: 'Apply Hadamard gates to all qubits to create superposition.'
        },
        {
          title: 'Apply Oracle Function',
          description: 'Apply the oracle function Uₑ that encodes whether f is constant or balanced.'
        },
        {
          title: 'Apply Hadamard Gates Again',
          description: 'Apply Hadamard gates to the input qubits again.'
        },
        {
          title: 'Measure Result',
          description: 'Measure the input qubits. If all are |0⟩, the function is constant; otherwise, it is balanced.'
        }
      ]
    },
    'grovers': {
      name: 'Grover\'s Search Algorithm',
      description: 'Finds an element in an unsorted database with quadratic speedup.',
      totalSteps: 6,
      steps: [
        {
          title: 'Initialize Qubits',
          description: 'Start with n qubits in the |0⟩ state, where n is the number of qubits needed to represent the search space.'
        },
        {
          title: 'Apply Hadamard Gates',
          description: 'Apply Hadamard gates to all qubits to create an equal superposition of all possible states.'
        },
        {
          title: 'Apply Oracle',
          description: 'Apply the oracle function that marks the target state by flipping its sign.'
        },
        {
          title: 'Apply Diffusion Operator',
          description: 'Apply the diffusion operator (Grover\'s diffusion) to amplify the amplitude of the marked state.'
        },
        {
          title: 'Repeat Oracle and Diffusion',
          description: 'Repeat the oracle and diffusion steps approximately √N times, where N is the size of the search space.'
        },
        {
          title: 'Measure Result',
          description: 'Measure all qubits to obtain the index of the target element with high probability.'
        }
      ]
    },
    'shors': {
      name: 'Shor\'s Factoring Algorithm',
      description: 'Efficiently factors large integers, breaking RSA encryption.',
      totalSteps: 5,
      steps: [
        {
          title: 'Problem Setup',
          description: 'To factor N, we need to find the period of f(x) = a^x mod N for some random a.'
        },
        {
          title: 'Initialize Quantum Registers',
          description: 'Initialize two quantum registers: x register with n qubits and f(x) register with m qubits.'
        },
        {
          title: 'Create Superposition',
          description: 'Apply Hadamard gates to the x register to create a superposition of all possible x values.'
        },
        {
          title: 'Apply Modular Exponentiation',
          description: 'Apply the quantum function that computes f(x) = a^x mod N and stores the result in the f(x) register.'
        },
        {
          title: 'Apply Quantum Fourier Transform',
          description: 'Apply the Quantum Fourier Transform to the x register to find the period of f(x).'
        }
      ]
    }
  }

  // Get current algorithm data
  const currentAlgorithm = algorithms[algorithm as keyof typeof algorithms]
  const currentStep = currentAlgorithm.steps[step]

  // Handle step navigation
  const nextStep = () => {
    if (step < currentAlgorithm.totalSteps - 1) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  // Handle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Render visualization for current step
  const renderVisualization = () => {
    // Simple visualization based on algorithm and step
    return (
      <div className="bg-gray-100 p-8 rounded-lg text-center h-64 flex items-center justify-center">
        <div>
          <p className="text-gray-500 mb-4">Step {step + 1}: {currentStep.title}</p>
          <p className="text-sm text-gray-400">{currentStep.description}</p>
          <div className="flex justify-center mt-6 space-x-4">
            {Array(inputSize).fill(0).map((_, i) => (
              <div key={i} className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-md border border-blue-300">
                |{step > 1 ? '?' : '0'}⟩
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Quantum Algorithm Visualizer</h2>
        <p className="mb-6">
          Explore famous quantum algorithms step by step and understand how they work.
        </p>
        
        <div className="space-y-8">
          {/* Algorithm selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Select Algorithm</h3>
            <Tabs value={algorithm} onValueChange={setAlgorithm}>
              <TabsList className="mb-4">
                <TabsTrigger value="deutsch-jozsa">Deutsch-Jozsa</TabsTrigger>
                <TabsTrigger value="grovers">Grover's Search</TabsTrigger>
                <TabsTrigger value="shors">Shor's Factoring</TabsTrigger>
              </TabsList>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h4 className="font-semibold">{currentAlgorithm.name}</h4>
                <p className="text-gray-600">{currentAlgorithm.description}</p>
              </div>
            </Tabs>
          </div>
          
          {/* Input size control */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Input Size</h3>
            <div className="flex items-center space-x-4">
              <span className="w-8 text-center">{inputSize}</span>
              <Slider
                value={[inputSize]}
                min={2}
                max={5}
                step={1}
                onValueChange={(value) => setInputSize(value[0])}
                className="flex-grow"
              />
              <span className="text-sm text-gray-500">qubits</span>
            </div>
          </div>
          
          {/* Algorithm visualization */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Step {step + 1} of {currentAlgorithm.totalSteps}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Speed:</span>
                <Slider
                  value={[speed]}
                  min={0.5}
                  max={2}
                  step={0.5}
                  onValueChange={(value) => setSpeed(value[0])}
                  className="w-24"
                />
                <span className="text-sm text-gray-500">{speed}x</span>
              </div>
            </div>
            
            <div className="bg-white border rounded-md p-6 mb-6">
              <h4 className="text-xl font-semibold mb-2">{currentStep.title}</h4>
              <p className="text-gray-600 mb-6">{currentStep.description}</p>
              
              <div className="py-6">
                {renderVisualization()}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={step === 0}
              >
                Previous
              </Button>
              
              <div className="space-x-2">
                <Button 
                  variant={isPlaying ? "destructive" : "default"}
                  onClick={togglePlay}
                >
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setStep(0)}
                >
                  Reset
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                onClick={nextStep}
                disabled={step === currentAlgorithm.totalSteps - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

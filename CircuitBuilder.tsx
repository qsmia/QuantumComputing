'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Simplified version without dnd-kit dependencies
export default function CircuitBuilder() {
  const [qubits, setQubits] = useState([
    { id: 'q0', gates: [] },
    { id: 'q1', gates: [] }
  ])
  const [selectedGate, setSelectedGate] = useState<string | null>(null)
  const [circuitState, setCircuitState] = useState<string>('|00⟩')
  const [measurements, setMeasurements] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('builder')

  // Quantum gate definitions
  const gates = {
    H: { name: 'H', label: 'Hadamard', description: 'Creates superposition' },
    X: { name: 'X', label: 'Pauli-X', description: 'Bit flip (NOT gate)' },
    Y: { name: 'Y', label: 'Pauli-Y', description: 'Bit and phase flip' },
    Z: { name: 'Z', label: 'Pauli-Z', description: 'Phase flip' },
    S: { name: 'S', label: 'S Gate', description: 'π/4 phase rotation' },
    T: { name: 'T', label: 'T Gate', description: 'π/8 phase rotation' },
    CNOT: { name: 'CNOT', label: 'CNOT', description: 'Controlled-NOT gate', isMultiQubit: true },
    SWAP: { name: 'SWAP', label: 'SWAP', description: 'Swaps two qubits', isMultiQubit: true },
    M: { name: 'M', label: 'Measure', description: 'Measurement operation' }
  }

  // Add a gate to a qubit
  const addGate = (qubitId: string) => {
    if (!selectedGate) return

    const newQubits = [...qubits]
    const qubitIndex = newQubits.findIndex(q => q.id === qubitId)
    
    if (qubitIndex !== -1) {
      const gateId = `${selectedGate}-${qubitId}-${Date.now()}`
      newQubits[qubitIndex].gates.push({
        id: gateId,
        type: selectedGate,
        ...gates[selectedGate as keyof typeof gates]
      })
      setQubits(newQubits)
      updateCircuitState(newQubits)
    }
  }

  // Remove a gate
  const removeGate = (qubitId: string, gateId: string) => {
    const newQubits = [...qubits]
    const qubitIndex = newQubits.findIndex(q => q.id === qubitId)
    
    if (qubitIndex !== -1) {
      newQubits[qubitIndex].gates = newQubits[qubitIndex].gates.filter(g => g.id !== gateId)
      setQubits(newQubits)
      updateCircuitState(newQubits)
    }
  }

  // Add a new qubit
  const addQubit = () => {
    const newId = `q${qubits.length}`
    setQubits([...qubits, { id: newId, gates: [] }])
    updateCircuitState([...qubits, { id: newId, gates: [] }])
  }

  // Remove a qubit
  const removeQubit = () => {
    if (qubits.length <= 1) return
    const newQubits = qubits.slice(0, -1)
    setQubits(newQubits)
    updateCircuitState(newQubits)
  }

  // Reset the circuit
  const resetCircuit = () => {
    const resetQubits = qubits.map(q => ({ ...q, gates: [] }))
    setQubits(resetQubits)
    setMeasurements([])
    updateCircuitState(resetQubits)
  }

  // Run the circuit simulation
  const runCircuit = () => {
    // This is a simplified simulation for educational purposes
    // In a real implementation, we would use a quantum simulator library
    
    // For now, we'll just generate some plausible results based on the gates
    const hasHadamard = qubits.some(q => q.gates.some(g => g.type === 'H'))
    const hasMeasurement = qubits.some(q => q.gates.some(g => g.type === 'M'))
    
    if (hasHadamard && hasMeasurement) {
      // Simulate probabilistic results
      const results = []
      const numSamples = 10
      
      for (let i = 0; i < numSamples; i++) {
        let result = ''
        for (let j = 0; j < qubits.length; j++) {
          // If this qubit has a Hadamard, it has 50/50 chance of 0 or 1
          if (qubits[j].gates.some(g => g.type === 'H')) {
            result += Math.random() < 0.5 ? '0' : '1'
          } else {
            // Otherwise it stays in |0⟩ state unless flipped by X gate
            result += qubits[j].gates.some(g => g.type === 'X') ? '1' : '0'
          }
        }
        results.push(result)
      }
      
      setMeasurements(results)
      setActiveTab('results')
    } else if (hasMeasurement) {
      // Deterministic result
      let result = ''
      for (const qubit of qubits) {
        // Check if there's an odd number of X gates (which would flip the bit)
        const xGateCount = qubit.gates.filter(g => g.type === 'X').length
        result += xGateCount % 2 === 1 ? '1' : '0'
      }
      
      setMeasurements([result])
      setActiveTab('results')
    } else {
      // No measurement
      setMeasurements(['No measurement gates in circuit'])
      setActiveTab('results')
    }
  }

  // Update the circuit state based on gates
  const updateCircuitState = (currentQubits: typeof qubits) => {
    // This is a simplified representation for educational purposes
    // In a real implementation, we would calculate the actual quantum state
    
    // Initialize state
    let state = `|${'0'.repeat(currentQubits.length)}⟩`
    
    // Check for Hadamard gates (create superposition)
    const hasHadamard = currentQubits.some(q => q.gates.some(g => g.type === 'H'))
    
    if (hasHadamard) {
      // Create a simplified representation of superposition
      const superpositionStates = []
      const numQubits = currentQubits.length
      
      // For simplicity, just show a few possible states in superposition
      for (let i = 0; i < Math.min(4, 2 ** numQubits); i++) {
        const binaryString = i.toString(2).padStart(numQubits, '0')
        superpositionStates.push(`|${binaryString}⟩`)
      }
      
      if (2 ** numQubits > 4) {
        state = superpositionStates.join(' + ') + ' + ...'
      } else {
        state = superpositionStates.join(' + ')
      }
    } else {
      // No superposition, just check for bit flips from X gates
      let binaryString = ''
      for (const qubit of currentQubits) {
        // Check if there's an odd number of X gates (which would flip the bit)
        const xGateCount = qubit.gates.filter(g => g.type === 'X').length
        binaryString += xGateCount % 2 === 1 ? '1' : '0'
      }
      state = `|${binaryString}⟩`
    }
    
    setCircuitState(state)
  }

  return (
    <div className="w-full">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Quantum Circuit Builder</h2>
        <p className="mb-6">
          Build quantum circuits by selecting gates and adding them to qubits. 
          Run the circuit to see the results of your quantum operations.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="builder">Circuit Builder</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder">
            <div className="space-y-8">
              {/* Gate selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Quantum Gates</h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  {Object.entries(gates).map(([key, gate]) => (
                    <Button
                      key={key}
                      variant={selectedGate === key ? "default" : "outline"}
                      onClick={() => setSelectedGate(key)}
                      className="w-12 h-12 p-0"
                    >
                      {gate.name}
                    </Button>
                  ))}
                </div>
                {selectedGate && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="font-semibold">{gates[selectedGate as keyof typeof gates].label}</p>
                    <p className="text-sm text-gray-600">{gates[selectedGate as keyof typeof gates].description}</p>
                  </div>
                )}
              </div>
              
              {/* Circuit display */}
              <div>
                <div className="flex justify-between mb-3">
                  <h3 className="text-lg font-semibold">Circuit</h3>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={addQubit}>Add Qubit</Button>
                    <Button variant="outline" size="sm" onClick={removeQubit}>Remove Qubit</Button>
                    <Button variant="outline" size="sm" onClick={resetCircuit}>Reset</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-white">
                  {qubits.map((qubit, index) => (
                    <div key={qubit.id} className="flex items-center mb-4 last:mb-0">
                      <div className="w-12 flex-shrink-0 font-mono font-semibold text-center">
                        {qubit.id}:
                      </div>
                      <div 
                        className="flex-grow h-12 border-b-2 border-gray-300 flex items-center relative"
                        onClick={() => addGate(qubit.id)}
                      >
                        {qubit.gates.length === 0 ? (
                          <div className="w-full text-center text-gray-400 text-sm">
                            Click to add {selectedGate ? gates[selectedGate as keyof typeof gates].label : 'a gate'}
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            {qubit.gates.map((gate) => (
                              <div key={gate.id} className="relative group">
                                <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow">
                                  <span className="font-bold">{gate.name}</span>
                                </div>
                                <button
                                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full hidden group-hover:flex items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeGate(qubit.id, gate.id);
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Circuit state */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Current State</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-mono text-center text-lg">{circuitState}</p>
                </div>
              </div>
              
              <div className="text-center">
                <Button onClick={runCircuit} className="px-8">Run Circuit</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Measurement Results</h3>
              
              {measurements.length > 0 ? (
                <div className="bg-gray-50 p-4 rounded-md">
                  {measurements.length === 1 ? (
                    <p className="font-mono text-center text-lg">{measurements[0]}</p>
                  ) : (
                    <div>
                      <p className="mb-3">Results from 10 measurements:</p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {measurements.map((result, index) => (
                          <div key={index} className="bg-white p-2 rounded border text-center font-mono">
                            {result}
                          </div>
                        ))}
                      </div>
                      
                      {/* Simple histogram */}
                      {measurements.length > 1 && (
                        <div className="mt-6">
                          <p className="mb-2">Frequency distribution:</p>
                          <div className="space-y-2">
                            {Array.from(new Set(measurements)).map(result => {
                              const count = measurements.filter(m => m === result).length
                              const percentage = (count / measurements.length) * 100
                              
                              return (
                                <div key={result} className="flex items-center">
                                  <div className="w-16 font-mono">{result}:</div>
                                  <div className="flex-grow">
                                    <div 
                                      className="bg-purple-500 h-6 rounded"
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                  <div className="w-16 text-right">{percentage.toFixed(0)}%</div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-500">Run the circuit to see measurement results</p>
              )}
              
              <div className="text-center">
                <Button onClick={() => setActiveTab('builder')} variant="outline">
                  Back to Circuit Builder
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

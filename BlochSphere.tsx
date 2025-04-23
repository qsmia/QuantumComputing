'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function BlochSphere() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [theta, setTheta] = useState(0)
  const [phi, setPhi] = useState(0)
  const [stateVector, setStateVector] = useState<{x: number, y: number, z: number} | null>(null)

  // Update state vector based on theta and phi
  useEffect(() => {
    // Convert spherical coordinates to Cartesian
    const x = Math.sin(theta) * Math.cos(phi)
    const y = Math.sin(theta) * Math.sin(phi)
    const z = Math.cos(theta)

    setStateVector({x, y, z})
  }, [theta, phi])

  // Preset states
  const presetStates = {
    '|0⟩': { theta: 0, phi: 0 },
    '|1⟩': { theta: Math.PI, phi: 0 },
    '|+⟩': { theta: Math.PI / 2, phi: 0 },
    '|-⟩': { theta: Math.PI / 2, phi: Math.PI },
    '|+i⟩': { theta: Math.PI / 2, phi: Math.PI / 2 },
    '|-i⟩': { theta: Math.PI / 2, phi: 3 * Math.PI / 2 }
  }

  const applyPreset = (preset: keyof typeof presetStates) => {
    setTheta(presetStates[preset].theta)
    setPhi(presetStates[preset].phi)
  }

  // Calculate quantum state representation
  const calculateStateVector = () => {
    const alpha = Math.cos(theta / 2)
    const beta = Math.sin(theta / 2) * Math.exp(phi * Math.PI / 180)
    return { alpha, beta }
  }

  // Format complex number for display
  const formatComplex = (num: number) => {
    if (Math.abs(num) < 0.0001) return '0'
    if (Math.abs(Math.abs(num) - 1) < 0.0001) return num < 0 ? '-1' : '1'
    return num.toFixed(4)
  }

  return (
    <div className="w-full">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Bloch Sphere Visualizer</h2>
        <p className="mb-6">
          The Bloch sphere is a geometrical representation of the state space of a qubit. 
          Manipulate the controls to see how different quantum states are represented.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div 
              ref={containerRef} 
              className="w-full h-80 bg-gray-50 rounded-lg flex items-center justify-center"
              style={{ minHeight: '320px' }}
            >
              <div className="text-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center relative mx-auto">
                  <div className="absolute top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="absolute bottom-0 w-4 h-4 bg-purple-500 rounded-full"></div>
                  <div className="absolute left-0 w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="absolute right-0 w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="w-full h-0.5 bg-gray-300 absolute"></div>
                  <div className="h-full w-0.5 bg-gray-300 absolute"></div>
                  <div className="text-xs absolute top-2">|0⟩</div>
                  <div className="text-xs absolute bottom-2">|1⟩</div>
                  <div className="text-xs absolute left-2">|+⟩</div>
                  <div className="text-xs absolute right-2">|-⟩</div>
                  
                  {stateVector && (
                    <div 
                      className="absolute w-4 h-4 bg-yellow-500 rounded-full"
                      style={{ 
                        top: `calc(50% - ${stateVector.z * 32}px - 8px)`,
                        left: `calc(50% + ${stateVector.x * 32}px - 8px)`
                      }}
                    ></div>
                  )}
                </div>
                <p className="mt-4 text-sm text-gray-500">Simplified Bloch Sphere Visualization</p>
              </div>
            </div>
          </div>
          
          <div>
            <Tabs defaultValue="controls">
              <TabsList className="mb-4">
                <TabsTrigger value="controls">Controls</TabsTrigger>
                <TabsTrigger value="presets">Preset States</TabsTrigger>
                <TabsTrigger value="info">State Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="controls">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Theta (θ): {(theta / Math.PI).toFixed(2)}π
                    </label>
                    <Slider
                      value={[theta]}
                      min={0}
                      max={Math.PI}
                      step={0.01}
                      onValueChange={(value) => setTheta(value[0])}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phi (φ): {(phi / Math.PI).toFixed(2)}π
                    </label>
                    <Slider
                      value={[phi]}
                      min={0}
                      max={2 * Math.PI}
                      step={0.01}
                      onValueChange={(value) => setPhi(value[0])}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="presets">
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(presetStates).map((state) => (
                    <Button 
                      key={state} 
                      variant="outline"
                      onClick={() => applyPreset(state as keyof typeof presetStates)}
                    >
                      {state}
                    </Button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="info">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cartesian Coordinates</h3>
                    {stateVector && (
                      <p>
                        x: {stateVector.x.toFixed(4)}, 
                        y: {stateVector.y.toFixed(4)}, 
                        z: {stateVector.z.toFixed(4)}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Spherical Coordinates</h3>
                    <p>
                      θ: {(theta / Math.PI).toFixed(2)}π, 
                      φ: {(phi / Math.PI).toFixed(2)}π
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Quantum State</h3>
                    <p className="font-mono">
                      |ψ⟩ = cos(θ/2)|0⟩ + e<sup>iφ</sup>sin(θ/2)|1⟩
                    </p>
                    <p className="font-mono mt-2">
                      |ψ⟩ = {Math.cos(theta / 2).toFixed(4)}|0⟩ + 
                      {phi === 0 
                        ? Math.sin(theta / 2).toFixed(4) 
                        : `(${Math.cos(phi).toFixed(2)} + ${Math.sin(phi).toFixed(2)}i) × ${Math.sin(theta / 2).toFixed(4)}`
                      }|1⟩
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  )
}

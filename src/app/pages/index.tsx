import React from 'react';
import Head from 'next/head';
import { ConstitutionBuilder } from '../components/ConstitutionBuilder';
import { TestScenario } from '../components/TestScenario';
import { AIResponse } from '../components/AIResponse';
import { useConstitutionalAI } from '../hooks/useConstitutionalAI';

export default function Home() {
  const {
    constitution,
    setConstitution,
    newPrinciple,
    setNewPrinciple,
    testScenario,
    setTestScenario,
    responses,
    isGenerating,
    selectedTemplate,
    setSelectedTemplate,
    testConstitution
  } = useConstitutionalAI();

  return (
    <>
      <Head>
        <title>Constitutional AI Explorer</title>
        <meta name="description" content="Explore how constitutional constraints shape AI behavior" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Constitutional AI Explorer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Define your own set of principles and see how different AI systems might respond 
            when guided by those values. Explore how constitutional constraints shape AI behavior 
            across different scenarios.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ConstitutionBuilder
            constitution={constitution}
            setConstitution={setConstitution}
            newPrinciple={newPrinciple}
            setNewPrinciple={setNewPrinciple}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />

          <TestScenario
            testScenario={testScenario}
            setTestScenario={setTestScenario}
            onTest={testConstitution}
            isGenerating={isGenerating}
            constitutionLength={constitution.length}
          />
        </div>

        {responses.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              AI Responses Under Your Constitution
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {responses.map((response, index) => (
                <AIResponse key={index} response={response} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
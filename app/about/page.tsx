import React from "react";

const steps = [
  {
    title: "1. Upload PDF",
    description: "Users upload their PDF documents using our secure upload interface. We support large files and ensure your data is handled safely.",
  },
  {
    title: "2. Text Extraction",
    description: "Our backend extracts the text from your PDF using advanced parsing algorithms, ensuring all relevant content is captured.",
  },
  {
    title: "3. AI Summarization",
    description: "The extracted text is sent to our AI engine, which generates a concise and accurate summary using state-of-the-art language models.",
  },
  {
    title: "4. Review & Share",
    description: "You receive the summary instantly. You can review, copy, or share the summary as needed.",
  },
];

const AboutSection = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-6 text-primary">About Saaransh</h1>
      <p className="text-lg text-muted-foreground text-center mb-10">
        <span className="font-semibold text-primary">Saaransh</span> is an AI-powered platform designed to help you quickly understand lengthy PDF documents. 
        Our mission is to save your time and effort by providing instant, high-quality summaries using advanced artificial intelligence.
      </p>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">How It Works</h2>
        <ol className="space-y-6">
          {steps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow">
                {idx + 1}
              </span>
              <div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-6 text-center">Process Flowchart</h2>
        <div className="w-full flex justify-center">
          {/* Simple flowchart using SVG */}
          <svg width="100%" height="180" viewBox="0 0 700 180" className="max-w-full">
            {/* Step 1 */}
            <g>
              <rect x="10" y="40" width="140" height="60" rx="12" fill="#f472b6" opacity="0.15" />
              <text x="80" y="75" textAnchor="middle" fontSize="16" fill="#be185d" fontWeight="bold">Upload PDF</text>
            </g>
            {/* Arrow 1 */}
            <g>
              <line x1="150" y1="70" x2="210" y2="70" stroke="#be185d" strokeWidth="3" markerEnd="url(#arrowhead)" />
            </g>
            {/* Step 2 */}
            <g>
              <rect x="210" y="40" width="140" height="60" rx="12" fill="#f472b6" opacity="0.15" />
              <text x="280" y="75" textAnchor="middle" fontSize="16" fill="#be185d" fontWeight="bold">Extract Text</text>
            </g>
            {/* Arrow 2 */}
            <g>
              <line x1="350" y1="70" x2="410" y2="70" stroke="#be185d" strokeWidth="3" markerEnd="url(#arrowhead)" />
            </g>
            {/* Step 3 */}
            <g>
              <rect x="410" y="40" width="140" height="60" rx="12" fill="#f472b6" opacity="0.15" />
              <text x="480" y="75" textAnchor="middle" fontSize="16" fill="#be185d" fontWeight="bold">AI Summarize</text>
            </g>
            {/* Arrow 3 */}
            <g>
              <line x1="550" y1="70" x2="610" y2="70" stroke="#be185d" strokeWidth="3" markerEnd="url(#arrowhead)" />
            </g>
            {/* Step 4 */}
            <g>
              <rect x="610" y="40" width="80" height="60" rx="12" fill="#f472b6" opacity="0.15" />
              <text x="650" y="75" textAnchor="middle" fontSize="16" fill="#be185d" fontWeight="bold">Summary</text>
            </g>
            {/* Arrowhead definition */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#be185d" />
              </marker>
            </defs>
          </svg>
        </div>
        <p className="text-sm text-muted-foreground mt-4 text-center max-w-xl">
          Saaransh streamlines your workflow: Upload your PDF, let our AI do the heavy lifting, and get a summary in seconds!
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
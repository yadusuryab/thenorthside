"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
}

const SizeSelector = ({ sizes, selectedSize, onSizeSelect }: SizeSelectorProps) => {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  if (!sizes || sizes.length === 0) {
    return null;
  }

  // Updated size chart data with new measurements
  const sizeChart = [
    { size: "S", chest: "21", length: "27" },
    { size: "M", chest: "22", length: "28" },
    { size: "L", chest: "23", length: "29" },
  ];

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wide text-[#666666] font-light">
            SIZE
          </label>
          <button 
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-xs text-[#666666] underline font-light hover:text-[#111111] transition-colors"
          >
            Size Guide
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              onClick={() => onSizeSelect(size)}
              className={`rounded-md font-light text-sm py-3 transition-all duration-200 ${
                selectedSize === size
                  ? "bg-[#111111] text-white"
                  : "bg-[#f1f1f1] text-[#111111] hover:bg-[#e0e0e0]"
              }`}
              variant="ghost"
            >
              {size.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {/* Size Guide Popup */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSizeGuideOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Size Guide</h2>
                <button 
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="text-2xl hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Size Chart */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Size Chart (in inches)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Size</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Chest</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChart.map((row) => (
                        <tr key={row.size}>
                          <td className="border border-gray-300 px-3 py-2 font-medium">{row.size}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.chest}"</td>
                          <td className="border border-gray-300 px-3 py-2">{row.length}"</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Measurement Guide */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">How to Measure</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Chest:</strong> Measure around the fullest part of your chest</li>
                  <li>• <strong>Length:</strong> Measure from the highest point of the shoulder to the desired length</li>
                </ul>
              </div>

              {/* Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> All measurements are in inches. Sizes may vary slightly between different styles. 
                  For a relaxed fit, we recommend choosing one size larger.
                </p>
              </div>

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="bg-[#111111] text-white hover:bg-[#333333] px-6"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SizeSelector;
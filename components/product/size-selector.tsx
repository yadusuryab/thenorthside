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

  // Indian clothing size chart data
  const indianSizeChart = [
    { size: "XS", chest: "32-34", waist: "28-30", hip: "34-36" },
    { size: "S", chest: "34-36", waist: "30-32", hip: "36-38" },
    { size: "M", chest: "36-38", waist: "32-34", hip: "38-40" },
    { size: "L", chest: "38-40", waist: "34-36", hip: "40-42" },
    { size: "XL", chest: "40-42", waist: "36-38", hip: "42-44" },
    { size: "XXL", chest: "42-44", waist: "38-40", hip: "44-46" },
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Indian Size Guide</h2>
                <button 
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="text-2xl hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Size Chart */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Clothing Size Chart (in inches)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Size</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Chest</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Waist</th>
                        <th className="border border-gray-300 px-3 py-2 text-left font-medium">Hip</th>
                      </tr>
                    </thead>
                    <tbody>
                      {indianSizeChart.map((row) => (
                        <tr key={row.size}>
                          <td className="border border-gray-300 px-3 py-2 font-medium">{row.size}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.chest}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.waist}</td>
                          <td className="border border-gray-300 px-3 py-2">{row.hip}</td>
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
                  <li>• <strong>Waist:</strong> Measure around your natural waistline</li>
                  <li>• <strong>Hip:</strong> Measure around the fullest part of your hips</li>
                </ul>
              </div>

              {/* Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Sizes may vary slightly between different brands and styles. 
                  For tailored fits, we recommend choosing one size larger.
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
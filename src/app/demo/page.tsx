'use client';
import { Video } from 'lucide-react';

export default function DemoPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Demo Video</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Watch a demonstration of how the Unified AI Trust & Values Explorer works to evaluate AI alignment and safety.
      </p>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative pb-9/16">
          {/* Placeholder for video; user should provide actual video file */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
            <Video className="w-16 h-16 text-gray-500" />
            <p className="text-gray-500 ml-4">Demo video placeholder (replace with actual video)</p>
          </div>
          {/* Example video tag (uncomment and update src when video is available)
          <video
            className="absolute inset-0 w-full h-full rounded-lg"
            controls
            src="/demo-video.mp4"
          >
            Your browser does not support the video tag.
          </video>
          */}
        </div>
      </div>
    </div>
  );
}
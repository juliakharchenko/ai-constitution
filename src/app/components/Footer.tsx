export function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Unified AI Trust & Values Explorer. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
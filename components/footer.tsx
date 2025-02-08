// components/Footer.tsx
export default function Footer() {
    return (
      <footer className="w-full bg-gray-900 text-white text-center py-6 mt-10">
        <p className="text-sm">&copy; {new Date().getFullYear()} Manga App. All rights reserved.</p>
      </footer>
    );
  }
  
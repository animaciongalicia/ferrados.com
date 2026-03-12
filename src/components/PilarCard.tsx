import Link from "next/link";

interface PilarCardProps {
  href: string;
  title: string;
  description: string;
  icon: string;
  comingSoon?: boolean;
}

export default function PilarCard({ href, title, description, icon, comingSoon }: PilarCardProps) {
  const content = (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-green-300 transition-all h-full flex flex-col ${
        comingSoon ? "opacity-70" : ""
      }`}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-1">{description}</p>
      {comingSoon ? (
        <span className="mt-4 text-xs text-gray-400 font-medium">Próximamente</span>
      ) : (
        <span className="mt-4 text-green-700 font-semibold text-sm">
          Saber más →
        </span>
      )}
    </div>
  );

  if (comingSoon) {
    return content;
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}

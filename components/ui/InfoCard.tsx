import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import Card from "./Card";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
}

export default function InfoCard({
  icon: Icon,
  title,
  description,
  iconColor = "text-primary",
}: InfoCardProps) {
  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <div className={`${iconColor} mb-4`}>
          <Icon className="w-12 h-12" />
        </div>
        <h3 className="font-heading font-semibold text-xl mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Card>
  );
}

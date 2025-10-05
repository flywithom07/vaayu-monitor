interface AQIBadgeProps {
  aqi: number;
  size?: "sm" | "md" | "lg";
}

const getAQICategory = (aqi: number) => {
  if (aqi <= 50) return { label: "Good", color: "bg-aqi-good" };
  if (aqi <= 100) return { label: "Satisfactory", color: "bg-aqi-satisfactory" };
  if (aqi <= 200) return { label: "Moderate", color: "bg-aqi-moderate" };
  if (aqi <= 300) return { label: "Poor", color: "bg-aqi-poor" };
  if (aqi <= 400) return { label: "Very Poor", color: "bg-aqi-very-poor" };
  return { label: "Severe", color: "bg-aqi-severe" };
};

const AQIBadge = ({ aqi, size = "md" }: AQIBadgeProps) => {
  const category = getAQICategory(aqi);
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`${category.color} ${sizeClasses[size]} rounded-full text-white font-semibold inline-block`}>
        {aqi}
      </span>
      <span className="text-sm text-muted-foreground">{category.label}</span>
    </div>
  );
};

export default AQIBadge;

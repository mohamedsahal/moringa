interface MoringaLogoProps {
  className?: string;
  size?: number;
}

export function MoringaLogo({ className = "", size = 40 }: MoringaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="currentColor"
        className="text-primary"
      />
      {/* Moringa leaves - center leaf */}
      <ellipse
        cx="100"
        cy="70"
        rx="12"
        ry="25"
        fill="white"
      />
      {/* Left leaf */}
      <ellipse
        cx="75"
        cy="95"
        rx="18"
        ry="30"
        fill="white"
        transform="rotate(-25 75 95)"
      />
      {/* Right leaf */}
      <ellipse
        cx="125"
        cy="95"
        rx="18"
        ry="30"
        fill="white"
        transform="rotate(25 125 95)"
      />
      {/* Stem */}
      <rect
        x="98"
        y="95"
        width="4"
        height="40"
        fill="white"
        rx="2"
      />
    </svg>
  );
}
import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const SpeakWiseLogo: React.FC<LogoProps> = ({ width = 150, height, className }) => {
  // Сохраняем соотношение сторон, если задана только ширина
  const calculatedHeight = height || width;
  
  return (
    <svg 
      width={width} 
      height={calculatedHeight} 
      viewBox="0 0 1024 1024" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Фоновый круг */}
      <circle cx="512" cy="512" r="460" fill="#f0f0f0" />
      
      {/* Волны микрофона - серые дуги */}
      <path d="M246 512 A266 266 0 0 1 778 512" stroke="#A0A0A0" strokeWidth="40" fill="none" />
      <path d="M166 512 A346 346 0 0 1 858 512" stroke="#A0A0A0" strokeWidth="40" fill="none" />
      
      {/* Верхняя точка */}
      <circle cx="512" cy="180" r="40" fill="#25282B" />
      
      {/* Боковые точки */}
      <circle cx="370" cy="290" r="30" fill="#25282B" />
      <circle cx="654" cy="290" r="30" fill="#25282B" />
      <circle cx="246" cy="440" r="30" fill="#25282B" />
      <circle cx="778" cy="440" r="30" fill="#25282B" />
      <circle cx="246" cy="584" r="30" fill="#25282B" />
      <circle cx="778" cy="584" r="30" fill="#25282B" />
      
      {/* Микрофон и волны внутри */}
      <rect x="432" y="320" width="160" height="280" rx="80" fill="#25282B" />
      <rect x="472" y="320" width="40" height="140" rx="20" fill="white" />
      <circle cx="532" cy="340" r="10" fill="white" />
      <circle cx="532" cy="390" r="10" fill="white" />
      <circle cx="532" cy="440" r="10" fill="white" />
      <rect x="472" y="600" width="80" height="40" rx="5" fill="#25282B" />
      
      {/* Боковые панели эквалайзера */}
      <rect x="162" y="470" width="80" height="20" rx="10" fill="#25282B" />
      <rect x="782" y="470" width="80" height="20" rx="10" fill="#25282B" />
      
      {/* Нижняя надпись "SPEAKWISE" по дуге */}
      <path id="textPath" d="M240 700 A280 280 0 0 0 784 700" fill="none" />
      <text>
        <textPath href="#textPath" startOffset="50%" textAnchor="middle" fontSize="80" fontWeight="bold" fill="#25282B">
          SPEAKWISE
        </textPath>
      </text>
    </svg>
  );
};

export default SpeakWiseLogo; 